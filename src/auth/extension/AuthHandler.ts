import { LoginType } from "@/model/enumn/LoginType";
import { WheelGlobal } from "@/model/immutable/WheelGlobal";
import LocalStorage from "@/utils/data/LocalStorage";
import DeviceHandler from "@/utils/data/DeviceHandler";
import { ILoginUserModel } from "@/model/user/ILoginUserModel";

export const AuthHandler = {
    isTokenNeedRefresh: (seconds: number) => {
        const accessToken = localStorage.getItem(WheelGlobal.ACCESS_TOKEN_NAME);
        if (!accessToken) {
            return false;
        }
        const claim = JSON.parse(atob(accessToken.split('.')[1]));
        const exp = claim.exp;
        const now = Math.floor(Date.now() / 1000);
        // seconds was the token prereload time gap
        const isExpired = exp < now + seconds;
        if (isExpired) {
            return true;
        } else {
            return false;
        }
    },
    storeLoginAuthInfo: (loginUser: ILoginUserModel, baseAuthUrl: string, accessTokenUrlPath: string) => {
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem(WheelGlobal.ACCESS_TOKEN_NAME, loginUser.accessToken);
        localStorage.setItem(WheelGlobal.REFRESH_TOKEN_NAME, loginUser.refreshToken);
        localStorage.setItem('avatarUrl', loginUser.avatarUrl ? loginUser.avatarUrl : "");
        localStorage.setItem(WheelGlobal.BASE_AUTH_URL, baseAuthUrl);
        localStorage.setItem(WheelGlobal.ACCESS_TOKEN_URL_PATH, accessTokenUrlPath);
    },
    storeCookieAuthInfo: (accessTokenOrigin: string, baseAuthUrl: string, accessTokenUrlPath: string) => {
        const accessTokenCookie = accessTokenOrigin.split("=")[1];
        const refreshTokenCookie = document.cookie.split('; ').find(row => row.startsWith('refreshToken='))?.split("=")[1];
        const avatarUrlCookie = document.cookie.split('; ').find(row => row.startsWith('avatarUrl='))?.split("=")[1];
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem(WheelGlobal.ACCESS_TOKEN_NAME, accessTokenCookie);
        localStorage.setItem(WheelGlobal.REFRESH_TOKEN_NAME, refreshTokenCookie ? refreshTokenCookie : "");
        localStorage.setItem('avatarUrl', avatarUrlCookie ? avatarUrlCookie : "");
        localStorage.setItem(WheelGlobal.BASE_AUTH_URL, baseAuthUrl);
        localStorage.setItem(WheelGlobal.ACCESS_TOKEN_URL_PATH, accessTokenUrlPath);
    },
    pluginLogin: async () => {
        let username: string = await LocalStorage.readLocalStorage(WheelGlobal.USER_NAME);
        let password: string = await LocalStorage.readLocalStorage(WheelGlobal.PASSWORD);
        let deviceId: string = await DeviceHandler.getDeviceIdEnhance();
        let appId: string = await LocalStorage.readLocalStorage(WheelGlobal.REDDWARF_APP_ID_KEY);
        let loginParams = {
            phone: username,
            password: password,
            deviceId: deviceId,
            deviceName: deviceId,
            appId: Number(appId),
            deviceType: 7,
            loginType: LoginType.PHONE
        };
        return AuthHandler.login(loginParams);
    },
    login: async (params: any) => {
        const baseAuthUrl = await LocalStorage.readLocalStorage(WheelGlobal.BASE_AUTH_URL);
        const userLoginUrl = await LocalStorage.readLocalStorage(WheelGlobal.USER_LOGIN_URL_PATH);
        const baseUrl = baseAuthUrl + userLoginUrl;
        let response = await fetch(baseUrl, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify(params),
        });
        let res = await response.json();
        if (res && res.result && res.result.accessToken) {
            const accessToken = res.result.accessToken;
            const refreshToken = res.result.refreshToken;
            chrome.storage.local.set(
                {
                    [WheelGlobal.ACCESS_TOKEN_NAME]: accessToken,
                    [WheelGlobal.REFRESH_TOKEN_NAME]: refreshToken,
                }
            );
        }
        return res;
    },
}

export default AuthHandler




