import { omit } from "lodash";
import db from "../db";
import { Goods, GoodsRequest, GoodsRequestLimit } from "../types/goods";
class GoodsServers {
  /**
   * 分页查询商品接口
   */
  getGoodsLimit = async (params: GoodsRequestLimit) => {
    const dbParams = {
      ...omit(params, ["page", "pageSize"]),
      goodsOnSale: true,
      goodsName: {
        contains: params?.goodsName
      },
      goodsIsDel: false
    };
    const total = await db.goods.count({ where: dbParams });
    const res = await db.goods.findMany({
      where: dbParams,
      take: params.pageSize,
      skip: (params.page - 1) * params.pageSize
    });
    return {
      data: res.map((item) => ({
        ...item,
        goodsImgs: item.goodsImgs.split(",")
      })) as unknown as Goods[],
      total
    };
  };

  /**
   * 查询商品接口
   * @param params
   */
  getGoods = async (params?: GoodsRequest) => {
    const dbParams = {
      ...params,
      goodsOnSale: true,
      goodsName: {
        contains: params?.goodsName
      },
      goodsIsDel: false
    };

    const res = await db.goods.findMany({
      where: dbParams
    });
    return {
      data: res.map((item) => ({
        ...item,
        goodsImgs: item.goodsImgs.split(",")
      })) as unknown as Goods[]
    };
  };

  /**
   * 查询商品详情接口
   */
  getGoodsDetail = async (params: { id: number }) => {
    const res = await db.goods.findUnique({
      where: {
        id: params.id
      }
    });
    return {
      ...res,
      goodsImgs: res?.goodsImgs.split(",")
    } as unknown as Goods;
  };
}
export const goodsServers = new GoodsServers();
