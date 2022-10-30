import type { NextPage } from 'next'
import axiosConfig from '../lib/axios'
import { _logout } from '../lib/helper'

import Header from "../components/header"
import Create from "../components/createurl"
import Body from "../components/body"
import { useEffect, useState } from 'react'
import { _allGetUrlUrl, _authUrl } from '../lib/baseurls'


export async function getServerSideProps({ req }: any) {
  try {
    let token = req.cookies.token
    let res = await axiosConfig.get(_authUrl(), { headers: { "token": `${token}` } })
    return { props: res.data }
  } catch (error: any) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    }
  }
}

const Home: NextPage = (props: any) => {
  const [urls, setUrls] = useState([]);

  const _getUrls = async () => {
    try {
      let res = await axiosConfig.get(_allGetUrlUrl())
      setUrls(res.data)
    } catch (error) {
      
    }
  }

  useEffect(() => {
    _getUrls()
  }, [])

  return (
    <div className="bg-white p-8 rounded-md w-full">
      <div className="flex justify-between cursor-pointer">
        <h3>Hi {props?.name}</h3>
        <h3 onClick={() => _logout()}>Logout</h3>
      </div>
      <Create onSuccess={() => _getUrls()}/>
      <div>
        <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
          <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
            <table className="min-w-full leading-normal">
              <Header />
              <Body urls={urls}/>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home