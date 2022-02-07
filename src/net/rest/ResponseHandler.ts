export function responseSuccess(response:any):boolean {
    if(response.statusCode === "200" && response.resultCode === "200"){
        return true;
    }
    return false;
}