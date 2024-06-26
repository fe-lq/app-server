import { Goods } from "./prismaTypes";

// 导出接口GoodsResponseLimit，用于返回商品信息及总数
export interface GoodsResponseLimit {
  /**
   * 商品列表
   */
  records: Goods[];
  /**
   * 总条数
   */
  total: number;
  /**
   * 当前页码
   */
  page: number;
  /**
   * 每页显示的条数
   */
  pageSize: number;
}
