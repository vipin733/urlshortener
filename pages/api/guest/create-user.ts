

import type { NextApiResponse } from 'next'
import { NextApiRequestWithUser } from '../../../types'
import prisma from '../../../lib/prisma'
import { messages } from '../../../lib/enums'
import { CreateUserValidator } from '../../../validator'
import { createHashPasword } from '../../../lib/helper'

const Index = async (req: NextApiRequestWithUser, res: NextApiResponse<any>) => {
    try {
        let {name, email, password} = req.body
        let hash = createHashPasword(password)
        await prisma.user.create({
            data: {
                name: name,
                email: email,
                password: hash,
            }
        })
        return res.status(201).json({ message: messages.success})
    } catch (error) {
       return res.status(500).json({ errors: {email: messages.serverError}})
    }
}

export default CreateUserValidator(Index)