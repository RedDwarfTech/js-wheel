export declare const RequestHandler: {
    post: <T>(url: string, data: any, app: Number) => Promise<void | T>;
    api_post: <T_1>(url: string, data: any) => Promise<T_1>;
    handleAccessTokenExpire: (app: Number) => void;
    refreshAccessToken: (data: any) => void;
    handleRefreshTokenExpire: (data: any) => void;
    refreshRefreshToken: (data: any) => void;
};
export default RequestHandler;
