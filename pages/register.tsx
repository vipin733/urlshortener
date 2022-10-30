import type { NextPage } from 'next'
import Link from 'next/link'
import Router from 'next/router'
import { useEffect, useState } from 'react'
import axiosConfig from '../lib/axios'
import { _registerUrl } from '../lib/baseurls'
import { messages } from '../lib/enums'
import { _getClassOfInput, _getError, _serverError } from '../lib/helper'

const Register: NextPage = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [name, setName] = useState("")
  const [loader, setLoader] = useState(false)
  const [showLink, setShowLink] = useState(false)
  const [errors, setErrors] = useState({})

  useEffect(() => {
    setShowLink(true)
  }, [])

  const _submit = async (e: any) => {
    try {
      e.preventDefault()
      setErrors({})
      setLoader(true)
      let body = {email, password, name}
      await axiosConfig.post(_registerUrl(), body)
      setLoader(false)
      alert(messages.success)
      Router.push("/login")
    } catch (error: any) {
      let errs = _serverError(error);
      setErrors(errs)
      setLoader(false)
    }
  }
  return (
    <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <div>
          <img className="mx-auto h-12 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600" alt="urlshortener" />
          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">Create account</h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={_submit}>
          <div className="-space-y-px rounded-md shadow-sm">
            <div>
              <label htmlFor="name" className={_getClassOfInput(_getError("name", errors), true)}>Name</label>
              <input id="name" name="name" type="text" value={name}  onChange={(e: any) => setName(e.target.value)} required className={_getClassOfInput(_getError("name", errors), false)} placeholder="Name" />
              {_getError("name", errors) ? <p className="mt-2 text-sm text-red-600 dark:text-red-500"><span className="font-medium">Oops!</span>{_getError("name", errors)}</p> : null}
            </div>
            <div>
              <label htmlFor="email-address" className={_getClassOfInput(_getError("email", errors), true)}>Email address</label>
              <input id="email-address" name="email" type="email" value={email}  onChange={(e: any) => setEmail(e.target.value)} required className={_getClassOfInput(_getError("email", errors), false)} placeholder="Email address" />
              {_getError("email", errors) ? <p className="mt-2 text-sm text-red-600 dark:text-red-500"><span className="font-medium">Oops!</span>{_getError("email", errors)}</p> : null}
            </div>
            <div>
              <label htmlFor="password" className={_getClassOfInput(_getError("password", errors), true)}>Password</label>
              <input id="password" name="password" type="password" value={password}  onChange={(e: any) => setPassword(e.target.value)} required className={_getClassOfInput(_getError("password", errors), false)} placeholder="Password" />
              {_getError("password", errors) ? <p className="mt-2 text-sm text-red-600 dark:text-red-500"><span className="font-medium">Oops!</span>{_getError("password", errors)}</p> : null}
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="text-sm">
             {showLink ?  <Link  href="/login" > <a className="font-medium text-indigo-600 hover:text-indigo-500">Already have account?</a></Link> : null}
            </div>
          </div>

          <div>
            <button type="submit" className="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                <svg className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fillRule="evenodd" d="M10 1a4.5 4.5 0 00-4.5 4.5V9H5a2 2 0 00-2 2v6a2 2 0 002 2h10a2 2 0 002-2v-6a2 2 0 00-2-2h-.5V5.5A4.5 4.5 0 0010 1zm3 8V5.5a3 3 0 10-6 0V9h6z" clipRule="evenodd" />
                </svg>
              </span>
              {loader ? "Wait..": "Create"}
            </button>
          </div>
        </form>
      </div>
    </div>

  )
}

export default Register