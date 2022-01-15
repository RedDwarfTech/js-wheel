import { isNull } from "../../utils/data/checker.js";

const Auth = {
    handleAccessTokenExpire(e, retryTimes, params, callback) {
        chrome.storage.local.get('refreshToken', (result) => {
            const refreshToken = result.refreshToken;
            const urlParams = {
                deviceId: params.deviceId,
                app: params.appId,
                refreshToken: refreshToken,
            };
            refreshAccessToken(urlParams, e, retryTimes, params, callback);
        });
    },
}

export function refreshAccessToken(urlParams, e, retryTimes, params, callback) {
    const baseUrl = params.apiUrl + '/post/auth/access_token/refresh';
    fetch(baseUrl, {
        method: 'POST',
        headers: {
            'Content-type': 'application/json',
        },
        body: JSON.stringify(urlParams),
    })
        .then((res) => res.json())
        .then((res) => {
            console.log(res);
            if (res && res.resultCode === '00100100004017') {
                // refresh token expired
                handleRefreshTokenExpire(urlParams.deviceId, e, retryTimes, callback);
            }
            if (res && res.resultCode === '200') {
                const accessToken = res.result.accessToken;
                chrome.storage.local.set(
                    {
                        accessToken: accessToken,
                    },
                    function () {
                        retryTimes = retryTimes + 1;
                        calback(e, retryTimes);
                    }
                );
            }
        });
}

export function handleRefreshTokenExpire(deviceId, e, retryTimes, calback) {
    chrome.storage.local.get('username', (resp) => {
        const userName = resp.username;
        if (isNull(userName)) {
            Message('请配置用户名');
            return;
        }
        chrome.storage.local.get('password', (pwdResp) => {
            const password = pwdResp.password;
            if (isNull(password)) {
                Message('请配置密码');
                return;
            }
            const urlParams = {
                phone: userName,
                app: 1,
                deviceId: deviceId,
                password: password,
            };
            refreshRefreshToken(urlParams, e, retryTimes, callback);
        });
    });
}

export function refreshRefreshToken(urlParams, e, retryTimes, params, calback) {
    const baseUrl = params.apiUrl + '/post/auth/refresh_token/refresh';
    fetch(baseUrl, {
        method: 'POST',
        headers: {
            'Content-type': 'application/json',
        },
        body: JSON.stringify(urlParams),
    })
        .then((res) => res.json())
        .then((res) => {
            if (res && res.resultCode === '200') {
                const accessToken = res.result.accessToken;
                const refreshToken = res.result.refreshToken;
                chrome.storage.local.set(
                    {
                        accessToken: accessToken,
                        refreshToken: refreshToken,
                    },
                    function () {
                        retryTimes = retryTimes + 1;
                        calback(e, retryTimes);
                    }
                );
            }
        });
}






