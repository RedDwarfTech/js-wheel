export declare const RequestHandler: {
    post: <T>(url: string, data: any, app: Number) => Promise<any>;
    api_post: <T_1>(url: string, data: any) => Promise<T_1>;
    do_api_post: <T_2>(url: string, data: any, accessToken: string) => Promise<T_2>;
    handleRefreshTokenInvalid: () => Promise<void>;
    handleAccessTokenExpire: (app: Number) => Promise<void>;
    refreshAccessToken: (data: any) => Promise<void>;
    handleRefreshTokenExpire: (data: any) => void;
    refreshRefreshToken: (data: any) => Promise<void>;
};
export default RequestHandler;
