import { IsNumber, IsString } from "class-validator";

// GoodsRequest，用于请求商品信息
export class GoodsRequestDto {
  /**
   * 商品类型ID
   */
  @IsNumber()
  goodsTypeId?: number;
  /**
   * 商品名称
   */
  @IsString()
  goodsName?: string;
}

// GoodsRequestLimit，用于请求商品信息，并添加分页信息
export class GoodsRequestLimitDto extends GoodsRequestDto {
  /**
   * 每页显示的条数
   */
  @IsNumber()
  pageSize!: number;
  /**
   * 当前页码
   */
  @IsNumber()
  page!: number;
}
