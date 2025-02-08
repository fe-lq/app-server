import type Koa from "koa";
import { logger } from "../logs";
import { BAD_REQUEST, ERROR_CODE_MAP, INTERNAL_SERVER_ERROR } from "../constants";

/**
 * 统一错误响应接口
 */
interface ErrorResponse {
  code: number;
  message: string;
  details?: any;
}

/**
 * 统一错误处理函数
 * @param ctx - Koa 上下文对象
 * @param msg - 错误信息，可以是字符串或错误对象
 * @param stateCode - HTTP 状态码，默认为 500（服务器内部错误）
 */
export const emitError = (
  ctx: Koa.Context,
  msg: string | Error | unknown,
  stateCode = INTERNAL_SERVER_ERROR
) => {
  // 设置 HTTP 状态码
  ctx.status = stateCode;

  // 构造错误响应体
  const errorResponse: ErrorResponse = {
    code: -1,
    message: ""
  };

  // 根据不同状态码和错误类型处理错误信息
  if (stateCode === BAD_REQUEST) {
    errorResponse.message =
      msg instanceof Error
        ? msg.message
        : typeof msg === "string"
        ? msg
        : ERROR_CODE_MAP[stateCode];
  } else {
    errorResponse.message = ERROR_CODE_MAP[stateCode as keyof typeof ERROR_CODE_MAP] ?? "未知错误";
  }

  // 如果是开发环境，添加详细错误信息
  if (process.env.NODE_ENV === "development" && msg instanceof Error) {
    errorResponse.details = {
      stack: msg.stack,
      name: msg.name
    };
  }

  ctx.body = errorResponse;

  // 记录错误日志
  if (msg) {
    if (msg instanceof Error) {
      logger.error(`[${stateCode}] ${msg.message}`, {
        stack: msg.stack,
        name: msg.name
      });
    } else {
      logger.error(`[${stateCode}] ${errorResponse.message}`);
    }
  }
};
