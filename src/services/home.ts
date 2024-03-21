import db from "../db";
class GoodsServers {
  /**
   * 查询商品接口
   * @param params
   */
  getGoods = async (params: any): Promise<any[]> =>
    await db.goods.findMany({
      where: {
        ...params,
        goodsName: {
          contains: params.goodsName
        },
        goodsIsDel: false
      }
    });
}
export const goodsServers = new GoodsServers();
