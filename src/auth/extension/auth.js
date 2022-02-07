"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleAccessTokenExpire = void 0;
function handleAccessTokenExpire(e, retryTimes, params, callback) {
    chrome.storage.local.get('refreshToken', (result) => {
        const refreshToken = result.refreshToken;
        const urlParams = {
            deviceId: params.deviceId,
            app: params.appId,
            refreshToken: refreshToken,
        };
        //refreshAccessToken(urlParams, e, retryTimes, params, callback);
    });
}
exports.handleAccessTokenExpire = handleAccessTokenExpire;
