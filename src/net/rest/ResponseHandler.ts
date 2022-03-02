import { ResponseCode } from "@net/rest/ResponseCode";
import BaseMethods from "@utils/data/BaseMethods";

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
        if(response.statusCode === ResponseCode.ACCESS_TOKEN_EXPIRED){
            let params = {};
            // AuthHandler.handleAccessTokenExpire(0,params);
        }
    }
}

export default ResponseHandler

