import { LoginType } from "@model/enumn/LoginType";
import { WheelGlobal } from "@model/immutable/WheelGlobal";
import LocalStorage from "@utils/data/LocalStorage";

export const AuthHandler = {
    pluginLogin: async () => {
        let username:string = await LocalStorage.readLocalStorage(WheelGlobal.USER_NAME);
        let password:string = await LocalStorage.readLocalStorage(WheelGlobal.PASSWORD);
        let deviceId:string = await Device.getDeviceId();
        let appId:string = await LocalStorage.readLocalStorage(WheelGlobal.REDDWARF_APP_ID_KEY);
        let loginParams = {
            phone: username,
            password: password,
            deviceId: deviceId,
            app: Number(appId),
            deviceType: 7,
            loginType: LoginType.PHONE,
        };
        AuthHandler.login(loginParams);
    },
    login: async (params: any) => {
        const apiUrl = await LocalStorage.readLocalStorage(WheelGlobal.BASE_AUTH_URL);
        const baseUrl = apiUrl + '/post/user/login';
        fetch(baseUrl, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify(params),
        })
            .then((response) => response.json())
            .then((res) => {
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
            })
            .catch((error) => {
                console.error(error);
            });
    },
}

export default AuthHandler




