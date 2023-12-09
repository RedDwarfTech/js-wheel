import { ConfigBase } from "@/model/immutable/ConfigBase";
import LocalStorage from "@/utils/data/LocalStorage";
import BaseMethods from "@/utils/data/BaseMethods";
// https://stackoverflow.com/questions/71191283/cannot-find-module-ts-transformer-keys-did-you-mean-to-set-the-moduleresolut
import { keys } from "ts-transformer-keys";
import { WheelGlobal } from "@/model/immutable/WheelGlobal";

export const ConfigHandler = {
    init: async (config: ConfigBase) => {
        const keysOfProps = keys<ConfigBase>();
        keysOfProps.forEach(async item => {
            let cacheKey = item.replace(/[A-Z]/g, m => "-" + m.toLowerCase());
            let configValue = await LocalStorage.readLocalStorage(cacheKey);
            let setValue = config[item];
            if(BaseMethods.isNull(configValue) || configValue !== setValue) {
                await LocalStorage.setLocalStorage(cacheKey, setValue.toString());
            }
        });
    },
    stupidInit: async (config: ConfigBase) => {
        let appId = await LocalStorage.readLocalStorage(WheelGlobal.REDDWARF_APP_ID_KEY);
        if (BaseMethods.isNull(appId)|| Number(appId)!==config.appId) {
            await LocalStorage.setLocalStorage(WheelGlobal.REDDWARF_APP_ID_KEY, config.appId.toString());
        }
        let authUrl = await LocalStorage.readLocalStorage(WheelGlobal.BASE_AUTH_URL);
        if (BaseMethods.isNull(authUrl)||authUrl!==config.baseAuthUrl) {
            await LocalStorage.setLocalStorage(WheelGlobal.BASE_AUTH_URL, config.baseAuthUrl.toString());
        }
        let userLoginUrlPath = await LocalStorage.readLocalStorage(WheelGlobal.USER_LOGIN_URL_PATH)
        if (BaseMethods.isNull(userLoginUrlPath)|| userLoginUrlPath!==config.userLoginUrlPath) {
            await LocalStorage.setLocalStorage(WheelGlobal.USER_LOGIN_URL_PATH, config.userLoginUrlPath.toString());
        }
        let userAccessUrlPath = await LocalStorage.readLocalStorage(WheelGlobal.USER_LOGIN_URL_PATH)
        if (BaseMethods.isNull(userAccessUrlPath)|| userAccessUrlPath!==config.accessTokenUrlPath) {
            await LocalStorage.setLocalStorage(WheelGlobal.ACCESS_TOKEN_URL_PATH, config.accessTokenUrlPath.toString());
        }
        let userRefreshUrlPath = await LocalStorage.readLocalStorage(WheelGlobal.USER_LOGIN_URL_PATH)
        if (BaseMethods.isNull(userRefreshUrlPath)|| userRefreshUrlPath!==config.refreshTokenUrlPath) {
            await LocalStorage.setLocalStorage(WheelGlobal.REFRESH_TOKEN_URL_PATH, config.refreshTokenUrlPath.toString());
        }
    }
}

export default ConfigHandler