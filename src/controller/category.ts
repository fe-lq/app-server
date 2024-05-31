import { categoryServers } from "../services/category";
import { Controller, Route, Get, SuccessResponse, OperationId, Tags } from "tsoa";

@Tags("分类接口")
@Route("category")
export class CategoryController extends Controller {
  /**
   * 获取所有分类信息
   */
  @OperationId("查询分类")
  @Get("list")
  @SuccessResponse(200, "成功")
  async getCategories() {
    return await categoryServers.getCategory();
  }
}
