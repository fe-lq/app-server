import db, { Prisma } from "../db";
import { GoodsRequestLimitDto } from "../dto/goods";
class GoodsServers {
  /**
   * 分页查询商品接口
   */
  getGoodsLimit = async (
    params: Prisma.GoodsWhereInput,
    { pageSize, page }: GoodsRequestLimitDto
  ) => {
    const total = await db.goods.count({ where: params });
    const res = await db.goods.findMany({
      where: params,
      take: pageSize,
      skip: (page - 1) * pageSize
    });
    return {
      data: res.map((item) => ({
        ...item,
        goodsImgs: item.goodsImgs.split(",")
      })),
      total
    };
  };

  /**
   * 查询商品接口
   * @param params
   */
  getGoods = async (params?: Prisma.GoodsWhereInput) => {
    const res = await db.goods.findMany({
      where: params
    });
    return {
      data: res.map((item) => ({
        ...item,
        goodsImgs: item.goodsImgs.split(",")
      }))
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
    };
  };
}
export const goodsServers = new GoodsServers();
