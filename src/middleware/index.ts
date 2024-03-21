import Koa from "koa";
import body from "koa-body";
import { logger } from "../logs";

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
