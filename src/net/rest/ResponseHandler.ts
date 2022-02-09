
export const ResponseHandler = {
    responseSuccess:(response:any) => {
        if(response.statusCode === "200" && response.resultCode === "200"){
            return true;
        }
        return false;
    }
}