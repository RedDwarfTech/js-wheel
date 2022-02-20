import { ConfigBase } from "@model/immutable/ConfigBase";
import LocalStorage from "@utils/data/LocalStorage";
import BaseMethods from "@utils/data/BaseMethods";
// https://stackoverflow.com/questions/71191283/cannot-find-module-ts-transformer-keys-did-you-mean-to-set-the-moduleresolut
import { keys } from "ts-transformer-keys";

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
    }
}

export default ConfigHandler