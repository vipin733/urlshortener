import type {  NextApiResponse } from 'next'
import wthAuth from "../../../middleware/withAuth"
import {  NextApiRequestWithUser } from '../../../types'
import { deleteCookie } from 'cookies-next';
import prisma from '../../../lib/prisma';


const Index = async (req: NextApiRequestWithUser, res: NextApiResponse) => {
    try {
        let token = req.token
        await prisma.token.update({
            where: {
              id: token.id.toString(),
            },
            data: {
              revoke: true,
            },
        })
        deleteCookie("token")
        return res.status(200).json({status: true})
    } catch (error) {
        return res.status(401).json({message: "unauthorized"})
    }
}

export default wthAuth(Index)