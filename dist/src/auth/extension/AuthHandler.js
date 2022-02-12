export var AuthHandler = {
    handleAccessTokenExpire: function (retryTimes, params) {
        chrome.storage.local.get('refreshToken', function (result) {
            var refreshToken = result.refreshToken;
            var urlParams = {
                deviceId: params.deviceId,
                app: params.appId,
                refreshToken: refreshToken,
            };
            //refreshAccessToken(urlParams, e, retryTimes, params, callback);
        });
    },
};
export default AuthHandler;
