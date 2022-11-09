import {useCallback, useEffect, useMemo} from 'react'
import type {NextPage} from 'next'
import {useRouter} from 'next/router'
import {useAppDispatch} from 'app/hooks'
import {PageLayout, DirectoryTile, DirectoryDetailsHeader} from 'components'
import {requestModal} from 'features/modalSlice'
import {CommentsSubjectTypes, ModalType} from 'utils/enums'
import {useMidManagementPlans} from 'hooks/useMidManagementPlans'
import {DirectoryPlanDetails, OptionsMenuItems, DirectoryMerchantDetails} from 'types'
import {setSelectedDirectoryMerchant, reset} from 'features/directoryMerchantSlice'
import {setSelectedDirectoryPlan} from 'features/directoryPlanSlice'
import {setModalHeader, setCommentsRef, setCommentsSubjectType, setCommentsOwnerRef} from 'features/directoryCommentsSlice'
import EditSvg from 'icons/svgs/project.svg'
import OffboardSvg from 'icons/svgs/close-square.svg'
import CommentSvg from 'icons/svgs/comment.svg'
import DeleteSvg from 'icons/svgs/trash-small.svg'
import {withPageAuthRequired} from '@auth0/nextjs-auth0'

const PlanDetailsPage: NextPage = withPageAuthRequired(() => {
  const router = useRouter()
  const {planId: planRef} = router.query

  const {
    getPlanResponse,
  } = useMidManagementPlans({
    skipGetPlans: true,
    planRef: planRef as string,
  })

  const planDetails: DirectoryPlanDetails = getPlanResponse
  const {merchants, plan_metadata: planMetadata} = planDetails || {}
  const {name, icon_url, plan_id, slug} = planMetadata || {}


  const dispatch = useAppDispatch()

  useEffect(() => { // Clear any previously selected merchant
    dispatch(reset())
  }, [dispatch])

  const handleRequestNewMerchantModal = useCallback(() => { dispatch(requestModal(ModalType.MID_MANAGEMENT_DIRECTORY_MERCHANT)) }, [dispatch])

  const requestPlanCommentsModal = useCallback(() => {
    dispatch(setModalHeader(planDetails?.plan_metadata?.name))
    dispatch(setCommentsRef(planRef as string))
    dispatch(setCommentsOwnerRef(planRef as string))
    dispatch(setCommentsSubjectType(CommentsSubjectTypes.PLAN))
    dispatch(requestModal(ModalType.MID_MANAGEMENT_COMMENTS))
  }, [dispatch, planDetails?.plan_metadata?.name, planRef])

  const requestPlanDeleteModal = useCallback(() => {
    dispatch(setSelectedDirectoryPlan({
      plan_ref: planRef as string,
      plan_metadata: {
        name,
        icon_url,
        plan_id,
        slug,
      },
      plan_counts: {
        merchants: merchants.length,
        locations: merchants.reduce((acc, merchant) => acc + merchant.merchant.merchant_counts.locations, 0),
        payment_schemes: null, // Not required currently for delete modal so is not calculated
      },
      total_mid_count: merchants
        .reduce((acc, merchant) => acc + merchant.merchant.merchant_counts.payment_schemes
          .reduce((acc, paymentScheme) => acc + paymentScheme.count, 0), 0),
    }))

    dispatch(requestModal(ModalType.MID_MANAGEMENT_DIRECTORY_PLAN_DELETE))
  }, [dispatch, icon_url, merchants, name, planRef, plan_id, slug])
  const headerOptionsMenuItems:OptionsMenuItems = useMemo(() => [
    {
      label: 'Edit',
      icon: <EditSvg/>,
      clickHandler: () => console.log('Launch Edit Modal Placeholder'),
    },
    {
      label: 'Offboard from Harmonia',
      icon: <OffboardSvg/>,
      clickHandler: () => console.log('Launch Offboard Modal Placeholder'),
    },
    {
      label: 'Comments',
      icon: <CommentSvg/>,
      clickHandler: () => requestPlanCommentsModal(),
    },
    {
      label: 'Delete',
      icon: <DeleteSvg/>,
      isRed: true,
      clickHandler: () => requestPlanDeleteModal(),
    },
  ], [requestPlanCommentsModal, requestPlanDeleteModal])

  const renderMerchants = (merchants: Array<DirectoryMerchantDetails>) => {
    return (
      <div className='flex mt-[30px] flex-wrap gap-[31px]'>
        {merchants.map((merchant) => {
          const {merchant_metadata, merchant_counts, merchant_ref} = merchant.merchant

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
            router.push(`${router?.asPath}/${merchant_ref}?tab=mids`)
          }

          const requestMerchantCommentsModal = () => {
            dispatch(setModalHeader(merchant_metadata.name))
            dispatch(setCommentsRef(merchant_ref))
            dispatch(setCommentsOwnerRef(planRef as string))
            dispatch(setCommentsSubjectType(CommentsSubjectTypes.MERCHANT))
            dispatch(requestModal(ModalType.MID_MANAGEMENT_COMMENTS))
          }

          const tileOptionsMenuItems:OptionsMenuItems = [
            {
              label: 'Edit',
              icon: <EditSvg/>,
              clickHandler: () => requestMerchantModal(ModalType.MID_MANAGEMENT_DIRECTORY_MERCHANT),
            },
            {
              label: 'Comments',
              icon: <CommentSvg/>,
              clickHandler: () => requestMerchantCommentsModal(),
            },
            {
              label: 'Delete',
              icon: <DeleteSvg/>,
              isRed: true,
              clickHandler: () => requestMerchantModal(ModalType.MID_MANAGEMENT_DIRECTORY_MERCHANT_DELETE),
            },
          ]

          return <DirectoryTile key={merchant_ref} metadata={merchant_metadata} counts={merchant_counts} optionsMenuItems={tileOptionsMenuItems} viewClickFn={handleViewClick} />
        })}
      </div>
    )
  }

  const renderPlanDetailsContent = () => {
    const {plan_metadata: planMetadata, merchants} = planDetails
    const {name, slug, icon_url: iconUrl, plan_id: planId} = planMetadata

    return (
      <>
        <DirectoryDetailsHeader planId={planId} name={name} slug={slug} iconUrl={iconUrl} newItemButtonHandler={handleRequestNewMerchantModal} optionsMenuItems={headerOptionsMenuItems}/>
        {merchants.length > 0 && renderMerchants(merchants)}
      </>
    )
  }

  return (
    <PageLayout>
      {planDetails && renderPlanDetailsContent()}
    </PageLayout>
  )
})

export default PlanDetailsPage
