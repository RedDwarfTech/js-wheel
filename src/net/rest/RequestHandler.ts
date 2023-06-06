import { ResponseCode } from "@net/rest/ResponseCode";
import { WheelGlobal } from "@model/immutable/WheelGlobal";
import LocalStorage from "@utils/data/LocalStorage";
import { AuthHandler } from "@auth/extension/AuthHandler";
import { v4 as uuid } from 'uuid';

// https://juejin.cn/post/6844904014081949710
var isRefreshing = false;
var promise: Promise<any> | null = null;

export const RequestHandler = {
    post: async <T>(url: string, data: any) => {
        if (isRefreshing === true) {
            return promise?.then(async () => {
                return await RequestHandler.api_post<T>(url, data);
            })
        } else {
            return await RequestHandler.api_post<T>(url, data)
                .then((response: any) => {
                    if (response.resultCode === ResponseCode.ACCESS_TOKEN_EXPIRED) {
                        isRefreshing = true;
                        RequestHandler.handleAccessTokenExpire();
                    } else {
                        return response;
                    }
                });
        }
    },
    api_post: async <T>(url: string, data: any): Promise<T> => {
        let accessToken: string = await LocalStorage.readLocalStorage(WheelGlobal.ACCESS_TOKEN_NAME);
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
    handleRefreshTokenInvalid: async () => {
        window.location.href = "/user/login";
    },
    handleWebAccessTokenExpire: async (): Promise<{ res: any }> => {
        let refreshToken: any = localStorage.getItem(WheelGlobal.REFRESH_TOKEN_NAME);
        const params = {
            grant_type: "refresh_token",
            refresh_token: refreshToken,
        };
        return await RequestHandler.refreshWebAccessToken(params);
    },
    handleAccessTokenExpire: async () => {
        let refreshToken: any = await LocalStorage.readLocalStorage(WheelGlobal.REFRESH_TOKEN_NAME);
        const params = {
            grant_type: "refresh_token",
            refresh_token: refreshToken,
        };
        RequestHandler.refreshAccessToken(params);
    },
    refreshWebAccessToken: async (data: any): Promise<{ res: any }> => {
        const baseAuthUrl = localStorage.getItem(WheelGlobal.BASE_AUTH_URL);
        const accessTokenUrlPath = localStorage.getItem(WheelGlobal.ACCESS_TOKEN_URL_PATH)!;
        const baseUrl = baseAuthUrl + accessTokenUrlPath;
        return fetch(baseUrl, {
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
                    localStorage.setItem(WheelGlobal.ACCESS_TOKEN_NAME, accessToken);
                    isRefreshing = false;
                    return Promise.resolve({ res });
                }
                return Promise.reject(new Error(res));
            });
    },
    refreshAccessToken: async (data: any) => {
        const baseAuthUrl = await LocalStorage.readLocalStorage(WheelGlobal.BASE_AUTH_URL);
        const accessTokenUrlPath = await LocalStorage.readLocalStorage(WheelGlobal.ACCESS_TOKEN_URL_PATH);
        const baseUrl = baseAuthUrl + accessTokenUrlPath;
        fetch(baseUrl, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify(data),
        })
            .then((res) => res.json())
            .then((res) => {
                if (res && res.resultCode === ResponseCode.REFRESH_TOKEN_EXPIRED || res && res.resultCode === ResponseCode.REFRESH_TOKEN_INVALID) {
                    RequestHandler.handleRefreshTokenInvalid();
                }
                if (res && res.resultCode === '200') {
                    const accessToken = res.result.accessToken;
                    chrome.storage.local.set(
                        {
                            [WheelGlobal.ACCESS_TOKEN_NAME]: accessToken,
                        },
                        function () {
                            isRefreshing = false;
                        }
                    );
                }
            });
    },
    refreshRefreshToken: async (data: any) => {
        const baseAuthUrl = await LocalStorage.readLocalStorage(WheelGlobal.BASE_AUTH_URL);
        const refreshTokenUrlPath = await localStorage.readLocalStorage(WheelGlobal.REFRESH_TOKEN_URL_PATH);
        const baseUrl = baseAuthUrl + refreshTokenUrlPath;
        fetch(baseUrl, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify(data),
        })
            .then((res) => res.json())
            .then((res) => {
                if (res && res.resultCode === ResponseCode.REFRESH_TOKEN_INVALID) {
                    AuthHandler.pluginLogin();
                }
                if (res && res.resultCode === '200') {
                    const accessToken = res.result.accessToken;
                    const refreshToken = res.result.refreshToken;
                    chrome.storage.local.set(
                        {
                            [WheelGlobal.ACCESS_TOKEN_NAME]: accessToken,
                            [WheelGlobal.REFRESH_TOKEN_NAME]: refreshToken,
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

