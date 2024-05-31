import { goodsServers } from "../services/goods";
import {
  Controller,
  Route,
  Post,
  Get,
  Body,
  SuccessResponse,
  OperationId,
  Tags,
  Query
} from "tsoa";
import { Goods, GoodsRequestLimit, GoodsResponseLimit } from "../types/goods";

@Tags("商品接口")
@Route("goods")
@SuccessResponse("200", "成功")
export class GoodsController extends Controller {
  @OperationId("查询商品")
  @Post("list")
  /**
   * 查询商品
   */
  async getGoodsList(@Body() params: GoodsRequestLimit): Promise<GoodsResponseLimit> {
    const { data, total } = await goodsServers.getGoodsLimit(params);
    return {
      records: data,
      total,
      page: params.page,
      pageSize: params.pageSize
    };
  }

  /**
   *  查询单个商品
   * @param id 商品唯一主键
   * @returns Goods
   */
  @OperationId("查询单个商品明细")
  @Get("detail")
  async getGoodsDetail(@Query() id: number): Promise<Goods> {
    return await goodsServers.getGoodsDetail({ id });
  }
}
