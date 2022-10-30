import bcrypt from "bcryptjs"
import Router from "next/router"
import axiosConfig from "./axios"
import { messages } from "./enums"

export const createHashPasword = (pass: string): string => {
    const salt = bcrypt.genSaltSync(10)
    const hash = bcrypt.hashSync(pass, salt)
    return hash
}

export const checkHashPasword = (hash: string | null, pass: string): boolean => {
    return bcrypt.compareSync(pass, `${hash}`)
}

export const _getClassOfInput = (isError: string, isLable: boolean): string => {
    if (isLable) {
        if (isError) {
            return "block text-red-700 dark:text-red-500"
        }

        return "sr-only"
    }

    if (isError) {
        return "bg-red-50 border border-red-500 text-red-900 placeholder-red-700 text-sm rounded-lg focus:ring-red-500 focus:border-red-500 block w-full p-2.5 dark:bg-red-100 dark:border-red-400"
    }

    return "relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
}

export const _getError = (input: string, errors: any): string => {
    let error = errors[input] ?? ""
    return error
}

export const _serverError = (error: any) => {
    if (error.response && error.response.data && error.response.data.errors) {
        return error.response.data.errors
    } else {
        return { error: messages.serverError }
    }
}

export const _logout = async () => {
    try {
        Router.push("/login")
        await axiosConfig.post(process.env.NEXT_PUBLIC_URL_BASE + "api/auth/logout")
    } catch (error) {
        alert(messages.serverError)
    }
}