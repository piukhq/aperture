import type {NextPage} from 'next'
import Image from 'next/image'
import {ContentTile, PageLayout} from 'components'

const DatabasePage: NextPage = () => {
  return (
    <PageLayout>
      <ContentTile>
        <div className='w-full h-full flex flex-col place-content-center items-center'>
          <Image src='/icons/svgs/construction.svg' height={200} width={200} alt='' />
          <h1 className='font-heading-1'>Database Page</h1>
        </div>
      </ContentTile>
    </PageLayout>
  )
}

export default DatabasePage
