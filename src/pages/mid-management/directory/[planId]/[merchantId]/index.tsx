import type {NextPage} from 'next'
import {useRouter} from 'next/router'
import {PageLayout, DirectoryDetailsHeader, DirectoryMerchantMids, DirectoryMerchantIdentifiers, DirectoryMidModal} from 'components'
import {mockPlanDetailsData} from 'utils/mockPlanDetailsData'
import {getSelectedDirectoryMerchant} from 'features/directoryMerchantSlice'
import {getSelectedDirectoryPlan} from 'features/directoryPlanSlice'
import {useAppSelector} from 'app/hooks'
import {selectModal} from 'features/modalSlice'
import {ModalType} from 'utils/enums'
import {useEffect} from 'react'

const MerchantDetailsPage: NextPage = () => {
  // TODO: Add Tab menu selection functionality when additional tabs are defined
  const router = useRouter()
  const selectedPlan = useAppSelector(getSelectedDirectoryPlan)
  const selectedMerchant = useAppSelector(getSelectedDirectoryMerchant)
  const modalRequested: ModalType = useAppSelector(selectModal)
  const {merchantId, planId, tab} = router.query

  enum NavigationTab {
    MIDS = 'mids',
    LOCATIONS = 'locations',
    SECONDARY_MIDS ='secondary-mids',
    IDENTIFIERS ='identifiers'
  }

  enum NavigationLabel {
    MIDS = 'MIDs',
    LOCATIONS = 'Locations',
    SECONDARY_MIDS ='Secondary MIDs',
    IDENTIFIERS ='Identifiers'
  }
  const baseUrl = `/mid-management/directory/${planId}/${merchantId}`


  useEffect(() => { // Force a redirect to mids tab if tab query string is missing or not recognised in the NavigationTab enum
    if (!Object.values(NavigationTab).find(expectedTab => tab === expectedTab)) {
      router.replace(`${baseUrl}?tab=mids`)
    }
  }, [tab, NavigationTab, baseUrl, router])


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

  const renderMerchantDetailsSection = () => { // TODO: replace with completed components
    if (tab === NavigationTab.MIDS) {
      return <DirectoryMerchantMids />
    } else if (tab === NavigationTab.LOCATIONS) {
      return <DirectoryMerchantMids/>
    } else if (tab === NavigationTab.SECONDARY_MIDS) {
      return <DirectoryMerchantMids/>
    } else if (tab === NavigationTab.IDENTIFIERS) {
      return <DirectoryMerchantIdentifiers/>
    }
  }

  const renderNavigationTabs = () => {
    const tabSelectedClasses = 'font-heading-8 h-[51px] text-grey-900 dark:text-grey-100 bg-white dark:bg-grey-825 dark:hover:text-white border-b-2 border-b-blue'
    const tabUnselectedClasses = 'font-heading-8 h-[51px] font-regular text-sm text-grey-600 dark:text-grey-400 bg-white dark:bg-grey-825 dark:hover:text-white  hover:text-grey-900 duration-200'
    const checkTabSelection = (navigationTab: string) => navigationTab === tab ? tabSelectedClasses : tabUnselectedClasses
    const handleNavigationClick = (selectedTab) => router.replace(`${baseUrl}?tab=${selectedTab}`)

    return Object.keys(NavigationTab).map(navigationKey => (
      <button key={navigationKey} className={checkTabSelection(NavigationTab[navigationKey])} onClick={() => handleNavigationClick(NavigationTab[navigationKey])}>
        <span className='place-content-center flex h-[51px] items-center'>{NavigationLabel[navigationKey]}</span>
      </button>
    ))
  }
  return (
    <>
      {modalRequested === ModalType.MID_MANAGEMENT_DIRECTORY_MID && <DirectoryMidModal />}
      <PageLayout>
        <DirectoryDetailsHeader planId={schemeId} name={name} slug={slug} iconUrl={iconUrl} locationLabel={locationLabel} isMerchant />
        <div className='rounded-[10px] mt-[15px] bg-white dark:bg-grey-825 shadow-[0_1px_6px_0px_rgba(0,0,0,0.5)]'>
          <nav className='grid grid-cols-4 w-full pl-[69px] border-b border-grey-800/10 pr-[10px]'>
            {renderNavigationTabs()}
          </nav>
          {renderMerchantDetailsSection()}
        </div>
      </PageLayout>
    </>
  )
}

export default MerchantDetailsPage
