import  isNull  from "../../utils/data/checker.js";


export function handleAccessTokenExpire(e:any, retryTimes:Number, params:any, callback:any) {
        chrome.storage.local.get('refreshToken', (result:any) => {
            const refreshToken = result.refreshToken;
            const urlParams = {
                deviceId: params.deviceId,
                app: params.appId,
                refreshToken: refreshToken,
            };
            //refreshAccessToken(urlParams, e, retryTimes, params, callback);
        });
    }







