export declare const AuthHandler: {
    storeUserAuthInfo: (accessTokenOrigin: string, baseAuthUrl: string, accessTokenUrlPath: string) => void;
    pluginLogin: () => Promise<any>;
    login: (params: any) => Promise<any>;
};
export default AuthHandler;
