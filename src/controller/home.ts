import { goodsServers } from "../services/goods";
import { categoryServers } from "../services/category";
import { Controller, Route, Get, SuccessResponse, OperationId, Tags } from "tsoa";
import { Category } from "../types/category";

@Tags("首页相关接口")
@Route("home")
export class HomeController extends Controller {
  /**
   * 首页获取banner接口
   * @returns banner数据
   */
  @OperationId("首页Banner")
  @Get("findBanner")
  @SuccessResponse("200", "成功")
  async getGoodsBanners() {
    // 先mock数据
    const data = [
      {
        createTime: "2023-02-09 14:29:49",
        id: 1,
        imageUrl: "http://39.98.123.211:8300/images/banner-1.png",
        isDeleted: 0,
        linkUrl: "",
        sort: 1,
        title: "情人节",
        updateTime: "2023-11-29 08:36:49"
      },
      {
        createTime: "2023-02-09 14:29:59",
        id: 2,
        imageUrl: "http://39.98.123.211:8300/images/banner-2.png",
        isDeleted: 0,
        linkUrl: "",
        sort: 2,
        title: "送温暖",
        updateTime: "2023-11-29 08:37:53"
      },
      {
        createTime: "2023-02-09 14:30:04",
        id: 3,
        imageUrl: "http://39.98.123.211:8300/images/banner-3.png",
        isDeleted: 0,
        linkUrl: "",
        sort: 3,
        title: "生日礼物",
        updateTime: "2023-11-29 08:37:42"
      }
    ];
    return data;
  }

  /**
   * 首页获取广告接口
   * @returns 广告数据
   */
  @OperationId("首页广告")
  @Get("advertisement")
  @SuccessResponse("200", "成功")
  async getAdvertisement() {
    const data = [
      {
        category2Id: 3,
        id: 1,
        imageUrl: "http://39.98.123.211:8300/images/love.jpg"
      },
      {
        category2Id: 4,
        id: 2,
        imageUrl: "http://39.98.123.211:8300/images/elder.jpg"
      },
      {
        category2Id: 5,
        id: 3,
        imageUrl: "http://39.98.123.211:8300/images/friend.jpg"
      }
    ];
    return data;
  }

  /**
   * 首页获取商品接口
   * @returns 热门商品
   */
  @OperationId("首页获取商品")
  @Get("findListGoods")
  @SuccessResponse("200", "成功")
  async getGoods() {
    const { data } = await goodsServers.getGoods();
    return data;
  }

  /**
   * 首页获取分类接口
   * @returns 分类数据
   */
  @OperationId("查询一级分类")
  @Get("getCategoryLevel1")
  @SuccessResponse("200", "成功")
  async getCategoryLevel1(): Promise<Category[]> {
    const res = await categoryServers.getCategory();
    return res.filter((item: Category) => !item.typeParentId);
  }
}

export const homeController = new HomeController();
