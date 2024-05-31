import app from "./app";
import { redisClient } from "./redis";
redisClient.initRedis();
app.listen(8890, () => {
  console.log("8890启动成功");
});
