import db, { GoodsTypes } from "../db";
class CategoryServers {
  /**
   * 查询商品分类接口,返回父级分类和子级分类
   */
  getCategory = async (params?: Partial<GoodsTypes>) => {
    return await db.goodsTypes.findMany({
      where: params,
      include: {
        typeParent: true,
        children: true
      }
    });
  };
}
export const categoryServers = new CategoryServers();
