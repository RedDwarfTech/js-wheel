"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ResponseHandler = {
    responseSuccess: (response) => {
        if (response.statusCode === "200" && response.resultCode === "200") {
            return true;
        }
        return false;
    }
};
exports.default = ResponseHandler;
