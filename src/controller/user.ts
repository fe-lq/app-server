import JWT from "jsonwebtoken";
import { APP_ID, APP_SECRET, JWT_SECRET_KEY, TOKEN_EXPIRED_TIME } from "../constants";
import fetch from "../utils/fetch";
import { userServers } from "../services/user";
import { Route, Post, Controller, Body, OperationId, Tags } from "tsoa";
import { UpdateUserDto, WxUserDto } from "../dto/user";
import { ValidateParams } from "../utils/decorators";
import { Clients } from "../types/prismaTypes";

@Tags("用户相关接口")
@Route("user")
export class UserController extends Controller {
  /**
   * 用户登录接口
   * @param params
   */
  @OperationId("登录")
  @Post("login")
  @ValidateParams()
  async login(
    @Body()
    params: WxUserDto
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
  @ValidateParams()
  async updateUser(@Body() params: UpdateUserDto) {
    const user = await userServers.updateUser(params);
    return user as unknown as Clients;
  }
}
