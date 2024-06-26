import { categoryServers } from "../services/category";
import { Controller, Route, Get, OperationId, Tags } from "tsoa";

@Tags("分类接口")
@Route("category")
export class CategoryController extends Controller {
  /**
   * 获取所有分类信息
   */
  @OperationId("查询分类")
  @Get("list")
  async getCategories() {
    return await categoryServers.getCategory();
  }
}
