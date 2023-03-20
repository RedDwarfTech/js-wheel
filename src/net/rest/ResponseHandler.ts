import { REST } from "@model/rest/response/ApiResonse";
import { ResponseCode } from "@net/rest/ResponseCode";
import BaseMethods from "@utils/data/BaseMethods";
import RequestHandler from "./RequestHandler";

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
    mapPageResponse:<T>(response:REST.ApiResponse) : REST.EntityList<T> => {
        let tableSource: REST.EntityList<T> = {
            data: response.result.list,
            pagination: {
              total: response.result.pagination.total,
              per_page: response.result.pagination.pageSize,
              page: response.result.pagination.pageNum
            }
        };
        return tableSource;
    }
}

export default ResponseHandler

