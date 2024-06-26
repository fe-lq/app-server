import Koa from "koa";
import body from "koa-body";
import { logger } from "../logs";
import { ValidateError } from "tsoa";

/**
 * 请求日志
 * @param ctx
 * @param next
 */
export const httpLogMiddle = async (ctx: Koa.Context, next: Koa.Next) => {
  if (ctx.request.method === "GET") {
    logger.info({ ...ctx.query, ...ctx.request.header });
  } else {
    logger.info({ ...ctx.request.body, ...ctx.request.header });
  }
  await next();
};

/**
 * 参数解析中间件
 */
export const parseBodyMiddle = body({
  onError: (err) => {
    // 处理错误
    logger.error(err.message + "参数解析错误");
  }
});

export const responseFormatter = async (ctx: Koa.Context, next: Koa.Next) => {
  try {
    await next();
    if (ctx.body && !ctx.response.headerSent) {
      ctx.body = {
        code: 200,
        message: "ok",
        data: ctx.body
      };
    }
  } catch (error: any) {
    // 处理tsoa校验的参数
    if (error instanceof ValidateError) {
      const fields = Object.keys(error.fields).reduce<Record<string, string>>((acc, key) => {
        acc[key] = error.fields[key].message;
        return acc;
      }, {});
      ctx.body = {
        code: error.status,
        message: "参数错误",
        errors: fields
      };
    } else {
      ctx.body = {
        code: error.status || 500,
        message: error.message || "Internal server error",
        errors: error.errors || []
      };
    }
  }
};
