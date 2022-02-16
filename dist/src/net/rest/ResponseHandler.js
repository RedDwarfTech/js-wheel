import { ResponseCode } from "./ResponseCode";
export var ResponseHandler = {
    responseSuccess: function (response) {
        if (response.statusCode === "200" && response.resultCode === "200") {
            return true;
        }
        return false;
    },
    handleCommonFailure: function (response) {
        if (response.statusCode === ResponseCode.ACCESS_TOKEN_EXPIRED) {
            var params = {};
            // AuthHandler.handleAccessTokenExpire(0,params);
        }
    }
};
export default ResponseHandler;
