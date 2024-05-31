// GoodsRequest，用于请求商品信息
export interface GoodsRequest {
  /**
   * 商品类型ID
   */
  goodsTypeId?: number;
  /**
   * 商品名称
   */
  goodsName?: string;
}

// GoodsRequestLimit，用于请求商品信息，并添加分页信息
export type GoodsRequestLimit = GoodsRequest & {
  /**
   * 每页显示的条数
   */
  pageSize: number;
  /**
   * 当前页码
   */
  page: number;
};

// Goods，用于返回商品信息
export interface Goods {
  /**
   * 商品ID
   */
  id: number;
  /**
   * 商品类型ID
   */
  goodsTypeId: number;
  /**
   * 商品名称
   */
  goodsName: string;
  /**
   * 商品库存
   */
  goodsAmount: number;
  /**
   * 商品价格
   */
  goodsPrice: number;
  /**
   * 商品划线价格
   */
  goodsMarkPrice: number;
  /**
   * 商品成本价
   */
  goodsCostPrice: number;
  /**
   * 商品描述
   */
  goodsDesc?: string;
  /**
   * 商品图片
   */
  goodsImgs: string[];
  /**
   * 商品已售量
   */
  goodsSellCount: number;
  /**
   * 商品创建时间
   */
  goodsCreate: string;
  /**
   * 商品更新时间
   */
  goodsUpdate: string;
  /**
   * 商品所属用户
   */
  goodsUser?: string;
  /**
   * 商品所属用户id
   */
  goodsUserId?: number;
  /**
   * 商品评论
   */
  goodsComments: any[];
}
[];
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

// export interface Comment {
//   id: number;
//   userId: number;
//   goodsId: number;
//   content: string;
//   createTime: string;
//   updateTime: string;
//   children: Comment[];
//   user: User;
// }
