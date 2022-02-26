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
import { ResponseCode } from "./ResponseCode";
import BaseMethods from "../../utils/data/BaseMethods";
import { WheelGlobal } from "../../model/immutable/WheelGlobal";
import LocalStorage from "../../utils/data/LocalStorage";
import AuthHandler from "../../auth/extension/AuthHandler";
import DeviceHandler from "../../utils/data/DeviceHandler";
import { v4 as uuid } from 'uuid';
// https://juejin.cn/post/6844904014081949710
var isRefreshing = false;
var promise = null;
export var RequestHandler = {
    post: function (url, data, app) { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!(isRefreshing === true)) return [3 /*break*/, 1];
                    return [2 /*return*/, promise === null || promise === void 0 ? void 0 : promise.then(function () { return __awaiter(void 0, void 0, void 0, function () {
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, RequestHandler.api_post(url, data)];
                                    case 1: return [2 /*return*/, _a.sent()];
                                }
                            });
                        }); })];
                case 1: return [4 /*yield*/, RequestHandler.api_post(url, data)
                        .then(function (response) {
                        if (response.resultCode === ResponseCode.ACCESS_TOKEN_EXPIRED) {
                            isRefreshing = true;
                            RequestHandler.handleAccessTokenExpire(app);
                        }
                        else {
                            return response;
                        }
                    })];
                case 2: return [2 /*return*/, _a.sent()];
            }
        });
    }); },
    api_post: function (url, data) { return __awaiter(void 0, void 0, void 0, function () {
        var accessToken;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, LocalStorage.readLocalStorage(WheelGlobal.ACCESS_TOKEN_NAME)];
                case 1:
                    accessToken = _a.sent();
                    if (!accessToken) return [3 /*break*/, 3];
                    return [4 /*yield*/, RequestHandler.do_api_post(url, data, accessToken)];
                case 2: return [2 /*return*/, _a.sent()];
                case 3: return [4 /*yield*/, AuthHandler.pluginLogin()];
                case 4:
                    _a.sent();
                    return [4 /*yield*/, RequestHandler.do_api_post(url, data, accessToken)];
                case 5: return [2 /*return*/, _a.sent()];
            }
        });
    }); },
    do_api_post: function (url, data, accessToken) { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, fetch(url, {
                    method: 'POST',
                    headers: {
                        'Content-type': 'application/json',
                        'x-access-token': accessToken,
                        'x-request-id': uuid()
                    },
                    body: JSON.stringify(data),
                })
                    .then(function (response) {
                    if (!response.ok) {
                        throw new Error(response.statusText);
                    }
                    return response.json();
                })];
        });
    }); },
    handleAccessTokenExpire: function (app) { return __awaiter(void 0, void 0, void 0, function () {
        var deviceId, refreshToken, params;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, DeviceHandler.getDeviceId()];
                case 1:
                    deviceId = _a.sent();
                    return [4 /*yield*/, LocalStorage.readLocalStorage(WheelGlobal.REFRESH_TOKEN_NAME)];
                case 2:
                    refreshToken = _a.sent();
                    params = {
                        deviceId: deviceId,
                        app: app,
                        refreshToken: refreshToken,
                    };
                    RequestHandler.refreshAccessToken(params);
                    return [2 /*return*/];
            }
        });
    }); },
    refreshAccessToken: function (data) { return __awaiter(void 0, void 0, void 0, function () {
        var baseAuthUrl, accessTokenUrlPath, baseUrl;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, LocalStorage.readLocalStorage(WheelGlobal.BASE_AUTH_URL)];
                case 1:
                    baseAuthUrl = _a.sent();
                    return [4 /*yield*/, LocalStorage.readLocalStorage(WheelGlobal.ACCESS_TOKEN_URL_PATH)];
                case 2:
                    accessTokenUrlPath = _a.sent();
                    baseUrl = baseAuthUrl + accessTokenUrlPath;
                    fetch(baseUrl, {
                        method: 'POST',
                        headers: {
                            'Content-type': 'application/json',
                        },
                        body: JSON.stringify(data),
                    })
                        .then(function (res) { return res.json(); })
                        .then(function (res) {
                        console.log(res);
                        if (res && res.resultCode === ResponseCode.REFRESH_TOKEN_EXPIRED) {
                            RequestHandler.handleRefreshTokenExpire(data);
                        }
                        if (res && res.resultCode === '200') {
                            var accessToken = res.result.accessToken;
                            chrome.storage.local.set({
                                accessToken: accessToken,
                            }, function () {
                                isRefreshing = false;
                            });
                        }
                    });
                    return [2 /*return*/];
            }
        });
    }); },
    handleRefreshTokenExpire: function (data) {
        chrome.storage.local.get('username', function (resp) {
            var userName = resp.username;
            if (BaseMethods.isNull(userName)) {
                //Message('请配置用户名');
                return;
            }
            chrome.storage.local.get('password', function (pwdResp) {
                var password = pwdResp.password;
                if (BaseMethods.isNull(password)) {
                    //Message('请配置密码');
                    return;
                }
                var urlParams = {
                    phone: userName,
                    app: data.app,
                    deviceId: data.deviceId,
                    password: password,
                };
                RequestHandler.refreshRefreshToken(urlParams);
            });
        });
    },
    refreshRefreshToken: function (data) { return __awaiter(void 0, void 0, void 0, function () {
        var baseAuthUrl, refreshTokenUrlPath, baseUrl;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, LocalStorage.readLocalStorage(WheelGlobal.BASE_AUTH_URL)];
                case 1:
                    baseAuthUrl = _a.sent();
                    return [4 /*yield*/, localStorage.readLocalStorage(WheelGlobal.REFRESH_TOKEN_URL_PATH)];
                case 2:
                    refreshTokenUrlPath = _a.sent();
                    baseUrl = baseAuthUrl + refreshTokenUrlPath;
                    fetch(baseUrl, {
                        method: 'POST',
                        headers: {
                            'Content-type': 'application/json',
                        },
                        body: JSON.stringify(data),
                    })
                        .then(function (res) { return res.json(); })
                        .then(function (res) {
                        if (res && res.resultCode === '200') {
                            var accessToken = res.result.accessToken;
                            var refreshToken = res.result.refreshToken;
                            chrome.storage.local.set({
                                accessToken: accessToken,
                                refreshToken: refreshToken,
                            }, function () {
                                isRefreshing = false;
                            });
                        }
                    });
                    return [2 /*return*/];
            }
        });
    }); }
};
export default RequestHandler;
