import "reflect-metadata";
import { validateOrReject, ValidationError } from "class-validator";
interface ValidationOptions {
  /**
   * 验证添加继承的参数
   */
  extendWith?: any;
  /**
   * 排除验证属性
   */
  excludeProperties?: string[];
}

/**
 * 校验参数装饰器
 * @returns 验证参数
 */
export function ValidateParams(options?: ValidationOptions) {
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;
    descriptor.value = async function (...args: any[]) {
      // 获取第一个参数的类型
      const paramTypes = Reflect.getMetadata("design:paramtypes", target, propertyKey);
      if (!paramTypes || !paramTypes.length) {
        throw new Error(
          'No parameter types found. Ensure you have enabled "emitDecoratorMetadata" in your tsconfig.json.'
        );
      }
      let dtoClass = paramTypes[0];
      if (options?.extendWith) {
        dtoClass = options.extendWith;
      }
      if (options?.excludeProperties) {
        options.excludeProperties.forEach((prop) => {
          delete dtoClass[prop];
        });
      }
      const instance = Object.assign(new dtoClass(), args[0]);
      try {
        await validateOrReject(instance);
      } catch (errors: any) {
        if (Array.isArray(errors) && errors[0] instanceof ValidationError) {
          throw {
            status: 400,
            message: "参数错误",
            errors: errors.map((error: ValidationError) => ({
              property: error.property,
              constraints: error.constraints
            }))
          };
        } else {
          throw errors;
        }
      }

      return originalMethod.apply(this, args);
    };
  };
}
