import db, { GoodsTypes } from "../db";
import { Category } from "../types/category";
class CategoryServers {
  /**
   * 查询商品分类接口,返回父级分类和子级分类
   */
  getCategory = async (params?: Partial<GoodsTypes>) => {
    const res = await db.goodsTypes.findMany({
      where: params,
      include: {
        typeParent: true,
        children: true
      }
    });
    return res as Category[];
  };
}
export const categoryServers = new CategoryServers();
