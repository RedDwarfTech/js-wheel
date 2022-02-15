import { LoginType } from "@model/enumn/LoginType";
import { WheelGlobal } from "@model/immutable/WheelGlobal";
import LocalStorage from "@utils/data/LocalStorage";

export const AuthHandler = {
    pluginLogin: async () => {
        let username:string = await LocalStorage.readLocalStorage(WheelGlobal.USER_NAME);
        let password:string = await LocalStorage.readLocalStorage(WheelGlobal.PASSWORD);
        let deviceId:string = await Device.getDeviceId();
        let loginParams = {
            phone: username,
            password: password,
            deviceId: deviceId,
            app: 1,
            deviceType: 7,
            loginType: LoginType.PHONE,
        };
        AuthHandler.login(loginParams);
    },
    login: (params: any) => {
        
    },
}

export default AuthHandler




