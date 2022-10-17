import type {NextPage} from 'next'
import {useEffect} from 'react'
import {useRouter} from 'next/router'
import {withPageAuthRequired} from '@auth0/nextjs-auth0'

const IndexPage: NextPage = withPageAuthRequired(() => {
  const router = useRouter()

  // TODO: Likely temporary until we know where the app should open
  useEffect(() => {
    router.push('/asset-comparator')
  }, [router])

  return (
    <>
      <h1>Welcome to the greatest app in the world!</h1>
    </>
  )
})

export default IndexPage
