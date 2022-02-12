import { ResponseCode } from "@net/rest/ResponseCode";
import BaseMethods from "@utils/data/checker";
import { WheelGlobal } from "model/immutable/WheelGlobal";

// https://juejin.cn/post/6844904014081949710
var isRefreshing = false;
var promise: Promise<any> | null = null;

export const RequestHandler = {
    post: <T>(url: string, data: any,app:Number) => {
        if (isRefreshing === true) {
            return promise?.then(() => {
                return RequestHandler.api_post<T>(url, data);
            })
        } else {
            return RequestHandler.api_post<T>(url, data)
                .then((response: any) => {
                    if (response.statusCode === ResponseCode.ACCESS_TOKEN_EXPIRED) {
                        isRefreshing = true;
                        RequestHandler.handleAccessTokenExpire(app);
                    }else{

                    }
                });
        }
    },
    api_post:async <T>(url: string, data: any): Promise<T> => {
        let accessToken:any = await readLocalStorage(WheelGlobal.ACCESS_TOKEN_NAME);
        return fetch(url, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
                'x-access-token': accessToken,
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
    handleAccessTokenExpire: (app: Number) => {
        // Initialize an agent at application startup.
        const fpPromise = require('@fingerprintjs/fingerprintjs');

        // Get the visitor identifier when you need it.
        fpPromise
            .then((fp: { get: () => any; }) => fp.get())
            .then(async (result: { visitorId: any; }) => {
                // This is the visitor identifier:
                const deviceId = result.visitorId;
                let refreshToken:any = await readLocalStorage(WheelGlobal.REFRESH_TOKEN_NAME);
                const params = {
                    deviceId: deviceId,
                    app: app,
                    refreshToken: refreshToken,
                };
                RequestHandler.refreshAccessToken(params);
            });
    },
    refreshAccessToken: (data: any) => {
        const baseUrl = '/post/auth/access_token/refresh';
        fetch(baseUrl, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify(data),
        })
            .then((res) => res.json())
            .then((res) => {
                console.log(res);
                if (res && res.resultCode === '00100100004017') {
                    // refresh token expired
                    RequestHandler.handleRefreshTokenExpire(data);
                }
                if (res && res.resultCode === '200') {
                    const accessToken = res.result.accessToken;
                    chrome.storage.local.set(
                        {
                            accessToken: accessToken,
                        },
                        function () {
                            isRefreshing = false;
                        }
                    );
                }
            });
    },
    handleRefreshTokenExpire: (data:any) => {
        chrome.storage.local.get('username', (resp) => {
            const userName = resp.username;
            if (BaseMethods.isNull(userName)) {
                //Message('请配置用户名');
                return;
            }
            chrome.storage.local.get('password', (pwdResp) => {
                const password = pwdResp.password;
                if (BaseMethods.isNull(password)) {
                    //Message('请配置密码');
                    return;
                }
                const urlParams = {
                    phone: userName,
                    app: data.app,
                    deviceId: data.deviceId,
                    password: password,
                };
                RequestHandler.refreshRefreshToken(urlParams);
            });
        });
    },
    refreshRefreshToken: (data: any) => {
        const baseUrl = '/post/auth/refresh_token/refresh';
        fetch(baseUrl, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify(data),
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
                            isRefreshing = false;
                        }
                    );
                }
            });
    }
}

export default RequestHandler

