import fetch from "node-fetch";
import { logger } from "../logs";

class FetchUtil {
  async get(url: string, params: any) {
    try {
      // 如果有查询参数，将它们转换为查询字符串并附加到 URL
      if (params) {
        const queryString = new URLSearchParams(params).toString();
        url += `?${queryString}`;
      }

      const response = await fetch(url);
      return await response.json();
    } catch (error) {
      logger.error("Third Apis Request Error:", error);
      throw error;
    }
  }

  async post(url: string, body: any) {
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(body)
      });
      return await response.json();
    } catch (error) {
      logger.error("Third Apis Request Error:", error);
      throw error;
    }
  }
}

export default new FetchUtil();
