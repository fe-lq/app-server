import "reflect-metadata";
import { validateOrReject, ValidationError } from "class-validator";

/**
 * 验证选项接口
 */
interface ValidationOptions {
  /**
   * 用于扩展验证的类
   * 如果提供，将使用此类替代原始参数类型
   */
  extendWith?: any;

  /**
   * 需要在验证时排除的属性名数组
   */
  excludeProperties?: string[];
}

/**
 * 自定义验证错误接口
 */
interface ValidationErrorResponse {
  status: number;
  message: string;
  errors: Array<{
    property: string;
    constraints: Record<string, string>;
  }>;
}

/**
 * 参数验证装饰器
 * 用于验证方法的第一个参数是否符合指定的验证规则
 *
 * @param options - 验证选项
 * @returns 方法装饰器
 * @throws {ValidationErrorResponse} 当验证失败时抛出格式化的错误信息
 * @throws {Error} 当缺少参数类型元数据时抛出错误
 */
export function ValidateParams(options?: ValidationOptions) {
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;

    descriptor.value = async function (...args: any[]) {
      // 获取方法参数的类型元数据
      const paramTypes = Reflect.getMetadata("design:paramtypes", target, propertyKey);

      if (!paramTypes?.length) {
        throw new Error(
          '未找到参数类型信息。请确保在 tsconfig.json 中启用了 "emitDecoratorMetadata" 选项。'
        );
      }

      // 确定要使用的 DTO 类
      const dtoClass = options?.extendWith || paramTypes[0];
      const dto = Object.assign(new dtoClass(), args[0]);

      // 处理需要排除的属性
      if (options?.excludeProperties?.length) {
        options.excludeProperties.forEach((prop) => {
          delete dto[prop];
        });
      }

      try {
        await validateOrReject(dto);
        return originalMethod.apply(this, args);
      } catch (errors: unknown) {
        if (Array.isArray(errors) && errors[0] instanceof ValidationError) {
          const validationError: ValidationErrorResponse = {
            status: 400,
            message: "参数错误",
            errors: errors.map((error: ValidationError) => ({
              property: error.property,
              constraints: error.constraints || {}
            }))
          };
          throw validationError;
        }
        throw errors;
      }
    };
  };
}
