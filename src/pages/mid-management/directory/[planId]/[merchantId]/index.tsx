import {useState} from 'react'
import type {NextPage} from 'next'
import {useRouter} from 'next/router'
import {PageLayout, DirectoryDetailsHeader, DirectoryMerchantMids, DirectoryMidModal} from 'components'
import {mockPlanDetailsData} from 'utils/mockPlanDetailsData'
import {getSelectedDirectoryMerchant} from 'features/directoryMerchantSlice'
import {getSelectedDirectoryPlan} from 'features/directoryPlanSlice'
import {useAppSelector} from 'app/hooks'
import {selectModal} from 'features/modalSlice'
import {ModalType} from 'utils/enums'

const MerchantDetailsPage: NextPage = () => {
  // TODO: Add Tab menu selection functionality when additional tabs are defined
  const router = useRouter()
  const selectedPlan = useAppSelector(getSelectedDirectoryPlan)
  const selectedMerchant = useAppSelector(getSelectedDirectoryMerchant)
  const modalRequested: ModalType = useAppSelector(selectModal)
  const {merchantId, planId, tab} = router.query

  enum TabMenu {
    MIDS = 'mids',
    SECONDARY_MIDS ='secondary-mids',
    LOCATIONS = 'locations',
    IDENTIFIERS ='identifiers'
  }

  const getPlanDetails = () => {
    return mockPlanDetailsData
  }
  const getMerchant = () => { // TODO: Placeholder logic to be replaced by API calls, probably will become utils.
    const merchant = mockPlanDetailsData.merchants.find(merchant => merchant.merchant.merchant_ref === merchantId)
    return merchant ? merchant : mockPlanDetailsData.merchants[0]
  }
  // If plan and merchant is known due to previous API calls use it, else hit the API to get them. To be refactored with API calls
  const planDetails = selectedPlan.plan_ref ? selectedPlan : getPlanDetails()
  const merchant = selectedMerchant.merchant_ref ? selectedMerchant : getMerchant().merchant
  const {slug, plan_id: schemeId} = planDetails.plan_metadata
  const {name, icon_url: iconUrl, location_label: locationLabel} = merchant.merchant_metadata


  const handleNavigationClick = (selectedTab) => {
    router.replace(`/mid-management/directory/${planId}/${merchantId}?tab=${selectedTab}`)
  }

  const renderMerchantDetailsSection = () => {
    if (tab === TabMenu.MIDS) {
      return <DirectoryMerchantMids />
    } else if (tab === TabMenu.LOCATIONS) {
      return null // TODO: Swap out with future locations component
    } else if (tab === TabMenu.SECONDARY_MIDS) {
      return null // TODO: Swap out with future secondary mids component
    } else if (tab === TabMenu.IDENTIFIERS) {
      return <DirectoryMerchantMids/>
    }
  }

  const tabSelectedClasses = 'font-heading-8 text-grey-900 dark:text-grey-100 bg-white dark:bg-grey-825 dark:hover:text-white border-b-2 border-b-blue'
  const tabUnselectedClasses = 'font-heading-8 font-regular text-sm text-grey-600 dark:text-grey-400 bg-white dark:bg-grey-825 dark:hover:text-white  hover:text-grey-900 duration-200'

  const checkTabSelection = (navigationTab: string) => navigationTab === tab ? tabSelectedClasses : tabUnselectedClasses

  return (
    <>
      {modalRequested === ModalType.MID_MANAGEMENT_DIRECTORY_MID && <DirectoryMidModal />}
      <PageLayout>
        <DirectoryDetailsHeader planId={schemeId} name={name} slug={slug} iconUrl={iconUrl} locationLabel={locationLabel} isMerchant />
        <div className='rounded-[10px] mt-[15px] bg-white dark:bg-grey-825 shadow-[0_1px_6px_0px_rgba(0,0,0,0.5)]'>
          <nav className='grid grid-cols-4 w-full pl-[69px] border-b border-grey-800/10 pr-[10px]'>
            <button className={checkTabSelection(TabMenu.MIDS)} onClick={() => handleNavigationClick(TabMenu.MIDS)}>
              <span className='place-content-center flex h-[51px] items-center'>MIDs</span>
            </button>
            <button className={checkTabSelection(TabMenu.SECONDARY_MIDS)} onClick={() => handleNavigationClick(TabMenu.SECONDARY_MIDS)}>
              <span className='place-content-center flex h-[51px] items-center '>Secondary MIDs</span>
            </button>
            <button className={checkTabSelection(TabMenu.LOCATIONS)} onClick={() => handleNavigationClick(TabMenu.LOCATIONS)}>
              <span className='place-content-center flex h-[51px] items-center'>Locations</span>
            </button>
            <button className={checkTabSelection(TabMenu.IDENTIFIERS)} onClick={() => handleNavigationClick(TabMenu.IDENTIFIERS)}>
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
