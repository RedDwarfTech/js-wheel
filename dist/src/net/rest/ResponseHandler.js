export function responseSuccess(response) {
    if (response.statusCode === "200" && response.resultCode === "200") {
        return true;
    }
    return false;
}
