import Koa from "koa";

import router from "../routers";
import { httpLogMiddle, parseBodyMiddle } from "../middleware";

const app = new Koa();
app.use(parseBodyMiddle);
app.use(httpLogMiddle);
app.use(router.routes());
app.use(router.allowedMethods());

export default app;
