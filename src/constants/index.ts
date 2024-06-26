/** 请求参数错误 */
export const BAD_REQUEST = 400;
/** 客户端认证失效 */
export const UNAUTHORIZED = 401;
/** 客户端没有权限 */
export const FORBIDDEN = 403;
/** 没有请求路径 */
export const NOT_FOUND = 404;
/** 服务端错误 */
export const INTERNAL_SERVER_ERROR = 500;

export const ERROR_CODE_MAP = {
  [BAD_REQUEST]: "请求参数错误",
  [UNAUTHORIZED]: "Token认证失效",
  [FORBIDDEN]: "客户端没有权限",
  [NOT_FOUND]: "没有请求路径",
  [INTERNAL_SERVER_ERROR]: "服务端错误"
};

export const APP_ID = "wx62e130a086263c6c";
export const APP_SECRET = "c9cef0cd24881d046093e35fa558dacc";
export const WX_TOKEN_KEY = "wx_access_token";

/**
 * token有效期
 */
export const TOKEN_EXPIRED_TIME = 60 * 60 * 24; // 1天;
/**
 * token刷新时间范围
 */
export const TOKEN_REFRESH_TIME = 60 * 2;

export const JWT_SECRET_KEY = "JWT_TOKEN";

/**
 * 手机正则
 */
export const phoneRex =
  /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/;
