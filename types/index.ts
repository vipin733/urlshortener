import { NextApiRequest } from "next";

export interface HomeProps {
    isLoggedIn: Boolean;
}

export interface User {
    id: String,
    name?: String,
    email: String
}

export interface DBToken {
    id: String,
    user_id: BigInt,
    revoke: Boolean,
    expire_at: Date
}

export interface UserUrl {
    url: String,
    code: String,
    revoke: Boolean,
    expireAt: Date,
    createdAt: Date
}


export type NextApiRequestWithUser = NextApiRequest & {
    user: User,
    token: DBToken
}
  