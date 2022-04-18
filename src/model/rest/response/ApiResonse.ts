

export declare namespace REST {

    export type ApiResponse = {
        result:any,
        msg?: string,
        resultCode: string,
        statusCode: string
    };

    export type Pagination = {
        total: number
        per_page: number
        page: number
    };

    export type EntityList<T> = {
        data?: T[];
        total?: number;
        success?: boolean;
        pagination: Pagination;
    }
}
