"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.responseSuccess = void 0;
function responseSuccess(response) {
    if (response.statusCode === "200" && response.resultCode === "200") {
        return true;
    }
    return false;
}
exports.responseSuccess = responseSuccess;
