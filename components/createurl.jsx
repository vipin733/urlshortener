import { useState } from 'react'
import axiosConfig from '../lib/axios'
import { _createUrlUrl } from '../lib/baseurls'
import { messages } from '../lib/enums'
import { _getClassOfInput, _getError, _serverError } from '../lib/helper'

const Create = ({onSuccess}) => {
    const [url, setUrl] = useState("")
    const [loader, setLoader] = useState(false)
    const [errors, setErrors] = useState({})
    const _submit = async (e) => {
        try {
            e.preventDefault()
            setErrors({})
            setLoader(true)
            let body = { url }
            await axiosConfig.post(_createUrlUrl(), body)
            setLoader(false)
            alert(messages.success)
            setUrl("")
            onSuccess()
        } catch (error) {
            let errs = _serverError(error);
            setErrors(errs)
            setLoader(false)
        }
    }

    return (

        <div className="flex ">
            <div className="w-full max-w-md space-y-8">

                <form className="mt-8 space-y-6" onSubmit={_submit}>
                    <div className="-space-y-px rounded-md shadow-sm">
                        <div>
                            <input id="url-address" onChange={(e) => setUrl(e.target.value)} value={url} name="url" type="text" required className={_getClassOfInput(_getError("url", errors), false)} placeholder="Url" />
                            {_getError("url", errors) ? <p className="mt-2 text-sm text-red-600 dark:text-red-500"><span className="font-medium">Oops!</span>{_getError("url", errors)}</p> : null}
                        </div>
                    </div>
                    <div>
                        <button type="submit" className="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                            <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                                <svg className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                    <path fillRule="evenodd" d="M10 1a4.5 4.5 0 00-4.5 4.5V9H5a2 2 0 00-2 2v6a2 2 0 002 2h10a2 2 0 002-2v-6a2 2 0 00-2-2h-.5V5.5A4.5 4.5 0 0010 1zm3 8V5.5a3 3 0 10-6 0V9h6z" clipRule="evenodd" />
                                </svg>
                            </span>
                            {loader ? "Wait.." : "Create"}
                        </button>
                    </div>
                </form>
            </div>
        </div>

    )
}

export default Create