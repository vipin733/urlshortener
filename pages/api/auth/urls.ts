

import type { NextApiResponse } from 'next'
import { UserUrl, NextApiRequestWithUser } from '../../../types'
import wthAuth from "../../../middleware/withAuth"
import prisma from '../../../lib/prisma'

const Index = async (req: NextApiRequestWithUser, res: NextApiResponse<UserUrl[]>) => {
    let urls: UserUrl[] = []
    try {
        let user = req.user    

        const allUrls = await prisma.uRL.findMany({
                where: {
                  userId: Number(user.id),
                  revoke: false
                },
        })
        for (let index = 0; index < allUrls.length; index++) {
            const element = allUrls[index];
            urls.push({
                url: element.url,
                code:  process.env.NEXT_PUBLIC_URL_BASE+ element.code,
                revoke: element.revoke,
                expireAt: new Date(element.expireAt),
                createdAt: new Date(element.createdAt),
            })
        }
        return res.status(200).json(allUrls)
    } catch (error) {
       return res.status(200).json(urls)
    }
}


export default wthAuth(Index)