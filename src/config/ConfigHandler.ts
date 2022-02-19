import { ConfigBase } from "@model/immutable/ConfigBase";
import { WheelGlobal } from "@model/immutable/WheelGlobal";
import LocalStorage from "@utils/data/LocalStorage";
import BaseMethods from "@utils/data/BaseMethods";

export const ConfigHandler = {
    init: async (config: ConfigBase) => {
        let appId = await LocalStorage.readLocalStorage(WheelGlobal.REDDWARF_APP_ID_KEY);
        if (BaseMethods.isNull(appId)) {
            await LocalStorage.setLocalStorage(WheelGlobal.REDDWARF_APP_ID_KEY, config.appId.toString());
        }

        let authUrl = await LocalStorage.readLocalStorage(WheelGlobal.BASE_AUTH_URL);
        if (BaseMethods.isNull(authUrl)) {
            await LocalStorage.setLocalStorage(WheelGlobal.BASE_AUTH_URL, config.baseAuthUrl.toString());
        }
    }
}

export default ConfigHandler