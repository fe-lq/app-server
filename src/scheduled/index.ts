import schedule from "node-schedule";
import { logger } from "../logs";
import fetch from "../utils/fetch";
import { redisClient } from "../redis";
import { APP_ID, APP_SECRET } from "../constants";

// 请求 access_token 的函数
export async function requestAccessToken() {
  try {
    const params = {
      grant_type: "client_credential",
      appid: APP_ID,
      secret: APP_SECRET
    };
    const res = await fetch.get(`https://api.weixin.qq.com/cgi-bin/token`, params);
    if (res.access_token) {
      // 这里可以将 access_token 保存在数据库或内存中，供后续使用
      redisClient.setValue("wx_access_token", res.access_token);
    } else {
      logger.error("Failed to retrieve access token:", res);
    }
  } catch (error) {
    logger.error("Error requesting access token:", error);
  }
}

// 设置定时任务，每1小时55分钟刷新一次 access_token
// 微信的 access_token 有效期为2小时，这里留有5分钟的缓冲时间
schedule.scheduleJob("0 */115 * * * *", () => {
  console.log("Running scheduled task to refresh access token...");
  requestAccessToken();
});
