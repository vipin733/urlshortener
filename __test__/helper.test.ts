import { messages } from "../lib/enums";
import { checkHashPasword, createHashPasword, _getClassOfInput, _getError } from "../lib/helper";
import request from "supertest"

describe("check helper", () => {
    test('check createHashPasword and checkHashPasword and return true' , () => {
        let pass = "vipin"
        let hash = createHashPasword(pass)
        let isCheck = checkHashPasword(hash, pass)
        expect(isCheck).toBe(true)
    });

    test('check createHashPasword and checkHashPasword and return false' , () => {
        let pass = "vipin"
        let hash = createHashPasword(pass)
        let isCheck = checkHashPasword(hash, "pass")
        expect(isCheck).toBe(false)
    });

    test('check _getClassOfInput' , () => {
       let isError = ""
       let isLable = true

       let getClass  = _getClassOfInput(isError, isLable)
       expect(getClass).toEqual("sr-only")

       isLable = false
       getClass  = _getClassOfInput(isError, isLable)
       expect(getClass).toEqual("relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm")

       isError = "error"

       isLable = true
       getClass  = _getClassOfInput(isError, isLable)
       expect(getClass).toEqual("block text-red-700 dark:text-red-500")

       isLable = false
       getClass  = _getClassOfInput(isError, isLable)
       expect(getClass).toEqual("bg-red-50 border border-red-500 text-red-900 placeholder-red-700 text-sm rounded-lg focus:ring-red-500 focus:border-red-500 block w-full p-2.5 dark:bg-red-100 dark:border-red-400")
    });

    test('check _getError' , () => {
        let errors = {
            email: messages.emailTaken
        }
        let error = _getError("email", errors)
        expect(error).toEqual(messages.emailTaken)
    });
})