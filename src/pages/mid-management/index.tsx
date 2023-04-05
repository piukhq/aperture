import type {NextPage} from 'next'
import {useRouter} from 'next/router'
import {useEffect} from 'react'
import {ContentTile, PageLayout} from 'components'
import {withPageAuthRequired} from '@auth0/nextjs-auth0'

const MidManagementPage: NextPage = withPageAuthRequired(() => {
  // TODO: To be removed once Landing page is developed
  const router = useRouter()
  useEffect(() => {
    router.replace('/mid-management/directory')
  }, [router])

  return (
    <PageLayout>
      <ContentTile>
      </ContentTile>
    </PageLayout>
  )
})

export default MidManagementPage
