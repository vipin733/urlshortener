import type { NextApiRequest, NextApiResponse } from 'next'
import { setCookie } from 'cookies-next';
import prisma from '../../../lib/prisma';
import { messages } from '../../../lib/enums';
import { checkHashPasword } from '../../../lib/helper';
const jwt = require("jsonwebtoken")

const Index = async (req: NextApiRequest, res: NextApiResponse) => {
    try {

        const { JWT_SECRET } = process.env
        let {email, password} = req.body
        
        const userDb = await prisma.user.findUnique({
            where: {
              email
            },
        })

        if (!userDb) {
            return res.status(400).json({ errors: {email: messages.wrongCredentials} })
        }

        let passCheck = checkHashPasword(userDb.password, password)
        if (!passCheck) {
            return res.status(400).json({ errors: {email: messages.wrongCredentials} })
        }


        let expireAt = new Date(new Date().getTime() + 60 * 60 * 24 * 1000).toISOString();

        let dbToken = await prisma.token.create({
            data: {
                userId: userDb.id,
                expireAt,
                revoke: false,
            }
        })

        let token = await jwt.sign({ id: dbToken.id }, JWT_SECRET, { expiresIn: '24h' });

        setCookie('token', token, { req, res, maxAge: 60 * 60 * 24 });
        return res.status(200).json({ token })
    } catch (error) {
        return res.status(400).json({  errors: {email: messages.serverError} })
    }
}

export default Index