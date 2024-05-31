import db, { Prisma } from "../db";
class UserServers {
  /**
   * 添加用户
   */
  addUser = async (params: Prisma.ClientsCreateInput) => {
    const res = await db.clients.create({
      data: params
    });
    return res;
  };
  /**
   * 修改用户
   */
  updateUser = async (params: Prisma.ClientsCreateInput) => {
    const res = await db.clients.create({
      data: params
    });
    return res;
  };
}
export const userServers = new UserServers();
