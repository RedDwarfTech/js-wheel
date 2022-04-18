export declare namespace REST {
    type ApiResponse = {
        result: any;
        msg?: string;
        resultCode: string;
        statusCode: string;
    };
    type Pagination = {
        total: number;
        per_page: number;
        page: number;
    };
    type EntityList<T> = {
        data?: T[];
        total?: number;
        success?: boolean;
        pagination: Pagination;
    };
}
