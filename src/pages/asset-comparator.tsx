import type {NextPage} from 'next'
import Image from 'next/image'

const AssetComparatorPage: NextPage = () => {
  return (
    <div id='asset-comparator' className='flex w-full flex-col mt-[57px] mr-[139px] mb-[133px] ml-[61px]'>
      <button className='flex items-center self-end w-36 min-h-[38px] pl-[12px] border rounded-xl bg-blue text-white'>
        <Image src='/icons/svgs/settings.svg' height={25} width={25} alt='' />
        <p className='ml-[10px] text-[14px] font-medium'>Credentials</p>
      </button>

      <div className='flex flex-col items-center shadow-black rounded-xl h-[937px] mt-[42px] pt-[145px] bg-white'>
        <h1 className='text-2xl font-semibold text-off-black'>Welcome to the Bink Asset Comparator</h1>
        <h2 className='mt-[15px] text-[14px] text-off-grey-3'>Enter credentials above to compare assets across different environments</h2>
      </div>
    </div>
  )
}

export default AssetComparatorPage
