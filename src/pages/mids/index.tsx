import type {NextPage} from 'next'
import Image from 'next/image'
import {useRouter} from 'next/router'
import {useEffect} from 'react'
import {ContentTile, PageLayout} from 'components'

const MidManagementPage: NextPage = () => {
  // TODO: To be removed once Landing page is speced out
  const router = useRouter()
  useEffect(() => {
    router.replace('/mids/database')
  }, [router])

  return (
    <PageLayout>
      <ContentTile>
        <div className='w-full h-full flex flex-col place-content-center items-center'>
          <Image src='/icons/svgs/construction.svg' height={200} width={200} alt='' />
          <h1 className='font-heading-1'>Page under construction!</h1>
        </div>
      </ContentTile>
    </PageLayout>
  )
}

export default MidManagementPage
