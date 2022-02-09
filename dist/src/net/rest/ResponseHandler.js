export var ResponseHandler = {
    responseSuccess: function (response) {
        if (response.statusCode === "200" && response.resultCode === "200") {
            return true;
        }
        return false;
    }
};
export default ResponseHandler;
