const BaseMethods = {
    /**
     * 获取数据类型
     * @param params 
     * @returns 'String','Number'...
     */
    getTypeOf: (params) => {
        let type = Object.prototype.toString.call(params)
        return type.match(/\[\w+\W(\w+)\]$/)[1]
    },
    /**
     * // https://stackoverflow.com/questions/69983708/how-to-make-the-javascript-null-check-more-clear
     * 数据空检查
     * @param AnyObject
     * @returns 
     */
    isNull:(value) => {
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
    unique: function(params) {
        if (this.getTypeOf(params) === 'Array') {
            return [...new Set(arr)]
        }
        if (this.getTypeOf(params) === 'String') {
            let obj = {}
            let str = ''
            for(let i = 0, len = params.length; i < len; i++) {
                if (!obj[params[i]]) {
                    str += params[i]
                    obj[params[i]] = true
                }
            }
            return str
        }
        
    }
}

export default BaseMethods