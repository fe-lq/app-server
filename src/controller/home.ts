import type Koa from "koa";
import { goodsServers } from "../services/home";
import { emitError } from "../utils/error";

class GoodsController {
  async getGoods(ctx: Koa.Context) {
    const requestParams = (ctx.request.body as any) ?? {};
    try {
      const res = await goodsServers.getGoods(requestParams);
      ctx.body = {
        code: 0,
        data: res.map((item) => ({
          ...item,
          goodsImgs: item.goodsImgs.split(",")
        })),
        message: "success"
      };
      ctx.status = 200;
    } catch (error) {
      emitError(ctx, error);
    }
  }
}

export const goodsController = new GoodsController();
