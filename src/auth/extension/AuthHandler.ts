import { LoginType } from "@model/enumn/LoginType";
import { WheelGlobal } from "@model/immutable/WheelGlobal";
import LocalStorage from "@utils/data/LocalStorage";
import DeviceHandler from "@utils/data/DeviceHandler";
import { jwtDecode } from "jwt-decode";

export const AuthHandler = {
    isTokenExpire: (token: string) => {
        try {
            const decodedToken = jwtDecode(token) as { [key: string]: any };
            if (decodedToken && decodedToken.exp) {
              const expirationTime = decodedToken.exp * 1000;
              return Date.now() > expirationTime;
            }
        } catch (error) {
        console.error('Error decoding token:', error);
        }
        return false;
    },
    pluginLogin: async () => {
        let username: string = await LocalStorage.readLocalStorage(WheelGlobal.USER_NAME);
        let password: string = await LocalStorage.readLocalStorage(WheelGlobal.PASSWORD);
        let deviceId: string = await DeviceHandler.getDeviceId();
        let appId: string = await LocalStorage.readLocalStorage(WheelGlobal.REDDWARF_APP_ID_KEY);
        let productId: string = await LocalStorage.readLocalStorage(WheelGlobal.REDDWARF_PRODUCT_ID_KEY);
        let loginParams = {
            phone: username,
            password: password,
            deviceId: deviceId,
            app: Number(appId),
            deviceType: 7,
            loginType: LoginType.PHONE,
            product: productId
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




