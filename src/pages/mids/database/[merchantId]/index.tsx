import type {NextPage} from 'next'
import {useRouter} from 'next/router'
import Image from 'next/image'
import {ContentTile, PageLayout} from 'components'

const MerchantsPage: NextPage = () => {
  const router = useRouter()
  const {merchantId} = router.query
  return (
    <PageLayout>
      <ContentTile>
        <div className='w-full h-full flex flex-col place-content-center items-center'>
          <Image src='/icons/svgs/construction.svg' height={200} width={200} alt='' />
          <h1 className='font-heading-1'>Merchant Locations List</h1>
          <h2 className='font-heading-2'>Merchant ID: {merchantId}</h2>
        </div>
      </ContentTile>
    </PageLayout>
  )
}

export default MerchantsPage
