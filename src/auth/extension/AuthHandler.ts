
export const AuthHandler = {
    handleAccessTokenExpire:(retryTimes:Number, params:any) => {
        chrome.storage.local.get('refreshToken', (result:any) => {
            const refreshToken = result.refreshToken;
            const urlParams = {
                deviceId: params.deviceId,
                app: params.appId,
                refreshToken: refreshToken,
            };
            //refreshAccessToken(urlParams, e, retryTimes, params, callback);
        });
    },
}

export default AuthHandler




