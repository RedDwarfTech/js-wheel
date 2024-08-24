export const BaseMethods = {
  /**
   * 获取数据类型
   * @param params
   * @returns 'String','Number'...
   */
  getTypeOf: (params: any) => {
    let type = Object.prototype.toString.call(params);
    let typeResult = type.match(/\[\w+\W(\w+)\]$/);
    if (typeResult) {
      return typeResult[1];
    }
    return null;
  },
  /**
   * https://stackoverflow.com/questions/69983708/how-to-make-the-javascript-null-check-more-clear
   * https://stackoverflow.com/questions/679915/how-do-i-test-for-an-empty-javascript-object
   * 数据空检查
   * @param AnyObject
   * @returns
   */
  isNull: (obj: any) => {
    for (const prop in obj) {
      if (Object.hasOwn(obj, prop)) {
        return false;
      }
    }
    return true;
  },
  /**
   * https://stackoverflow.com/questions/23437476/in-typescript-how-to-check-if-a-string-is-numeric
   * @param value
   * @returns
   */
  isNumber: (value: string | number): boolean => {
    return value != null && value !== "" && !isNaN(Number(value.toString()));
  },
  /**
   * 数组，字符串去重
   * @param Array,String
   * @returns
   */
  unique: function (params: any) {},
  genRandomStr: function (length: number): string {
    let randomStr = "";
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
      randomStr += characters.charAt(
        Math.floor(Math.random() * charactersLength)
      );
      counter += 1;
    }
    return randomStr;
  },
  joinUrl: (...paths: string[]): string => {
    const normalizedPaths = paths.map((path) => path.replace(/^\/|\/$/g, ""));
    return normalizedPaths.join("/");
  },
};

export default BaseMethods;
