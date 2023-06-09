import { UserBind } from "./UserBind";

export type UserModel = {
    nickname: string;
    autoRenewProductExpireTimeMs: number;
    thirdBind: UserBind[]
}