var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import { LoginType } from "../../model/enumn/LoginType";
import { WheelGlobal } from "../../model/immutable/WheelGlobal";
import LocalStorage from "../../utils/data/LocalStorage";
import DeviceHandler from "../../utils/data/DeviceHandler";
export var AuthHandler = {
    pluginLogin: function () { return __awaiter(void 0, void 0, void 0, function () {
        var username, password, deviceId, appId, productId, loginParams;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, LocalStorage.readLocalStorage(WheelGlobal.USER_NAME)];
                case 1:
                    username = _a.sent();
                    return [4 /*yield*/, LocalStorage.readLocalStorage(WheelGlobal.PASSWORD)];
                case 2:
                    password = _a.sent();
                    return [4 /*yield*/, DeviceHandler.getDeviceId()];
                case 3:
                    deviceId = _a.sent();
                    return [4 /*yield*/, LocalStorage.readLocalStorage(WheelGlobal.REDDWARF_APP_ID_KEY)];
                case 4:
                    appId = _a.sent();
                    return [4 /*yield*/, LocalStorage.readLocalStorage(WheelGlobal.REDDWARF_PRODUCT_ID_KEY)];
                case 5:
                    productId = _a.sent();
                    loginParams = {
                        phone: username,
                        password: password,
                        deviceId: deviceId,
                        app: Number(appId),
                        deviceType: 7,
                        loginType: LoginType.PHONE,
                        product: productId
                    };
                    return [2 /*return*/, AuthHandler.login(loginParams)];
            }
        });
    }); },
    login: function (params) { return __awaiter(void 0, void 0, void 0, function () {
        var baseAuthUrl, userLoginUrl, baseUrl, response, res, accessToken, refreshToken;
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, LocalStorage.readLocalStorage(WheelGlobal.BASE_AUTH_URL)];
                case 1:
                    baseAuthUrl = _b.sent();
                    return [4 /*yield*/, LocalStorage.readLocalStorage(WheelGlobal.USER_LOGIN_URL_PATH)];
                case 2:
                    userLoginUrl = _b.sent();
                    baseUrl = baseAuthUrl + userLoginUrl;
                    return [4 /*yield*/, fetch(baseUrl, {
                            method: 'POST',
                            headers: {
                                'Content-type': 'application/json',
                            },
                            body: JSON.stringify(params),
                        })];
                case 3:
                    response = _b.sent();
                    return [4 /*yield*/, response.json()];
                case 4:
                    res = _b.sent();
                    if (res && res.result && res.result.accessToken) {
                        accessToken = res.result.accessToken;
                        refreshToken = res.result.refreshToken;
                        chrome.storage.local.set((_a = {},
                            _a[WheelGlobal.ACCESS_TOKEN_NAME] = accessToken,
                            _a[WheelGlobal.REFRESH_TOKEN_NAME] = refreshToken,
                            _a));
                    }
                    return [2 /*return*/, res];
            }
        });
    }); },
};
export default AuthHandler;
