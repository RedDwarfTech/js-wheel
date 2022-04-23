declare const BaseMethods: {
    /**
     * 获取数据类型
     * @param params
     * @returns 'String','Number'...
     */
    getTypeOf: (params: any) => string | null;
    /**
     * https://stackoverflow.com/questions/69983708/how-to-make-the-javascript-null-check-more-clear
     * 数据空检查
     * @param AnyObject
     * @returns
     */
    isNull: (value: any) => boolean;
    /**
     * https://stackoverflow.com/questions/23437476/in-typescript-how-to-check-if-a-string-is-numeric
     * @param value
     * @returns
     */
    isNumber: (value: string | number) => boolean;
    /**
     * 数组，字符串去重
     * @param Array,String
     * @returns
     */
    unique: (params: any) => void;
};
export default BaseMethods;
