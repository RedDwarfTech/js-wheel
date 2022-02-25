import { ResponseCode } from "@net/rest/ResponseCode";
import BaseMethods from "@utils/data/BaseMethods";
import { WheelGlobal } from "@model/immutable/WheelGlobal";
import LocalStorage from "@utils/data/LocalStorage";
import AuthHandler from "@auth/extension/AuthHandler";
import DeviceHandler from "@utils/data/DeviceHandler";
import { v4 as uuid } from 'uuid';


// https://juejin.cn/post/6844904014081949710
var isRefreshing = false;
var promise: Promise<any> | null = null;

export const RequestHandler = {
    post: async <T>(url: string, data: any, app: Number) => {
        if (isRefreshing === true) {
            return promise?.then(async () => {
                return await RequestHandler.api_post<T>(url, data);
            })
        } else {
            return await RequestHandler.api_post<T>(url, data)
                .then((response: any) => {
                    if (response.resultCode === ResponseCode.ACCESS_TOKEN_EXPIRED) {
                        isRefreshing = true;
                        RequestHandler.handleAccessTokenExpire(app);
                    } else {
                        return response;
                    }
                });
        }
    },
    api_post: async <T>(url: string, data: any): Promise<T> => {
        let accessToken: any = await LocalStorage.readLocalStorage(WheelGlobal.ACCESS_TOKEN_NAME);
        if (accessToken) {
            return await RequestHandler.do_api_post(url, data, accessToken);
        } else {
            await AuthHandler.pluginLogin();
            return await RequestHandler.do_api_post(url, data, accessToken);
        }
    },
    do_api_post: async <T>(url: string, data: any, accessToken: string): Promise<T> => {
        return fetch(url, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
                'x-access-token': accessToken,
                'x-request-id': uuid()
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
    handleAccessTokenExpire: async (app: Number) => {
        const deviceId = await DeviceHandler.getDeviceId();
        let refreshToken: any = await LocalStorage.readLocalStorage(WheelGlobal.REFRESH_TOKEN_NAME);
        const params = {
            deviceId: deviceId,
            app: app,
            refreshToken: refreshToken,
        };
        RequestHandler.refreshAccessToken(params);
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
    handleRefreshTokenExpire: (data: any) => {
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

