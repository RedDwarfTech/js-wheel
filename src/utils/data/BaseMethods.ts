const BaseMethods = {
    /**
     * 获取数据类型
     * @param params 
     * @returns 'String','Number'...
     */
    getTypeOf: (params:any) => {
        let type = Object.prototype.toString.call(params)
        let typeResult = type.match(/\[\w+\W(\w+)\]$/)
        if(typeResult){
            return typeResult[1]
        }
        return null
    },
    /**
     * https://stackoverflow.com/questions/69983708/how-to-make-the-javascript-null-check-more-clear
     * 数据空检查
     * @param AnyObject
     * @returns 
     */
    isNull:(value:any) => {
        // any falsy value: https://developer.mozilla.org/en-US/docs/Glossary/Falsy
        if (!value) {return true;}
        if (typeof value === 'object') {
            // empty array
            if (Array.isArray(value) && value.length === 0) {return true;}
            // empty object
            if (value.toString() === '[object Object]' && JSON.stringify(value) === '{}') {return true;}
        }
        return false;
    },
    /**
     * 数组，字符串去重
     * @param Array,String
     * @returns 
     */
    unique: function(params: any){
        
        
    }
}

export default BaseMethods