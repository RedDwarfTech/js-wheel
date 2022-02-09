"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResponseHandler = void 0;
exports.ResponseHandler = {
    responseSuccess: (response) => {
        if (response.statusCode === "200" && response.resultCode === "200") {
            return true;
        }
        return false;
    }
};
