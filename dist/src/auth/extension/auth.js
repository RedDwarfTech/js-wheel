export function handleAccessTokenExpire(e, retryTimes, params, callback) {
    chrome.storage.local.get('refreshToken', function (result) {
        var refreshToken = result.refreshToken;
        var urlParams = {
            deviceId: params.deviceId,
            app: params.appId,
            refreshToken: refreshToken,
        };
        //refreshAccessToken(urlParams, e, retryTimes, params, callback);
    });
}
