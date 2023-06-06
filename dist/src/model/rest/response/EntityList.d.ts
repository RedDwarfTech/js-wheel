import { Pagination } from "./Pagination";
export type EntityList<T> = {
    data?: T[];
    total?: number;
    success?: boolean;
    pagination: Pagination;
};
