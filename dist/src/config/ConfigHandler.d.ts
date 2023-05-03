import { ConfigBase } from "../model/immutable/ConfigBase";
export declare const ConfigHandler: {
    init: (config: ConfigBase) => Promise<void>;
    stupidInit: (config: ConfigBase) => Promise<void>;
};
export default ConfigHandler;
