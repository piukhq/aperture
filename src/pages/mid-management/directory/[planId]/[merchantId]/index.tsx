import type {NextPage} from 'next'
import {useRouter} from 'next/router'
import {PageLayout, DirectoryDetailsHeader, DirectoryMerchantMids} from 'components'
import {mockPlanDetailsData} from 'utils/mockPlanDetailsData'
import {getSelectedDirectoryMerchant} from 'features/directoryMerchantSlice'
import {getSelectedDirectoryPlan} from 'features/directoryPlanSlice'
import {useAppSelector} from 'app/hooks'


const MerchantDetailsPage: NextPage = () => {
  const router = useRouter()
  const selectedPlan = useAppSelector(getSelectedDirectoryPlan)
  const selectedMerchant = useAppSelector(getSelectedDirectoryMerchant)
  const {merchantId} = router.query

  // TODO: Replace current placeholder logic instead of making API calls, probably will become utils.
  const getPlanDetails = () => {
    return mockPlanDetailsData
  }
  const getMerchant = () => {
    const merchant = mockPlanDetailsData.merchants.find(merchant => merchant.merchant.merchant_ref === merchantId)
    return merchant ? merchant : mockPlanDetailsData.merchants[0]
  }
  // If plan and merchant is known due to previous API calls use it, else hit the API to get them.
  const planDetails = selectedPlan.plan_ref ? selectedPlan : getPlanDetails()
  const merchant = selectedMerchant.merchant_ref ? selectedMerchant : getMerchant().merchant
  const {slug, plan_id: schemeId} = planDetails.plan_metadata
  const {name, icon_url: iconUrl, location_label: locationLabel} = merchant.merchant_metadata


  const renderMerchantDetailsSection = () => {
    // TODO: Add logic to render different future components based on the tab query string
    return <DirectoryMerchantMids />
  }

  return (
    <>
      <PageLayout>
        <DirectoryDetailsHeader planId={schemeId} name={name} slug={slug} iconUrl={iconUrl} locationLabel={locationLabel} isMerchant />
        <div className='rounded-[10px] mt-[15px] bg-white dark:bg-grey-825 shadow-[0_1px_6px_0px_rgba(0,0,0,0.5)]'>
          <nav className='grid grid-cols-4 w-full pl-[69px] border-b border-grey-800/10 pr-[10px]'>
            <button className='grid gap-1 place-content-center h-[60px] font-heading-8 text-grey-900 dark:text-grey-100 bg-white dark:bg-grey-825 dark:hover:text-white border-b-2 border-b-blue'>
              <span className='place-content-center flex h-[51px] items-center'>MIDs</span>
            </button>
            <button className='grid gap-1 place-content-center h-[60px] font-heading-8 font-regular text-sm tracking-[0.1px] text-grey-600 dark:text-grey-100 bg-white dark:bg-grey-825 dark:hover:text-white  hover:text-grey-900 duration-200'>
              <span className='place-content-center flex h-[51px] items-center '>Secondary MIDs</span>
            </button>
            <button className='grid gap-1 place-content-center h-[60px] font-heading-8 font-regular text-sm tracking-[0.1px] text-grey-600 dark:text-grey-100 bg-white dark:bg-grey-825 dark:hover:text-white hover:text-grey-900 duration-200'>
              <span className='place-content-center flex h-[51px] items-center'>Locations</span>
            </button>
            <button className='grid gap-1 place-content-center h-[60px] font-heading-8 font-regular text-sm tracking-[0.1px] text-grey-600 dark:text-grey-100 bg-white dark:bg-grey-825 dark:hover:text-white hover:text-grey-900 duration-200'>
              <span className='place-content-center flex h-[51px] items-center'>Identifiers</span>
            </button>
          </nav>
          {renderMerchantDetailsSection()}
        </div>
      </PageLayout>
    </>
  )
}

export default MerchantDetailsPage
