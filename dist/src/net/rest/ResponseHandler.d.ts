import { REST } from "../../model/rest/response/ApiResonse";
export declare const ResponseHandler: {
    responseSuccess: (response: any) => boolean;
    handleCommonFailure: (response: any) => void;
    handleWebCommonFailure: (response: any) => Promise<{
        access_token: string;
    } | undefined>;
    mapPageResponse: <T>(response: REST.ApiResponse) => REST.EntityList<T>;
};
export default ResponseHandler;
