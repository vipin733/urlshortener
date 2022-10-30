import type { NextPage } from 'next'

export async function getServerSideProps({query}: any) {
  return {
    redirect: {
      destination: "/api/"+query.code,
      permanent: false,
    },
  }
}

const URL: NextPage = () => {
  return null
}

export default URL