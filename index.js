"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//import BaseMethods from "./src/utils/data/checker";
//import Validate from "./src/utils/data/validate";
const auth_1 = require("./src/auth/extension/auth");
exports.default = {
    //BaseMethods,
    //Validate,
    handleAccessTokenExpire: auth_1.handleAccessTokenExpire
};
