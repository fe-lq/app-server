import crypto from "crypto";
const dataToSign = "";
/**
 *
 * @param sessionKey 密钥
 * @returns
 */
export const createSignature = (sessionKey: string) => {
  // 创建一个HMAC对象，并指定算法为'sha256'
  const hmac = crypto.createHmac("sha256", sessionKey);

  // 使用update方法添加要签名的数据
  hmac.update(dataToSign);
  // 使用digest方法获取签名（默认为Buffer格式）
  // 转换为十六进制字符串格式
  const signature = hmac.digest("hex");
  return signature;
};
