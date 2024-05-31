export interface WxUser {
  /**
   * 微信授权code
   */
  code: string;
  /**
   * 用户手机号
   */
  userPhone: string;
}

export interface User {
  /**
   * 用户名
   */
  userName: string;
  /**
   * 用户手机号
   */
  userPhone: string;
  /**
   * 用户头像
   */
  userAvatar: string;
  /**
   * 用户性别
   */
  userSex?: "MALE" | "FEMALE" | "UNKNOWN";

  /**
   * 用户地址
   */
  userAddress?: string;

  /**
   * 用户生日
   */
  userBirthday?: string;
}
