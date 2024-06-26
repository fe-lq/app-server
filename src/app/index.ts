import Koa from "koa";

import { httpLogMiddle, parseBodyMiddle, responseFormatter } from "../middleware";
import { requestAccessToken } from "../scheduled";
import { RegisterRoutes } from "../routers";
import Router from "@koa/router";
const router = new Router();
// 开启定时任务
requestAccessToken();

/**
 * 启动服务
 */
const app = new Koa();
app.use(parseBodyMiddle);
app.use(httpLogMiddle);
app.use(responseFormatter);
RegisterRoutes(router);
app.use(router.routes());
app.use(router.allowedMethods());

export default app;
