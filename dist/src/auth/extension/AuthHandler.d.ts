import { ILoginUserModel } from "@model/user/ILoginUserModel";
export declare const AuthHandler: {
    isTokenNeedRefresh: (seconds: number) => boolean;
    storeLoginAuthInfo: (loginUser: ILoginUserModel, baseAuthUrl: string, accessTokenUrlPath: string) => void;
    storeCookieAuthInfo: (accessTokenOrigin: string, baseAuthUrl: string, accessTokenUrlPath: string) => void;
    pluginLogin: () => Promise<any>;
    login: (params: any) => Promise<any>;
};
export default AuthHandler;
