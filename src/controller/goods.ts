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
import { Goods } from "../types/prismaTypes";
import { GoodsRequestLimitDto } from "../dto/goods";
import { GoodsResponseLimit } from "../types/goods";
import { omit, pick } from "lodash";
import { ValidateParams } from "../utils/decorators";

@Tags("商品接口")
@Route("goods")
@SuccessResponse("200", "成功")
export class GoodsController extends Controller {
  /**
   * 分页查询商品
   * @param params
   * @returns
   */
  @OperationId("查询商品")
  @Post("list")
  @ValidateParams()
  async getGoodsList(@Body() params: GoodsRequestLimitDto): Promise<GoodsResponseLimit> {
    const dbParams = {
      ...omit(params, ["page", "pageSize"]),
      goodsOnSale: true,
      goodsName: {
        contains: params?.goodsName
      },
      goodsIsDel: false
    };
    const { data, total } = await goodsServers.getGoodsLimit(
      dbParams,
      pick(params, ["page", "pageSize"])
    );
    return {
      records: data as unknown as Goods[],
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
  @ValidateParams()
  async getGoodsDetail(@Query() id: number) {
    return (await goodsServers.getGoodsDetail({ id })) as unknown as Goods;
  }
}
