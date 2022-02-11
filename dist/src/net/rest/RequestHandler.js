import { ResponseCode } from "@net/rest/ResponseCode";
import BaseMethods from "utils/data/checker";
// https://juejin.cn/post/6844904014081949710
var isRefreshing = false;
var isTokenInvalid = false;
var promise = null;
export var RequestHandler = {
    post: function (url, data, app) {
        if (isRefreshing === true) {
            return promise === null || promise === void 0 ? void 0 : promise.then(function () {
                return RequestHandler.api_post(url, data);
            });
        }
        else if (!isTokenInvalid) {
            promise = new Promise(function (resolve, reject) {
                isRefreshing = true;
            });
        }
        else {
            return RequestHandler.api_post(url, data)
                .then(function (response) {
                if (response.statusCode === ResponseCode.ACCESS_TOKEN_EXPIRED) {
                    isRefreshing = true;
                    RequestHandler.handleAccessTokenExpire(app);
                }
            });
        }
    },
    api_post: function (url, data) {
        return fetch(url, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
                'x-access-token': 'xxxxx'
            },
            body: JSON.stringify(data),
        })
            .then(function (response) {
            if (!response.ok) {
                throw new Error(response.statusText);
            }
            return response.json();
        });
    },
    handleAccessTokenExpire: function (app) {
        // Initialize an agent at application startup.
        var fpPromise = require('@fingerprintjs/fingerprintjs');
        // Get the visitor identifier when you need it.
        fpPromise
            .then(function (fp) { return fp.get(); })
            .then(function (result) {
            // This is the visitor identifier:
            var deviceId = result.visitorId;
            chrome.storage.local.get('refreshToken', function (result) {
                var refreshToken = result.refreshToken;
                var params = {
                    deviceId: deviceId,
                    app: app,
                    refreshToken: refreshToken,
                };
                RequestHandler.refreshAccessToken(params);
            });
        });
    },
    refreshAccessToken: function (data) {
        var baseUrl = '/post/auth/access_token/refresh';
        fetch(baseUrl, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify(data),
        })
            .then(function (res) { return res.json(); })
            .then(function (res) {
            console.log(res);
            if (res && res.resultCode === '00100100004017') {
                // refresh token expired
                RequestHandler.handleRefreshTokenExpire(data);
            }
            if (res && res.resultCode === '200') {
                var accessToken = res.result.accessToken;
                chrome.storage.local.set({
                    accessToken: accessToken,
                }, function () {
                    isRefreshing = false;
                });
            }
        });
    },
    handleRefreshTokenExpire: function (data) {
        chrome.storage.local.get('username', function (resp) {
            var userName = resp.username;
            if (BaseMethods.isNull(userName)) {
                //Message('请配置用户名');
                return;
            }
            chrome.storage.local.get('password', function (pwdResp) {
                var password = pwdResp.password;
                if (BaseMethods.isNull(password)) {
                    //Message('请配置密码');
                    return;
                }
                var urlParams = {
                    phone: userName,
                    app: data.app,
                    deviceId: data.deviceId,
                    password: password,
                };
                RequestHandler.refreshRefreshToken(urlParams);
            });
        });
    },
    refreshRefreshToken: function (data) {
        var baseUrl = '/post/auth/refresh_token/refresh';
        fetch(baseUrl, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify(data),
        })
            .then(function (res) { return res.json(); })
            .then(function (res) {
            if (res && res.resultCode === '200') {
                var accessToken = res.result.accessToken;
                var refreshToken = res.result.refreshToken;
                chrome.storage.local.set({
                    accessToken: accessToken,
                    refreshToken: refreshToken,
                }, function () {
                    isRefreshing = false;
                });
            }
        });
    }
};
export default RequestHandler;
