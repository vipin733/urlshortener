import { NextApiResponse } from "next";
import { messages } from "../lib/enums";
import prisma from "../lib/prisma";
import { NextApiRequestWithUser } from "../types";

export const validURL = (str: string): boolean => {
    var pattern = new RegExp('^(https?:\\/\\/)?' + // protocol
        '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
        '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
        '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
        '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
        '(\\#[-a-z\\d_]*)?$', 'i'); // fragment locator
    return !!pattern.test(str)
}

export const validateEmail = (email: string): RegExpMatchArray | null => {
    return email.match(
        /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    )
}

export const CreateURLValidator = (handler: any) => {
    return async (req: NextApiRequestWithUser, res: NextApiResponse) => {
        let url = req.body.url
        let error  = null
        if (!url ) {
            error = "url" + messages.fieldRequired
        }

        if (url) {
            let isValidUrl = validURL(url)
            if (!isValidUrl) {
                error = "url" +  messages.fieldNotValid
            }
        }

        if (error) {
            return res.status(422).json({
                errors: {url:error}
            })
        }
        return handler(req, res)
    }
}

export const _getUserByEmail =  (email: string) => {
    return new Promise( async (res: any) => {
        const userDb = await prisma.user.findFirst({
            where: {
              email
            },
        })
        return res(userDb)
    })
}

export const CreateUserValidator = (handler: any) => {
    return async (req: NextApiRequestWithUser, res: NextApiResponse) => {
        let name = req.body.name
        let email = req.body.email
        let password = req.body.password

        let errors  = {}
        if (!name) {
            errors = {name: "name"+ messages.fieldRequired}
        }
        if (!email) {
            errors = {...errors, name: "email"+ messages.fieldRequired}
        }
        if (!password) {
            errors = {...errors, password: "password"+ messages.fieldRequired}
        }

        if (email) {
            let isEmailValid = validateEmail(email)
            if (!isEmailValid) {
                errors = {...errors, email: "email"+ messages.fieldNotValid}
            }
        }

        if (password && password.length < 6) {
            errors = {...errors, password: "password"+ messages.fieldMin + "6"}
        }

        if (Object.keys(errors).length) {
            return res.status(422).json({
                errors
            })
        }else{
            let taken = await _getUserByEmail(email)
            if (taken) {
                return res.status(422).json({
                    errors: {email: messages.emailTaken}
                })
            }
        }
        return handler(req, res)
    }
}

export const LoginValidator = (handler: any) => {
    return async (req: NextApiRequestWithUser, res: NextApiResponse) => {
        let email = req.body.email
        let password = req.body.password

        let errors  = {}
       
        if (!email) {
            errors = {...errors, name: "email"+ messages.fieldRequired}
        }
        if (!password) {
            errors = {...errors, password: "password"+ messages.fieldRequired}
        }

        if (email) {
            let isEmailValid = validateEmail(email)
            if (!isEmailValid) {
                errors = {...errors, email: "email"+ messages.fieldNotValid}
            }
        }

        if (password && password.length < 6) {
            errors = {...errors, password: "password"+ messages.fieldMin + "6"}
        }

        if (Object.keys(errors).length) {
            return res.status(422).json({
                errors
            })
        }
       
        return handler(req, res)
    }
}
