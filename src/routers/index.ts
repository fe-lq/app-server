/* tslint:disable */
/* eslint-disable */
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { TsoaRoute, fetchMiddlewares, KoaTemplateService } from "@tsoa/runtime";
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { UserController } from "./../controller/user";
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { HomeController } from "./../controller/home";
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { GoodsController } from "./../controller/goods";
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { CategoryController } from "./../controller/category";
import type { Context, Next, Middleware, Request as KRequest, Response as KResponse } from "koa";
import type * as KoaRouter from "@koa/router";

// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

const models: TsoaRoute.Models = {
  WxUserDto: {
    dataType: "refObject",
    properties: {
      code: { dataType: "string", required: true },
      userPhone: { dataType: "string", required: true }
    },
    additionalProperties: false
  },
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  UserSex: {
    dataType: "refEnum",
    enums: [0, 1, 2]
  },
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  Clients: {
    dataType: "refAlias",
    type: {
      dataType: "nestedObjectLiteral",
      nestedProperties: {
        userUpdate: { dataType: "string" },
        userCreate: { dataType: "string" },
        userBirth: { dataType: "string" },
        userSex: { ref: "UserSex" },
        userAddress: { dataType: "string" },
        userStatus: { dataType: "boolean" },
        userOpenid: { dataType: "string" },
        userPhone: { dataType: "string", required: true },
        userName: { dataType: "string", required: true },
        userAvatar: { dataType: "string" },
        userId: { dataType: "double", required: true }
      },
      validators: {}
    }
  },
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  UpdateUserDto: {
    dataType: "refObject",
    properties: {
      userId: { dataType: "double", required: true },
      userName: { dataType: "string", required: true },
      userPhone: { dataType: "string", required: true },
      userAvatar: { dataType: "string", required: true },
      userSex: {
        dataType: "union",
        subSchemas: [
          { dataType: "enum", enums: ["MALE"] },
          { dataType: "enum", enums: ["FEMALE"] },
          { dataType: "enum", enums: ["UNKNOWN"] }
        ]
      },
      userAddress: { dataType: "string" },
      userBirthday: { dataType: "string" }
    },
    additionalProperties: false
  },
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  GoodsTypes: {
    dataType: "refAlias",
    type: {
      dataType: "nestedObjectLiteral",
      nestedProperties: {
        goods: { dataType: "array", array: { dataType: "refAlias", ref: "Goods" }, required: true },
        children: {
          dataType: "array",
          array: { dataType: "refAlias", ref: "GoodsTypes" },
          required: true
        },
        typeParent: { ref: "GoodsTypes" },
        typeParentId: { dataType: "double" },
        typeEnable: { dataType: "boolean", required: true },
        typeImg: { dataType: "string" },
        typeName: { dataType: "string", required: true },
        id: { dataType: "double", required: true }
      },
      validators: {}
    }
  },
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  Goods: {
    dataType: "refAlias",
    type: {
      dataType: "nestedObjectLiteral",
      nestedProperties: {
        orderGoods: { ref: "OrderGoods" },
        cartGoods: { ref: "CartGoods" },
        goodsComments: {
          dataType: "array",
          array: { dataType: "refAlias", ref: "Comment" },
          required: true
        },
        goodsType: { ref: "GoodsTypes", required: true },
        goodsUserId: { dataType: "double" },
        goodsUser: { dataType: "string" },
        goodsUpdate: { dataType: "string", required: true },
        goodsCreate: { dataType: "string", required: true },
        goodsIsDel: { dataType: "boolean" },
        goodsSellCount: { dataType: "double", required: true },
        goodsDesc: { dataType: "string" },
        goodsOnSale: { dataType: "boolean" },
        goodsTypeId: { dataType: "double", required: true },
        goodsImgs: { dataType: "string", required: true },
        goodsAmount: { dataType: "double", required: true },
        goodsCostPrice: { dataType: "double", required: true },
        goodsMarkPrice: { dataType: "double", required: true },
        goodsPrice: { dataType: "double", required: true },
        goodsName: { dataType: "string", required: true },
        id: { dataType: "double", required: true }
      },
      validators: {}
    }
  },
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  Comment: {
    dataType: "refAlias",
    type: {
      dataType: "nestedObjectLiteral",
      nestedProperties: {
        goods: { ref: "Goods", required: true },
        children: {
          dataType: "array",
          array: { dataType: "refAlias", ref: "Comment" },
          required: true
        },
        parent: { ref: "Comment" },
        authorId: { dataType: "double", required: true },
        parentId: { dataType: "double" },
        content: { dataType: "string", required: true },
        id: { dataType: "double", required: true },
        goodsId: { dataType: "double", required: true }
      },
      validators: {}
    }
  },
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  CartGoods: {
    dataType: "refAlias",
    type: {
      dataType: "nestedObjectLiteral",
      nestedProperties: {
        goods: { ref: "Goods", required: true },
        cart: { ref: "Cart", required: true },
        goodsIsChecked: { dataType: "boolean", required: true },
        goodsCount: { dataType: "double", required: true },
        goodsId: { dataType: "double", required: true },
        cartId: { dataType: "double", required: true },
        id: { dataType: "double", required: true }
      },
      validators: {}
    }
  },
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  Cart: {
    dataType: "refAlias",
    type: {
      dataType: "nestedObjectLiteral",
      nestedProperties: {
        cartGoods: {
          dataType: "array",
          array: { dataType: "refAlias", ref: "CartGoods" },
          required: true
        },
        cartUserId: { dataType: "double", required: true },
        id: { dataType: "double", required: true }
      },
      validators: {}
    }
  },
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  OrderGoods: {
    dataType: "refAlias",
    type: {
      dataType: "nestedObjectLiteral",
      nestedProperties: {
        order: { ref: "Orders", required: true },
        goods: { ref: "Goods", required: true },
        goodsCount: { dataType: "double", required: true },
        goodsId: { dataType: "double", required: true },
        orderId: { dataType: "double", required: true },
        id: { dataType: "double", required: true }
      },
      validators: {}
    }
  },
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  Orders: {
    dataType: "refAlias",
    type: {
      dataType: "nestedObjectLiteral",
      nestedProperties: {
        orderGoods: {
          dataType: "array",
          array: { dataType: "refAlias", ref: "OrderGoods" },
          required: true
        },
        orderUserId: { dataType: "double", required: true },
        orderUpdate: { dataType: "string" },
        orderCreate: { dataType: "string" },
        orderStatus: { dataType: "double", required: true },
        orderComment: { dataType: "string", required: true },
        orderNo: { dataType: "string", required: true },
        id: { dataType: "double", required: true }
      },
      validators: {}
    }
  },
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  GoodsResponseLimit: {
    dataType: "refObject",
    properties: {
      records: { dataType: "array", array: { dataType: "refAlias", ref: "Goods" }, required: true },
      total: { dataType: "double", required: true },
      page: { dataType: "double", required: true },
      pageSize: { dataType: "double", required: true }
    },
    additionalProperties: false
  },
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  GoodsRequestLimitDto: {
    dataType: "refObject",
    properties: {
      goodsTypeId: { dataType: "double" },
      goodsName: { dataType: "string" },
      pageSize: { dataType: "double", required: true },
      page: { dataType: "double", required: true }
    },
    additionalProperties: false
  }
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
};
const templateService = new KoaTemplateService(models, {
  noImplicitAdditionalProperties: "throw-on-extras",
  bodyCoercion: true
});

// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

export function RegisterRoutes(router: KoaRouter) {
  // ###########################################################################################################
  //  NOTE: If you do not see routes for all of your controllers in this file, then you might not have informed tsoa of where to look
  //      Please look into the "controllerPathGlobs" config option described in the readme: https://github.com/lukeautry/tsoa
  // ###########################################################################################################
  router.post(
    "/user/login",
    ...fetchMiddlewares<Middleware>(UserController),
    ...fetchMiddlewares<Middleware>(UserController.prototype.login),

    async function UserController_login(context: Context, next: Next) {
      const args: Record<string, TsoaRoute.ParameterSchema> = {
        params: { in: "body", name: "params", required: true, ref: "WxUserDto" }
      };

      let validatedArgs: any[] = [];
      try {
        validatedArgs = templateService.getValidatedArgs({ args, context, next });
      } catch (err) {
        const error = err as any;
        error.message ||= JSON.stringify({ fields: error.fields });
        context.status = error.status;
        context.throw(context.status, error.message, error);
      }

      const controller = new UserController();

      return templateService.apiHandler({
        methodName: "login",
        controller,
        context,
        validatedArgs,
        successStatus: undefined
      });
    }
  );
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  router.post(
    "/user/update",
    ...fetchMiddlewares<Middleware>(UserController),
    ...fetchMiddlewares<Middleware>(UserController.prototype.updateUser),

    async function UserController_updateUser(context: Context, next: Next) {
      const args: Record<string, TsoaRoute.ParameterSchema> = {
        params: { in: "body", name: "params", required: true, ref: "UpdateUserDto" }
      };

      let validatedArgs: any[] = [];
      try {
        validatedArgs = templateService.getValidatedArgs({ args, context, next });
      } catch (err) {
        const error = err as any;
        error.message ||= JSON.stringify({ fields: error.fields });
        context.status = error.status;
        context.throw(context.status, error.message, error);
      }

      const controller = new UserController();

      return templateService.apiHandler({
        methodName: "updateUser",
        controller,
        context,
        validatedArgs,
        successStatus: undefined
      });
    }
  );
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  router.get(
    "/home/findBanner",
    ...fetchMiddlewares<Middleware>(HomeController),
    ...fetchMiddlewares<Middleware>(HomeController.prototype.getGoodsBanners),

    async function HomeController_getGoodsBanners(context: Context, next: Next) {
      const args: Record<string, TsoaRoute.ParameterSchema> = {};

      let validatedArgs: any[] = [];
      try {
        validatedArgs = templateService.getValidatedArgs({ args, context, next });
      } catch (err) {
        const error = err as any;
        error.message ||= JSON.stringify({ fields: error.fields });
        context.status = error.status;
        context.throw(context.status, error.message, error);
      }

      const controller = new HomeController();

      return templateService.apiHandler({
        methodName: "getGoodsBanners",
        controller,
        context,
        validatedArgs,
        successStatus: undefined
      });
    }
  );
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  router.get(
    "/home/advertisement",
    ...fetchMiddlewares<Middleware>(HomeController),
    ...fetchMiddlewares<Middleware>(HomeController.prototype.getAdvertisement),

    async function HomeController_getAdvertisement(context: Context, next: Next) {
      const args: Record<string, TsoaRoute.ParameterSchema> = {};

      let validatedArgs: any[] = [];
      try {
        validatedArgs = templateService.getValidatedArgs({ args, context, next });
      } catch (err) {
        const error = err as any;
        error.message ||= JSON.stringify({ fields: error.fields });
        context.status = error.status;
        context.throw(context.status, error.message, error);
      }

      const controller = new HomeController();

      return templateService.apiHandler({
        methodName: "getAdvertisement",
        controller,
        context,
        validatedArgs,
        successStatus: undefined
      });
    }
  );
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  router.get(
    "/home/findListGoods",
    ...fetchMiddlewares<Middleware>(HomeController),
    ...fetchMiddlewares<Middleware>(HomeController.prototype.getGoods),

    async function HomeController_getGoods(context: Context, next: Next) {
      const args: Record<string, TsoaRoute.ParameterSchema> = {};

      let validatedArgs: any[] = [];
      try {
        validatedArgs = templateService.getValidatedArgs({ args, context, next });
      } catch (err) {
        const error = err as any;
        error.message ||= JSON.stringify({ fields: error.fields });
        context.status = error.status;
        context.throw(context.status, error.message, error);
      }

      const controller = new HomeController();

      return templateService.apiHandler({
        methodName: "getGoods",
        controller,
        context,
        validatedArgs,
        successStatus: undefined
      });
    }
  );
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  router.get(
    "/home/getCategoryLevel1",
    ...fetchMiddlewares<Middleware>(HomeController),
    ...fetchMiddlewares<Middleware>(HomeController.prototype.getCategoryLevel1),

    async function HomeController_getCategoryLevel1(context: Context, next: Next) {
      const args: Record<string, TsoaRoute.ParameterSchema> = {};

      let validatedArgs: any[] = [];
      try {
        validatedArgs = templateService.getValidatedArgs({ args, context, next });
      } catch (err) {
        const error = err as any;
        error.message ||= JSON.stringify({ fields: error.fields });
        context.status = error.status;
        context.throw(context.status, error.message, error);
      }

      const controller = new HomeController();

      return templateService.apiHandler({
        methodName: "getCategoryLevel1",
        controller,
        context,
        validatedArgs,
        successStatus: undefined
      });
    }
  );
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  router.post(
    "/goods/list",
    ...fetchMiddlewares<Middleware>(GoodsController),
    ...fetchMiddlewares<Middleware>(GoodsController.prototype.getGoodsList),

    async function GoodsController_getGoodsList(context: Context, next: Next) {
      const args: Record<string, TsoaRoute.ParameterSchema> = {
        params: { in: "body", name: "params", required: true, ref: "GoodsRequestLimitDto" }
      };

      let validatedArgs: any[] = [];
      try {
        validatedArgs = templateService.getValidatedArgs({ args, context, next });
      } catch (err) {
        const error = err as any;
        error.message ||= JSON.stringify({ fields: error.fields });
        context.status = error.status;
        context.throw(context.status, error.message, error);
      }

      const controller = new GoodsController();

      return templateService.apiHandler({
        methodName: "getGoodsList",
        controller,
        context,
        validatedArgs,
        successStatus: undefined
      });
    }
  );
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  router.get(
    "/goods/detail",
    ...fetchMiddlewares<Middleware>(GoodsController),
    ...fetchMiddlewares<Middleware>(GoodsController.prototype.getGoodsDetail),

    async function GoodsController_getGoodsDetail(context: Context, next: Next) {
      const args: Record<string, TsoaRoute.ParameterSchema> = {
        id: { in: "query", name: "id", required: true, dataType: "double" }
      };

      let validatedArgs: any[] = [];
      try {
        validatedArgs = templateService.getValidatedArgs({ args, context, next });
      } catch (err) {
        const error = err as any;
        error.message ||= JSON.stringify({ fields: error.fields });
        context.status = error.status;
        context.throw(context.status, error.message, error);
      }

      const controller = new GoodsController();

      return templateService.apiHandler({
        methodName: "getGoodsDetail",
        controller,
        context,
        validatedArgs,
        successStatus: undefined
      });
    }
  );
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  router.get(
    "/category/list",
    ...fetchMiddlewares<Middleware>(CategoryController),
    ...fetchMiddlewares<Middleware>(CategoryController.prototype.getCategories),

    async function CategoryController_getCategories(context: Context, next: Next) {
      const args: Record<string, TsoaRoute.ParameterSchema> = {};

      let validatedArgs: any[] = [];
      try {
        validatedArgs = templateService.getValidatedArgs({ args, context, next });
      } catch (err) {
        const error = err as any;
        error.message ||= JSON.stringify({ fields: error.fields });
        context.status = error.status;
        context.throw(context.status, error.message, error);
      }

      const controller = new CategoryController();

      return templateService.apiHandler({
        methodName: "getCategories",
        controller,
        context,
        validatedArgs,
        successStatus: undefined
      });
    }
  );
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
}

// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
