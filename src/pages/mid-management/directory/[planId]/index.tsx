import {useCallback, useEffect, useMemo} from 'react'
import type {NextPage} from 'next'
import {useRouter} from 'next/router'
import useGetRouterQueryString from 'hooks/useGetRouterQueryString'
import {useAppDispatch} from 'app/hooks'
import {PageLayout, DirectoryTile, DirectoryDetailsHeader, PageNotFound, HeadMetadata} from 'components'
import {requestModal} from 'features/modalSlice'
import {CommentsSubjectTypes, ModalType, UserPermissions} from 'utils/enums'
import {useIsMobileViewportDimensions} from 'utils/windowDimensions'
import {usePrefetch as useMerchantPrefetch} from 'services/DirectoryMerchants'
import {usePrefetch as useMidsPrefetch} from 'services/DirectoryMerchantMids'
import {useDirectoryPlans} from 'hooks/useDirectoryPlans'
import {DirectoryPlanDetails, OptionsMenuItems, DirectoryMerchant} from 'types'
import {setSelectedDirectoryMerchant, reset} from 'features/directoryMerchantSlice'
import {setSelectedDirectoryPlan} from 'features/directoryPlanSlice'
import {setModalHeader, setCommentsRef, setCommentsSubjectType, setCommentsOwnerRef} from 'features/directoryCommentsSlice'
import EditSvg from 'icons/svgs/project.svg'
import OffboardSvg from 'icons/svgs/close-square.svg'
import CommentSvg from 'icons/svgs/comment.svg'
import DeleteSvg from 'icons/svgs/trash-small.svg'
import TableSvg from 'icons/svgs/table.svg'
import {withPageAuthRequired} from '@auth0/nextjs-auth0'
import {getMerchantMidCountFromPaymentSchemes} from 'utils/paymentSchemes'


const PlanDetailsPage: NextPage = withPageAuthRequired(() => {
  const router = useRouter()
  const planRef = useGetRouterQueryString().planId || ''
  const isMobileViewport = useIsMobileViewportDimensions()

  const prefetchMerchant = useMerchantPrefetch('getMerchant')
  const prefetchMids = useMidsPrefetch('getMerchantMids')

  const {
    getPlanResponse,
    getPlanError,
  } = useDirectoryPlans({
    skipGetPlans: true,
    planRef: planRef,
  })

  const planDetails: DirectoryPlanDetails | null = getPlanResponse || null
  const {merchants = [], plan_metadata: planMetadata = {
    name: '',
    icon_url: '',
    plan_id: 0,
    slug: '',
  }} = planDetails || {}
  const {name, icon_url, plan_id, slug} = planMetadata

  const dispatch = useAppDispatch()

  useEffect(() => { // Clear any previously selected merchant
    dispatch(reset())
  }, [dispatch])

  const handleRequestNewMerchantModal = useCallback(() => {
    dispatch(reset())
    dispatch(requestModal(ModalType.MID_MANAGEMENT_DIRECTORY_MERCHANT))
  }, [dispatch])

  const requestPlanCommentsModal = useCallback(() => {
    dispatch(setModalHeader(planDetails?.plan_metadata?.name || ''))
    dispatch(setCommentsRef(planRef))
    dispatch(setCommentsOwnerRef(planRef))
    dispatch(setCommentsSubjectType(CommentsSubjectTypes.PLAN))
    dispatch(requestModal(ModalType.MID_MANAGEMENT_COMMENTS))
  }, [dispatch, planDetails?.plan_metadata?.name, planRef])

  const requestDeletePlanModal = useCallback(() => {
    dispatch(setSelectedDirectoryPlan({
      plan_ref: planRef,
      plan_metadata: {
        name,
        icon_url,
        plan_id,
        slug,
      },
      plan_counts: {
        merchants: merchants.length,
        locations: merchants.reduce((acc, merchant) => acc + merchant.merchant_counts.locations, 0),
        payment_schemes: [], // Not required for delete modal so is not calculated
      },
      total_mid_count: merchants
        .reduce((acc, merchant) => acc + getMerchantMidCountFromPaymentSchemes(merchant.merchant_counts.payment_schemes), 0),
    }))
    dispatch(requestModal(ModalType.MID_MANAGEMENT_DIRECTORY_PLAN_DELETE))
  }, [dispatch, icon_url, merchants, name, planRef, plan_id, slug])

  const requestEditPlanModal = useCallback(() => {
    dispatch(setSelectedDirectoryPlan({
      plan_ref: planRef,
      plan_metadata: planMetadata,
      total_mid_count: null,
    }))

    dispatch(requestModal(ModalType.MID_MANAGEMENT_DIRECTORY_PLAN))
  }, [dispatch, planRef, planMetadata])

  const headerOptionsMenuItems:OptionsMenuItems = useMemo(() => [
    {
      label: 'Edit',
      icon: <EditSvg/>,
      requiredPermission: UserPermissions.MERCHANT_DATA_READ_WRITE,
      clickHandler: () => requestEditPlanModal(),
    },
    {
      label: 'Offboard from Harmonia',
      icon: <OffboardSvg/>,
      requiredPermission: UserPermissions.MERCHANT_DATA_READ_WRITE,
      clickHandler: () => console.log('Launch Offboard Modal Placeholder'),
    },
    {
      label: 'Comments',
      icon: <CommentSvg/>,
      clickHandler: () => requestPlanCommentsModal(),
    },
    {
      label: 'Upload File',
      icon: <TableSvg/>,
      requiredPermission: UserPermissions.MERCHANT_DATA_READ_WRITE,
      clickHandler: () => dispatch(requestModal(ModalType.MID_MANAGEMENT_DIRECTORY_PLAN_FILE_UPLOAD)),
    },
    {
      label: 'Delete',
      icon: <DeleteSvg/>,
      isRed: true,
      requiredPermission: UserPermissions.MERCHANT_DATA_READ_WRITE_DELETE,
      clickHandler: () => requestDeletePlanModal(),
    },
  ], [requestEditPlanModal, requestPlanCommentsModal, dispatch, requestDeletePlanModal])

  const renderMerchants = (merchants: Array<DirectoryMerchant>) => {
    return (
      <div className={`flex mt-[30px] flex-wrap gap-[31px] ${isMobileViewport ? 'justify-center' : 'justify-start'}`}>
        {merchants.map((merchant) => {
          const {merchant_metadata, merchant_counts, merchant_ref} = merchant

          const setSelectedMerchant = () => {
            dispatch(setSelectedDirectoryMerchant({
              merchant_ref,
              merchant_metadata,
              merchant_counts,
            }))
          }

          const requestMerchantModal = (modalName:ModalType) => {
            setSelectedMerchant()
            dispatch(requestModal(modalName))
          }

          const handleViewClick = () => {
            setSelectedMerchant()
            prefetchMerchant({planRef, merchantRef: merchant_ref})
            prefetchMids({planRef, merchantRef: merchant_ref})
            router.push(`${router?.asPath}/${merchant_ref}?tab=mids`)
          }

          const requestMerchantCommentsModal = () => {
            dispatch(setModalHeader(merchant_metadata.name))
            dispatch(setCommentsRef(merchant_ref))
            dispatch(setCommentsOwnerRef(planRef))
            dispatch(setCommentsSubjectType(CommentsSubjectTypes.MERCHANT))
            dispatch(requestModal(ModalType.MID_MANAGEMENT_COMMENTS))
          }

          const tileOptionsMenuItems:OptionsMenuItems = [
            {
              label: 'Edit',
              icon: <EditSvg/>,
              requiredPermission: UserPermissions.MERCHANT_DATA_READ_WRITE,
              clickHandler: () => requestMerchantModal(ModalType.MID_MANAGEMENT_DIRECTORY_MERCHANT),
            },
            {
              label: 'Comments',
              icon: <CommentSvg/>,
              clickHandler: () => requestMerchantCommentsModal(),
            },
            {
              label: 'Upload File',
              icon: <TableSvg/>,
              requiredPermission: UserPermissions.MERCHANT_DATA_READ_WRITE,
              clickHandler: () => dispatch(requestModal(ModalType.MID_MANAGEMENT_DIRECTORY_MERCHANT_FILE_UPLOAD)),
            },
            {
              label: 'Delete',
              icon: <DeleteSvg/>,
              isRed: true,
              requiredPermission: UserPermissions.MERCHANT_DATA_READ_WRITE_DELETE,
              clickHandler: () => requestMerchantModal(ModalType.MID_MANAGEMENT_DIRECTORY_MERCHANT_DELETE),
            },
          ]

          return <DirectoryTile key={merchant_ref} metadata={merchant_metadata} counts={merchant_counts} optionsMenuItems={tileOptionsMenuItems} viewClickFn={handleViewClick} />
        })}
      </div>
    )
  }

  const renderPlanDetailsContent = () => {
    if (!planDetails) {
      return <></>
    }
    const {plan_metadata: planMetadata, merchants = []} = planDetails
    const {name, slug, icon_url: iconUrl, plan_id: planId = 0} = planMetadata

    return (
      <>
        <HeadMetadata pageTitle={`MID Directory: ${name}`} pageDescription={`View the ${merchants.length} merchants for the ${name} plan`} />
        <DirectoryDetailsHeader planId={planId || 0} name={name} slug={slug} iconUrl={iconUrl} newItemButtonHandler={handleRequestNewMerchantModal} optionsMenuItems={headerOptionsMenuItems}/>
        {merchants.length > 0 && renderMerchants(merchants)}
      </>
    )
  }

  if (getPlanError) { // TODO: Add more in depth error handling
    return <PageNotFound />
  }

  return (
    <PageLayout>
      {planDetails && renderPlanDetailsContent()}
    </PageLayout>
  )
})

export default PlanDetailsPage
