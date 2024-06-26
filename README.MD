# 小程序服务端

基于 Koa + tsoa + Typescript + Mysql 创建

## 安装环境

首先要安装 node

```
npm i -g pnpm
```

## 安装依赖

```sh
  pnpm i
```

## 启动项目

```sh
  pnpm start
```

## tsoa

```sh
  # 生成 路由 和 文档swagger.json
  pnpm tsoa
  # 生成文档swagger.json
  pnpm tsoa:doc
```

## 使用`class-validator`校验传参类型

```ts
import { IsString } from "class-validator";

export class CreateUserDto {
  @IsString()
  name: string;
}
```

## 自定义`ValidateParams`装饰器

```ts
  @Post("update")
  @ValidateParams()
  async updateUser(@Body() params: CreateUserDto) {
    const user = await userServers.updateUser(params);
    return user as unknown as Clients;
  }
```

## 自定义生成 Prisma 类型的文件

位置 `/scripts/generateTypes.ts`
生成文件位置 `/src/types/prismaType.ts`

```sh
  # 生成自定义类型
  pnpm genType
```

简洁版 generateTypes.ts 生成的类型要手动绑定切要转换 unknown 之后才能使用
TODO: 自定义一个 prisma 生成器, 配置在 schema.prisma 的 provider 中
