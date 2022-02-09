import { ResponseCode } from "@net/rest/ResponseCode";
import { AuthHandler } from "@auth/extension/AuthHandler";

export const ResponseHandler = {
    responseSuccess:(response:any) => {
        if(response.statusCode === "200" && response.resultCode === "200"){
            return true;
        }
        return false;
    },
    handleCommonFailure:(response:any) => {
        if(response.statusCode === ResponseCode.ACCESS_TOKEN_EXPIRED){
            let params = {};
            AuthHandler.handleAccessTokenExpire(0,params);
        }
    }
}

export default ResponseHandler

