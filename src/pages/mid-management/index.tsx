import type {NextPage} from 'next'
import {useRouter} from 'next/router'
import {useEffect} from 'react'
import {ContentTile, HeadMetadata, PageLayout} from 'components'
import {withPageAuthRequired} from '@auth0/nextjs-auth0'

const MidManagementPage: NextPage = withPageAuthRequired(() => {
  // TODO: To be removed once Landing page is speced out
  const router = useRouter()
  useEffect(() => {
    router.replace('/mid-management/directory')
  }, [router])

  return (
    <PageLayout>
      <HeadMetadata pageTitle={'Aperture MID Directory'} pageDescription={'Manage MIDs, locations, secondary MIDs and PSIMIs'} />
      <ContentTile>
      </ContentTile>
    </PageLayout>
  )
})

export default MidManagementPage
