import { ResponseCode } from "@net/rest/ResponseCode";
import BaseMethods from "@utils/data/BaseMethods";
import RequestHandler from "./RequestHandler";
export var ResponseHandler = {
    responseSuccess: function (response) {
        if (BaseMethods.isNull(response)) {
            return false;
        }
        if (response.statusCode === "200" && response.resultCode === "200") {
            return true;
        }
        return false;
    },
    handleCommonFailure: function (response) {
        if (response.statusCode === ResponseCode.ACCESS_TOKEN_EXPIRED) {
            RequestHandler.handleAccessTokenExpire();
        }
    },
    mapPageResponse: function (response) {
        var tableSource = {
            data: response.result.list,
            success: true,
            total: response.result.pagination.total,
            pagination: {
                total: response.result.pagination.total,
                per_page: response.result.pagination.pageSize,
                page: response.result.pagination.pageNum
            }
        };
        return tableSource;
    }
};
export default ResponseHandler;
