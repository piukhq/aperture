import type {NextPage} from 'next'
import {useRouter} from 'next/router'
import {
  PageLayout,
  DirectoryDetailsHeader,
  DirectoryMerchantLocations,
  DirectoryMerchantMids,
  DirectoryMerchantSecondaryMids,
  DirectoryMerchantPsimis,
} from 'components'
import {useMidManagementPlans} from 'hooks/useMidManagementPlans'
import {useMidManagementMerchants} from 'hooks/useMidManagementMerchants'
import {useAppDispatch, useAppSelector} from 'app/hooks'
import {requestModal} from 'features/modalSlice'
import {setSelectedDirectoryMerchant, setSelectedDirectoryTableCheckedRows} from 'features/directoryMerchantSlice'
import {setModalHeader, setCommentsRef, setCommentsSubjectType, setCommentsOwnerRef} from 'features/directoryCommentsSlice'
import {ModalType, DirectoryNavigationTab, CommentsSubjectTypes} from 'utils/enums'
import {useEffect} from 'react'
import EditSvg from 'icons/svgs/project.svg'
import CommentSvg from 'icons/svgs/comment.svg'
import DeleteSvg from 'icons/svgs/trash-small.svg'
import TableSvg from 'icons/svgs/table.svg'
import {OptionsMenuItems, DirectoryPlanDetails, DirectorySingleMerchant, DirectoryMerchant} from 'types'
import {withPageAuthRequired} from '@auth0/nextjs-auth0'
import {capitaliseFirstLetter} from 'utils/stringFormat'

enum NavigationLabel {
  MIDS = 'MIDs',
  LOCATIONS = 'Locations',
  SECONDARY_MIDS ='Secondary MIDs',
  PSIMIS ='PSIMIs'
}

const MerchantDetailsPage: NextPage = withPageAuthRequired(() => {
  const router = useRouter()
  const {merchantId, planId, tab, ref} = router.query

  const {
    getPlanResponse,
  } = useMidManagementPlans({
    skipGetPlans: true,
    planRef: planId as string,
  })

  const {
    getMerchantResponse,
  } = useMidManagementMerchants({
    skipGetMerchantCounts: true,
    planRef: planId as string,
    merchantRef: merchantId as string,
  })

  const dispatch = useAppDispatch()

  const planDetails: DirectoryPlanDetails = getPlanResponse
  const selectedMerchant = useAppSelector(getSelectedDirectoryMerchant)
  const merchant: DirectorySingleMerchant | DirectoryMerchant = getMerchantResponse

  const baseUrl = `/mid-management/directory/${planId}/${merchantId}`

  useEffect(() => { // Force a redirect to mids tab if tab query string is missing or not recognised in the DirectoryNavigationTab enum
    if (!Object.values(DirectoryNavigationTab).find(expectedTab => tab === expectedTab)) {
      router.isReady && router.push(`${baseUrl}?tab=mids`)
    }
  }, [tab, baseUrl, router])

  useEffect(() => {
    ref && dispatch(requestModal(ModalType.MID_MANAGEMENT_DIRECTORY_SINGLE_VIEW))
  }, [ref, dispatch])

  const renderSelectedTabContent = () => { // TODO: Add Locations and Secondary MID content when ready
    switch(tab) {
      case DirectoryNavigationTab.MIDS:
        return <DirectoryMerchantMids/>
      case DirectoryNavigationTab.LOCATIONS:
        return <DirectoryMerchantLocations locationLabel={capitaliseFirstLetter(merchant.merchant_metadata.location_label)} />
      case DirectoryNavigationTab.PSIMIS:
        return <DirectoryMerchantPsimis/>
      case DirectoryNavigationTab.SECONDARY_MIDS:
        return <DirectoryMerchantSecondaryMids/>
    }
  }

  const renderNavigationTabs = () => {
    const tabSelectedClasses = 'font-heading-8 h-[51px] font-medium text-grey-900 dark:text-grey-100 bg-white dark:bg-grey-825 dark:hover:text-white border-b-2 border-b-blue'
    const tabUnselectedClasses = 'font-heading-8 h-[51px] font-regular text-sm text-grey-600 dark:text-grey-400 bg-white dark:bg-grey-825 dark:hover:text-white  hover:text-grey-900'
    const handleNavigationClick = (selectedTab: string) => {
      router.replace(`${baseUrl}?tab=${selectedTab}`)
      dispatch(setSelectedDirectoryTableCheckedRows([]))
    }

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

  const requestMerchantCommentsModal = () => {
    dispatch(setModalHeader(merchant.merchant_metadata.name))
    dispatch(setCommentsRef(merchantId as string))
    dispatch(setCommentsOwnerRef(planId as string))
    dispatch(setCommentsSubjectType(CommentsSubjectTypes.MERCHANT))
    dispatch(requestModal(ModalType.MID_MANAGEMENT_COMMENTS))
  }

  const requestEditMerchantModal = () => {
    const {merchant_metadata, merchant_ref} = merchant

    dispatch(setSelectedDirectoryMerchant({
      merchant_ref,
      merchant_metadata,
      merchant_counts: null,
    }))

    dispatch(requestModal(ModalType.MID_MANAGEMENT_DIRECTORY_MERCHANT))
  }


  const optionsMenuItems:OptionsMenuItems = [
    {
      label: 'Edit',
      icon: <EditSvg/>,
      clickHandler: () => requestEditMerchantModal(),
    },
    {
      label: 'Comments',
      icon: <CommentSvg/>,
      clickHandler: () => requestMerchantCommentsModal(),
    },
    {
      label: 'Upload File',
      icon: <TableSvg/>,
      clickHandler: () => dispatch(requestModal(ModalType.MID_MANAGEMENT_DIRECTORY_MERCHANT_FILE_UPLOAD)),
    },
    {
      label: 'Delete',
      icon: <DeleteSvg/>,
      isRed: true,
      clickHandler: () => requestMerchantDeleteModal(),
    },
  ]

  const renderDetailsHeader = () => {
    const {slug, plan_id: schemeId} = planDetails.plan_metadata
    const {name, icon_url: iconUrl, location_label: locationLabel} = merchant.merchant_metadata

    return (
      <DirectoryDetailsHeader planId={schemeId} name={name} slug={slug} iconUrl={iconUrl} locationLabel={locationLabel} isMerchant optionsMenuItems={optionsMenuItems} />
    )
  }

  return (
    <PageLayout>
      {merchant && (
        <>
          {planDetails && renderDetailsHeader()}
          <div className='rounded-[10px] mt-[15px] bg-white dark:bg-grey-825 shadow-md'>
            <nav className='grid grid-cols-4 w-full pl-[69px] border-b border-grey-800/10 pr-[10px]'>
              {renderNavigationTabs()}
            </nav>

            <div className='mx-[10px]'>
              {renderSelectedTabContent()}
            </div>
          </div>
        </>
      )}
    </PageLayout>
  )
})

export default MerchantDetailsPage
