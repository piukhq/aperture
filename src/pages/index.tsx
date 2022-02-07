import type {NextPage} from 'next'
import {useEffect} from 'react'
import {useRouter} from 'next/router'

const IndexPage: NextPage = () => {
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
}

export default IndexPage
