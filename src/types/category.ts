export interface Category {
  /**
   * 分类id
   */
  id: number;
  /**
   * 分类名称
   */
  typeName: string;
  /**
   * 分类图片
   */
  typeImg: string;
  /**
   * 是否启用
   */
  typeEnable: boolean;
  /**
   * 父级分类id
   */
  typeParentId?: number;
  /**
   * 子类
   */
  children?: Category[];
}
