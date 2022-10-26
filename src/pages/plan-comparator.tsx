import type {NextPage} from 'next'
import Image from 'next/image'
import {ContentTile, PageLayout} from 'components'
import {withPageAuthRequired} from '@auth0/nextjs-auth0'

const PlanComparatorPage: NextPage = withPageAuthRequired(() => {
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
})

export default PlanComparatorPage
