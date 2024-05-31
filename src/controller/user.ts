import JWT from "jsonwebtoken";
import { APP_ID, APP_SECRET, JWT_SECRET_KEY, TOKEN_EXPIRED_TIME } from "../constants";
import fetch from "../utils/fetch";
import { userServers } from "../services/user";
import { Route, Post, SuccessResponse, Controller, Body, OperationId, Tags } from "tsoa";
import { User, WxUser } from "../types/user";

@Tags("用户相关接口")
@Route("user")
export class UserController extends Controller {
  /**
   * 用户登录接口
   * @param params
   */
  @OperationId("登录")
  @Post("login")
  @SuccessResponse("200", "成功")
  async login(
    @Body()
    params: WxUser
  ) {
    const { code, userPhone } = params;
    const apiParams = {
      grant_type: "authorization_code",
      js_code: code,
      appid: APP_ID,
      secret: APP_SECRET
    };
    const res = await fetch.get(`https://api.weixin.qq.com/sns/jscode2session`, apiParams);
    await userServers.addUser({
      userOpenid: res.openid,
      userPhone,
      userName: "微信用户"
    });
    const token = JWT.sign(res.openid, JWT_SECRET_KEY, {
      expiresIn: TOKEN_EXPIRED_TIME
    });
    return {
      token
    };
  }

  /**
   * 修改用户信息接口
   * @param params
   */
  @OperationId("修改用户信息")
  @Post("update")
  @SuccessResponse("200", "成功")
  async updateUser(@Body() params: User) {
    await userServers.updateUser(params);
    return {
      message: "update success"
    };
  }
}
