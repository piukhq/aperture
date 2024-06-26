import type {NextPage} from 'next'
import {useRouter} from 'next/router'
import useGetRouterQueryString from 'hooks/useGetRouterQueryString'
import {
  PageLayout,
  DirectoryDetailsHeader,
  DirectoryMerchantLocations,
  DirectoryMerchantMids,
  DirectoryMerchantSecondaryMids,
  DirectoryMerchantPsimis,
  PageNotFound,
  HeadMetadata,
} from 'components'
import {useDirectoryPlans} from 'hooks/useDirectoryPlans'
import {useDirectoryMerchants} from 'hooks/useDirectoryMerchants'
import {useAppDispatch, useAppSelector} from 'app/hooks'
import {requestModal} from 'features/modalSlice'
import {getSelectedDirectoryMerchant, setSelectedDirectoryMerchant, setSelectedDirectoryTableCheckedRows} from 'features/directoryMerchantSlice'
import {setModalHeader, setCommentsRef, setCommentsSubjectType, setCommentsOwnerRef} from 'features/directoryCommentsSlice'
import {ModalType, DirectoryNavigationTab, CommentsSubjectTypes, UserPermissions, DirectorySingleViewEntities} from 'utils/enums'
import {useEffect} from 'react'
import EditSvg from 'icons/svgs/project.svg'
import CommentSvg from 'icons/svgs/comment.svg'
import DeleteSvg from 'icons/svgs/trash-small.svg'
import TableSvg from 'icons/svgs/table.svg'
import {OptionsMenuItems, DirectoryPlanDetails, DirectorySingleMerchant, DirectorySingleMerchantCountsPaymentScheme} from 'types'
import {withPageAuthRequired} from '@auth0/nextjs-auth0'
import {capitaliseFirstLetter} from 'utils/stringFormat'

enum NavigationLabel {
  MIDS = 'MIDs',
  LOCATIONS = 'Locations',
  SECONDARY_MIDS = 'Secondary MIDs',
  PSIMIS = 'PSIMIs'
}

const MerchantDetailsPage: NextPage = withPageAuthRequired(() => {
  const router = useRouter()
  const {merchantId, planId, tab, ref} = useGetRouterQueryString()

  const {
    getPlanResponse,
  } = useDirectoryPlans({
    skipGetPlans: true,
    planRef: planId,
  })

  const {
    getMerchantResponse,
    getMerchantError,
  } = useDirectoryMerchants({
    skipGetMerchantCounts: true,
    planRef: planId,
    merchantRef: merchantId,
  })

  const dispatch = useAppDispatch()

  const planDetails: DirectoryPlanDetails | null = getPlanResponse || null
  const selectedMerchant = useAppSelector(getSelectedDirectoryMerchant)
  const merchant: DirectorySingleMerchant | null = getMerchantResponse || null

  const baseUrl = `/mid-management/directory/${planId}/${merchantId}`

  useEffect(() => { // Force a redirect to mids tab if tab query string is missing or not recognised in the DirectoryNavigationTab enum
    if (!Object.values(DirectoryNavigationTab).find(expectedTab => tab === expectedTab)) {
      router.isReady && router.push(`${baseUrl}?tab=mids`)
    }
  }, [tab, baseUrl, router])

  useEffect(() => {
    ref && dispatch(requestModal(ModalType.MID_MANAGEMENT_DIRECTORY_SINGLE_VIEW))
  }, [ref, dispatch])

  useEffect(() => { // set the selected merchant in the store if there is no previously selected merchant counts available (AKA a empty merchant in the store)
    !selectedMerchant?.merchant_counts && getMerchantResponse && merchant && dispatch(setSelectedDirectoryMerchant(merchant)
    ), [merchant, dispatch, getMerchantResponse]
  })

  const renderSelectedTabContent = () => { // TODO: Add Locations and Secondary MID content when ready
    switch (tab) {
      case DirectoryNavigationTab.MIDS:
        return <DirectoryMerchantMids />
      case DirectoryNavigationTab.LOCATIONS:
        return <DirectoryMerchantLocations locationLabel={capitaliseFirstLetter(merchant?.merchant_metadata.location_label ?? '')} />
      case DirectoryNavigationTab.PSIMIS:
        return <DirectoryMerchantPsimis />
      case DirectoryNavigationTab.SECONDARY_MIDS:
        return <DirectoryMerchantSecondaryMids />
    }
  }

  const renderNavigationTabs = () => {
    const tabSelectedClasses = 'font-heading-8 h-[51px] font-medium text-grey-900 dark:text-grey-100 bg-white dark:bg-grey-825 dark:hover:text-white border-b-2 border-b-blue'
    const tabUnselectedClasses = 'font-heading-8 h-[51px] font-regular text-sm text-grey-600 dark:text-grey-400 bg-white dark:bg-grey-825 dark:hover:text-white hover:text-grey-900'
    const handleNavigationClick = (selectedTab: string) => {
      router.replace(`${baseUrl}?tab=${selectedTab}`)
      dispatch(setSelectedDirectoryTableCheckedRows([]))
    }


    const renderCount = (navigationKey: string) => {
      if (!merchant) {
        return <span></span>
      }
      const {total_locations: totalLocations, payment_schemes: paymentSchemes} = merchant.merchant_counts // Can only be called if merchant is not null
      const getCount = (tab: string) => paymentSchemes.reduce((acc: number, paymentScheme: DirectorySingleMerchantCountsPaymentScheme) => {
        return acc + paymentScheme[tab]
      }, 0)

      return <span className={`${DirectoryNavigationTab[navigationKey] === tab ? 'font-heading-8 h-[51px] font-medium text-grey-900 dark:text-grey-100 bg-white dark:bg-grey-825 dark:hover:text-white' : tabUnselectedClasses} h-full border-0`}>
        ({navigationKey === 'LOCATIONS' ? totalLocations : getCount(navigationKey.toLocaleLowerCase())})
      </span>
    }


    return Object.keys(DirectoryNavigationTab).map(navigationKey => (
      <button
        key={navigationKey}
        className={DirectoryNavigationTab[navigationKey] === tab ? tabSelectedClasses : tabUnselectedClasses}
        onClick={() => handleNavigationClick(DirectoryNavigationTab[navigationKey])}
      >
        <span className='flex justify-center items-center'>{NavigationLabel[navigationKey]} {merchant && renderCount(navigationKey)}</span>
      </button>
    ))
  }

  const requestMerchantCommentsModal = () => {
    merchant && dispatch(setModalHeader(merchant.merchant_metadata.name))
    merchantId && dispatch(setCommentsRef(merchantId))
    planId && dispatch(setCommentsOwnerRef(planId))
    dispatch(setCommentsSubjectType(CommentsSubjectTypes.MERCHANT))
    dispatch(requestModal(ModalType.MID_MANAGEMENT_COMMENTS))
  }

  const requestMerchantDeleteModal = () => {
    if (!selectedMerchant || !merchant) { return }
    // Only set the selectedDirectoryMerchant if there is no previously selected merchant counts available
    !selectedMerchant.merchant_ref && dispatch(setSelectedDirectoryMerchant({
      merchant_ref: merchantId || '',
      merchant_metadata: merchant.merchant_metadata,
      merchant_counts: {
        locations: 0,
        payment_schemes: [],
      },
    }))
    dispatch(requestModal(ModalType.MID_MANAGEMENT_DIRECTORY_MERCHANT_DELETE))
  }

  const requestEditMerchantModal = () => {
    if (!merchant) { return }
    const {merchant_metadata, merchant_ref} = merchant
    dispatch(setSelectedDirectoryMerchant({
      merchant_ref,
      merchant_metadata,
      merchant_counts: {
        locations: 0,
        payment_schemes: [],
      },
    }))

    dispatch(requestModal(ModalType.MID_MANAGEMENT_DIRECTORY_MERCHANT))
  }

  const optionsMenuItems: OptionsMenuItems = [
    {
      label: 'Edit',
      icon: <EditSvg />,
      requiredPermission: UserPermissions.MERCHANT_DATA_READ_WRITE,
      clickHandler: () => requestEditMerchantModal(),
    },
    {
      label: 'View Comments',
      icon: <CommentSvg />,
      clickHandler: () => requestMerchantCommentsModal(),
    },
    {
      label: 'Upload File',
      icon: <TableSvg />,
      requiredPermission: UserPermissions.MERCHANT_DATA_READ_WRITE,
      clickHandler: () => dispatch(requestModal(ModalType.MID_MANAGEMENT_DIRECTORY_MERCHANT_FILE_UPLOAD)),
    },
    {
      label: 'Delete',
      icon: <DeleteSvg />,
      isRed: true,
      requiredPermission: UserPermissions.MERCHANT_DATA_READ_WRITE_DELETE,
      clickHandler: () => requestMerchantDeleteModal(),
    },
  ]

  const renderDetailsHeader = () => {
    if (planDetails === null || merchant === null) { return <> </> }
    const {slug, plan_id: schemeId} = planDetails.plan_metadata
    const {name, icon_url: iconUrl, location_label: locationLabel} = merchant.merchant_metadata
    return (
      <DirectoryDetailsHeader planId={schemeId || null} name={name} slug={slug} iconUrl={iconUrl} locationLabel={locationLabel} isMerchant optionsMenuItems={optionsMenuItems} />
    )
  }


  if (getMerchantError) { // TODO: Add more in depth error handling
    return <PageNotFound />
  }

  return (
    <>
      <HeadMetadata pageTitle={`MID Directory: ${merchant?.merchant_metadata?.name} ${DirectorySingleViewEntities[tab || '']}s`} pageDescription={`View the ${DirectorySingleViewEntities[tab || '']}s for the merchant in the plan`} />
      <PageLayout>
        {merchant && (
          <>
            {planDetails && renderDetailsHeader()}
            <div className='rounded-[10px] mt-[15px] bg-white dark:bg-grey-825 shadow-md'>
              <nav className='grid grid-cols-4 w-full pl-[69px] border-b border-grey-800/10 pr-[10px] sticky top-48 bg-white dark:bg-grey-825 z-30'>
                {renderNavigationTabs()}
              </nav>
              <div className='mx-[10px]'>
                {renderSelectedTabContent()}
              </div>
            </div>
          </>
        )}
      </PageLayout>
    </>
  )
})

export default MerchantDetailsPage
