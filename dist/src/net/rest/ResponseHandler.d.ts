import { ApiResponse } from '../../model/rest/response/ApiResonse';
import { EntityList } from '../../model/rest/response/EntityList';
export declare const ResponseHandler: {
    responseSuccess: (response: any) => boolean;
    handleCommonFailure: (response: any) => void;
    handleWebCommonFailure: (response: any) => Promise<unknown>;
    mapPageResponse: <T>(response: ApiResponse) => EntityList<T>;
};
export default ResponseHandler;
