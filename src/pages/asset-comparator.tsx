import type {NextPage} from 'next'
import Image from 'next/image'
import ContentTile from 'components/ContentTile'
import PageLayout from 'components/PageLayout'

const AssetComparatorPage: NextPage = () => {
  return (
    <PageLayout>
      <button className='flex items-center self-end w-36 min-h-[38px] pl-[12px] border rounded-xl bg-blue text-white'>
        <Image src='/icons/svgs/settings.svg' height={25} width={25} alt='' />
        <p className='ml-[10px] text-[14px] font-medium'>Credentials</p>
      </button>

      <ContentTile>
        <h1 className='text-2xl font-semibold text-off-black'>Welcome to the Bink Asset Comparator</h1>
        <h2 className='mt-[15px] text-[14px] text-off-grey-3'>Enter credentials above to compare assets across different environments</h2>
      </ContentTile>
    </PageLayout>
  )
}

export default AssetComparatorPage
