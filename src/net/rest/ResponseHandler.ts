import { ResponseCode } from "@/net/rest/ResponseCode";
import BaseMethods from "@/utils/data/BaseMethods";
import RequestHandler from "./RequestHandler";
import { ApiResponse } from "@/model/rest/response/ApiResponse";
import { EntityList } from "@/model/rest/response/EntityList";

export const ResponseHandler = {
    responseSuccess:(response:any) => {
        if(BaseMethods.isNull(response)){
            return false;
        }
        if(response.statusCode === "200" && response.resultCode === "200"){
            return true;
        }
        return false;
    },
    handleCommonFailure:(response:any) => {
        if(response.resultCode === ResponseCode.ACCESS_TOKEN_EXPIRED){
            RequestHandler.handleAccessTokenExpire();
        }
    },
    handleWebCommonFailure:async (response:any) => {
        if(response.resultCode === ResponseCode.ACCESS_TOKEN_EXPIRED){
            return await RequestHandler.handleWebAccessTokenExpire();
        }
    },
    mapPageResponse:<T>(response:ApiResponse) : EntityList<T> => {
        let tableSource: EntityList<T> = {
            data: response.result.list,
            pagination: {
              total: response.result.pagination.total,
              per_page: response.result.pagination.pageSize,
              page: response.result.pagination.pageNum
            }
        };
        return tableSource;
    },
    mapUnwrapPage:<T>(response: any) : EntityList<T> => {
        let tableSource: EntityList<T> = {
            data: response.list,
            pagination: {
              total: response.pagination.total,
              per_page: response.pagination.pageSize,
              page: response.result.pagination.pageNum
            }
        };
        return tableSource;
    }
}

export default ResponseHandler

