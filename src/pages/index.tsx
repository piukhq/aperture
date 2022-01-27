import type {NextPage} from 'next'
import {useEffect} from 'react'
import {useRouter} from 'next/router'
import Counter from 'components/Counter'

const IndexPage: NextPage = () => {
  const router = useRouter()

  // TODO: Likely temporary until we know where the app should open
  useEffect(() => {
    router.push('/asset-comparator')
  }, [router])

  return (
    <>
      <h1>Welcome to the greatest app in the world!</h1>
      <Counter />
    </>
  )
}

export default IndexPage
