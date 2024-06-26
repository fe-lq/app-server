import { Matches, IsString, IsIn, IsOptional, IsNumber } from "class-validator";
import { phoneRex } from "../constants";
export class WxUserDto {
  /**
   * 微信授权code
   */
  @IsString()
  code!: string;
  /**
   * 用户手机号
   */
  @IsString()
  @Matches(phoneRex, {
    message: "请输入正确的手机号"
  })
  userPhone!: string;
}

export class UpdateUserDto {
  /**
   * 用户id
   */
  @IsNumber()
  userId!: number;

  /**
   * 用户名
   */
  @IsString()
  userName!: string;
  /**
   * 用户手机号
   */
  @IsString()
  @Matches(phoneRex, {
    message: "请输入正确的手机号"
  })
  userPhone!: string;
  /**
   * 用户头像
   */
  @IsString()
  userAvatar!: string;
  /**
   * 用户性别
   */
  @IsOptional()
  @IsIn(["MALE", "FEMALE", "UNKNOWN"], {
    message: "userSex must be either MALE, FEMALE, or UNKNOWN"
  })
  userSex?: "MALE" | "FEMALE" | "UNKNOWN";

  /**
   * 用户地址
   */
  @IsOptional()
  @IsString()
  userAddress?: string;

  /**
   * 用户生日
   */
  @IsOptional()
  @IsString()
  userBirthday?: string;
}
