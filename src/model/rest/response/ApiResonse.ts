

declare namespace REST {

    type ApiResponse = {
        result:any,
        msg?: string,
        resultCode: string,
        statusCode: string
    };

    type Pagination = {
        total: number
        per_page: number
        page: number
    };

    type EntityList<T> = {
        data?: T[];
        /** 列表的内容总数 */
        total?: number;
        success?: boolean;
        pagination: Pagination;
    }
}
