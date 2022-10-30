import { NextApiResponse } from "next"
import prisma from "../lib/prisma"
import { DBToken, NextApiRequestWithUser,  User as UserModel } from "../types"
const jwt = require("jsonwebtoken")

const auth = (handler: any) => {
    return async (req: NextApiRequestWithUser, res: NextApiResponse) => {
        try {
            let token = req.cookies.token
            
            if (!token) {
                token = `${req.headers["token"]}`
            }
            
            if (!token) {
                return res.status(401).json({ message: "unauthorized" })
            }
            
            const { JWT_SECRET } = process.env
            let tokenData = jwt.verify(token, JWT_SECRET)
            
            if (!tokenData.id) {
                return res.status(401).json({ message: "unauthorized" })
            }

            const dbToken = await prisma.token.findFirst({
                where: {
                  id: tokenData.id,
                  revoke: false
                },
            })
        
            if (!dbToken) {
                return res.status(401).json({ message: "unauthorized" })
            }

            const userDb = await prisma.user.findUnique({
                where: {
                  id: dbToken.userId,
                },
            })

            if (!userDb) {
                return res.status(401).json({ message: "unauthorized" })
            }

            let user: UserModel = {
                id: userDb.id.toString(),
                name: userDb.name ?? "",
                email: userDb.email
            }

            let tokenReq: DBToken = {
                id: dbToken.id,
                user_id: dbToken.userId,
                revoke: dbToken.revoke,
                expire_at: dbToken.expireAt
            }
            req.user = user
            req.token = tokenReq
            
            return handler(req, res)
        } catch (error) {
            return res.status(401).json({ message: "unauthorized" })
        }
    }
}

export default auth