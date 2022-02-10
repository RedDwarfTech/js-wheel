import { ResponseCode } from "@net/rest/ResponseCode";
import { AuthHandler } from "@auth/extension/AuthHandler";

// https://juejin.cn/post/6844904014081949710
var isLoading = false;
var isTokenInvalid = false;
var promise: Promise<any> | null = null;

export const RequestHandler = {
    post: <T>(url: string, data: any) => {
        if (isLoading === true) {
            return promise?.then(() => {
                return RequestHandler.api_post<T>(url, data);
            })
        } else if (!isTokenInvalid) {
            promise = new Promise<any>((resolve, reject) => { 
                isLoading = true;

            });
        } else {
            return RequestHandler.api_post<T>(url, data);
        }
    },
    get: (response: any) => {
        if (response.statusCode === ResponseCode.ACCESS_TOKEN_EXPIRED) {
            let params = {};
            AuthHandler.handleAccessTokenExpire(0, params);
        }
    },
    api_post: <T>(url: string, data: any): Promise<T> => {
        return fetch(url, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
                'x-access-token': 'xxxxx'
            },
            body: JSON.stringify(data),
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error(response.statusText)
                }
                return response.json() as Promise<T>
            })
    },
    fetch_access_token:<T>():Promise<T> =>{
       return RequestHandler.api_post<T>("","");
    }
}

export default RequestHandler

