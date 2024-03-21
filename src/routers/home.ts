import Router from "koa-router";
import { goodsController } from "../controller/home";

export const router = new Router({ prefix: "/home" });

router.post("/findBanner", goodsController.getGoods);
router.post("/findCategory", goodsController.getGoods);
router.post("/advertisement", goodsController.getGoods);
router.post("/findListGoods", goodsController.getGoods);
router.post("/findRecommendGoods", goodsController.getGoods);
