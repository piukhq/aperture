import type {NextPage} from 'next'
import {useRouter} from 'next/router'
import {
  PageLayout,
  DirectoryDetailsHeader,
  DirectoryMerchantLocations,
  DirectoryMerchantMids,
  DirectoryMerchantSecondaryMids,
  DirectoryMerchantIdentifiers,
  DirectoryMidModal,
} from 'components'
import {mockPlanDetailsData} from 'utils/mockPlanDetailsData'
import {getSelectedDirectoryMerchant} from 'features/directoryMerchantSlice'
import {getSelectedDirectoryPlan} from 'features/directoryPlanSlice'
import {useAppSelector, useAppDispatch} from 'app/hooks'
import {requestModal, selectModal} from 'features/modalSlice'
import {ModalType, DirectoryNavigationTab} from 'utils/enums'
import {useEffect} from 'react'
import DirectorySingleViewModal from 'components/DirectorySingleViewModal'
import EditSvg from 'icons/svgs/project.svg'
import DeleteSvg from 'icons/svgs/trash-small.svg'
import {OptionsMenuItems} from 'types'

const MerchantDetailsPage: NextPage = () => {
  const router = useRouter()
  const dispatch = useAppDispatch()
  const selectedPlan = useAppSelector(getSelectedDirectoryPlan)
  const selectedMerchant = useAppSelector(getSelectedDirectoryMerchant)
  const modalRequested: ModalType = useAppSelector(selectModal)
  const {merchantId, planId, tab, ref} = router.query


  enum NavigationLabel {
    MIDS = 'MIDs',
    LOCATIONS = 'Locations',
    SECONDARY_MIDS ='Secondary MIDs',
    IDENTIFIERS ='Identifiers'
  }
  const baseUrl = `/mid-management/directory/${planId}/${merchantId}`

  useEffect(() => { // Force a redirect to mids tab if tab query string is missing or not recognised in the DirectoryNavigationTab enum
    if (!Object.values(DirectoryNavigationTab).find(expectedTab => tab === expectedTab)) {
      router.isReady && router.push(`${baseUrl}?tab=mids`)
    }
  }, [tab, baseUrl, router])

  useEffect(() => {
    ref && dispatch(requestModal(ModalType.MID_MANAGEMENT_DIRECTORY_SINGLE_VIEW))
  }, [ref, dispatch])

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

  const renderSelectedTabContent = () => { // TODO: Add Locations and Secondary MID content when ready
    switch(tab) {
      case DirectoryNavigationTab.MIDS:
        return <DirectoryMerchantMids/>
      case DirectoryNavigationTab.LOCATIONS:
        return <DirectoryMerchantLocations />
      case DirectoryNavigationTab.IDENTIFIERS:
        return <DirectoryMerchantIdentifiers/>
      case DirectoryNavigationTab.SECONDARY_MIDS:
        return <DirectoryMerchantSecondaryMids/>
    }
  }

  const renderNavigationTabs = () => {
    const tabSelectedClasses = 'font-heading-8 h-[51px] font-medium text-grey-900 dark:text-grey-100 bg-white dark:bg-grey-825 dark:hover:text-white border-b-2 border-b-blue'
    const tabUnselectedClasses = 'font-heading-8 h-[51px] font-regular text-sm text-grey-600 dark:text-grey-400 bg-white dark:bg-grey-825 dark:hover:text-white  hover:text-grey-900'
    const handleNavigationClick = (selectedTab: string) => router.replace(`${baseUrl}?tab=${selectedTab}`)

    return Object.keys(DirectoryNavigationTab).map(navigationKey => (
      <button
        key={navigationKey}
        className={DirectoryNavigationTab[navigationKey] === tab ? tabSelectedClasses : tabUnselectedClasses}
        onClick={() => handleNavigationClick(DirectoryNavigationTab[navigationKey])}
      >
        <span className='place-content-center flex h-[51px] items-center'>{NavigationLabel[navigationKey]}</span>
      </button>
    ))
  }

  const optionsMenuItems:OptionsMenuItems = [
    {
      label: 'Edit',
      icon: <EditSvg/>,
      clickHandler: () => console.log('Launch Edit Modal Placeholder'),
    },
    {
      label: 'Delete',
      icon: <DeleteSvg/>,
      isRed: true,
      clickHandler: () => console.log('Launch Delete Modal Placeholder'),
    },
  ]

  return (
    <>
      {modalRequested === ModalType.MID_MANAGEMENT_DIRECTORY_MID && <DirectoryMidModal />}
      {modalRequested === ModalType.MID_MANAGEMENT_DIRECTORY_SINGLE_VIEW && ref && <DirectorySingleViewModal />}
      <PageLayout>
        <DirectoryDetailsHeader planId={schemeId} name={name} slug={slug} iconUrl={iconUrl} locationLabel={locationLabel} isMerchant optionsMenuItems={optionsMenuItems} />
        <div className='rounded-[10px] mt-[15px] bg-white dark:bg-grey-825 shadow-md'>
          <nav className='grid grid-cols-4 w-full pl-[69px] border-b border-grey-800/10 pr-[10px]'>
            {renderNavigationTabs()}
          </nav>

          <div className='mx-[10px]'>
            {renderSelectedTabContent()}
          </div>
        </div>
      </PageLayout>
    </>
  )
}

export default MerchantDetailsPage
