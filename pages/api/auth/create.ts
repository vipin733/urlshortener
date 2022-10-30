

import type { NextApiResponse } from 'next'
import { UserUrl, NextApiRequestWithUser } from '../../../types'
import wthAuth from "../../../middleware/withAuth"
import prisma from '../../../lib/prisma'
import { messages } from '../../../lib/enums'
import { CreateURLValidator } from '../../../validator'
import { nanoid } from 'nanoid'

const Index = async (req: NextApiRequestWithUser, res: NextApiResponse<any>) => {
    try {

        let requestUrl = req.body.url
        let user = req.user    
        let code = nanoid(10)

        const expireAt = new Date(Date.now() + 30 * 24*60*60*1000) // 30 days expired date
        const createdUrl = await prisma.uRL.create({
            data: {
                userId: Number(user.id),
                url: requestUrl,
                code,
                expireAt
            }
        })
       
        let url: UserUrl = {
            url:createdUrl.url,
            code: createdUrl.code,
            revoke: false,
            expireAt: createdUrl.expireAt,
            createdAt: createdUrl.createdAt
        }
        return res.status(200).json({url})
    } catch (error) {
       return res.status(500).json({ message: messages.serverError})
    }
}


export default wthAuth(CreateURLValidator(Index))