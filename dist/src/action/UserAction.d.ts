export declare type userAction = loginByPhoneAction | userLoginAction | getCurrentUserAction;
export declare enum UserActionType {
    LOGIN_BY_PHONE = 0,
    USER_LOGIN = 1,
    GET_CURRENT_USER = 2
}
export interface loginByPhoneAction {
    type: UserActionType.LOGIN_BY_PHONE;
    data: any;
}
export interface userLoginAction {
    type: UserActionType.USER_LOGIN;
    data: any;
}
export interface getCurrentUserAction {
    type: UserActionType.USER_LOGIN;
    data: any;
}
