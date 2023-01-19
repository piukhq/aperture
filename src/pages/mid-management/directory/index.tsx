import {useCallback, useEffect, useState} from 'react'
import type {NextPage} from 'next'
import {Button, DirectoryTile, PageLayout} from 'components'
import {useRouter} from 'next/router'
import PlusSvg from 'icons/svgs/plus.svg'
import {ButtonWidth, ButtonSize, ButtonBackground, LabelColour, LabelWeight} from 'components/Button/styles'
import {DirectoryPlan, OptionsMenuItems} from 'types'
import {useMidManagementPlans} from 'hooks/useMidManagementPlans'
import {useAppDispatch} from 'app/hooks'
import {setModalHeader, setCommentsRef, setCommentsSubjectType, setCommentsOwnerRef} from 'features/directoryCommentsSlice'
import {requestModal} from 'features/modalSlice'
import {setSelectedDirectoryPlan, reset} from 'features/directoryPlanSlice'
import {getMidCountFromPaymentSchemes} from 'utils/paymentSchemes'
import {CommentsSubjectTypes, ModalType, UserPermissions} from 'utils/enums'

import AddSvg from 'icons/svgs/plus-filled.svg'
import EditSvg from 'icons/svgs/project.svg'
import OffboardSvg from 'icons/svgs/close-square.svg'
import CommentSvg from 'icons/svgs/comment.svg'
import DeleteSvg from 'icons/svgs/trash-small.svg'
import TableSvg from 'icons/svgs/table.svg'
import {withPageAuthRequired} from '@auth0/nextjs-auth0'

const DirectoryPage: NextPage = withPageAuthRequired(() => {
  const [planRefForSingleMerchant, setPlanRefForSingleMerchant] = useState(null)
  const {getPlansResponse, getPlanResponse} = useMidManagementPlans({skipGetPlan: !planRefForSingleMerchant, planRef: planRefForSingleMerchant})


  const planList: DirectoryPlan[] = getPlansResponse

  const dispatch = useAppDispatch()
  const router = useRouter()

  useEffect(() => { // Clear any previously selected plan
    dispatch(reset())
  }, [dispatch])

  useEffect(() => { // Use single plan data to redirect accordingly for 1 merchant plans
    getPlanResponse && router.push(`${router?.asPath}/${planRefForSingleMerchant}/${getPlanResponse.merchants[0].merchant_ref}`)
  }, [getPlanResponse, planRefForSingleMerchant, router])

  const handleRequestNewPlanModal = useCallback(() => {
    dispatch(requestModal(ModalType.MID_MANAGEMENT_DIRECTORY_PLAN))
  }, [dispatch])

  const renderDirectoryPlans = () => {
    return planList.map((plan, index) => {
      const {plan_metadata, plan_counts, plan_ref} = plan
      const {name, icon_url, plan_id, slug} = plan_metadata
      const {merchants, locations, payment_schemes} = plan_counts

      const setSelectedPlan = () => {
        dispatch(setSelectedDirectoryPlan({
          plan_ref: plan_ref,
          plan_metadata: {
            name,
            icon_url,
            plan_id,
            slug,
          },
          plan_counts: {
            merchants,
            locations,
            payment_schemes,
          },
          total_mid_count: getMidCountFromPaymentSchemes(payment_schemes),
        }))
      }
      const requestPlanModal = (modalName:ModalType) => {
        setSelectedPlan()
        dispatch(requestModal(modalName))
      }

      const requestPlanCommentsModal = () => {
        dispatch(setModalHeader(name))
        dispatch(setCommentsRef(plan_ref))
        dispatch(setCommentsOwnerRef(plan_ref))
        dispatch(setCommentsSubjectType(CommentsSubjectTypes.PLAN))
        dispatch(requestModal(ModalType.MID_MANAGEMENT_COMMENTS))
      }

      const handleViewClick = () => {
        setSelectedPlan()
        merchants === 1 ? setPlanRefForSingleMerchant(plan_ref) : router.push(`${router?.asPath}/${plan_ref}`) // If only one merchant, redirect to merchant details page, otherwise redirect to plan details page
      }

      const handleAddMerchantClick = () => {
        setSelectedPlan()
        dispatch(requestModal(ModalType.MID_MANAGEMENT_DIRECTORY_MERCHANT))
      }

      const optionsMenuItems:OptionsMenuItems = [
        {
          label: 'Add Merchant',
          icon: <AddSvg/>,
          requiredPermission: UserPermissions.MERCHANT_DATA_READ_WRITE,
          clickHandler: () => handleAddMerchantClick(),
        },
        {
          label: 'Edit Plan',
          icon: <EditSvg/>,
          requiredPermission: UserPermissions.MERCHANT_DATA_READ_WRITE,
          clickHandler: () => requestPlanModal(ModalType.MID_MANAGEMENT_DIRECTORY_PLAN),
        },
        {
          label: 'Offboard from Harmonia',
          icon: <OffboardSvg/>,
          requiredPermission: UserPermissions.MERCHANT_DATA_READ_WRITE,
          clickHandler: () => console.log('Clicked'),
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
          label: 'Delete Plan',
          icon: <DeleteSvg/>,
          isRed: true,
          requiredPermission: UserPermissions.MERCHANT_DATA_READ_WRITE_DELETE,
          clickHandler: () => requestPlanModal(ModalType.MID_MANAGEMENT_DIRECTORY_PLAN_DELETE),
        },
      ]
      return <DirectoryTile key={index} metadata={plan_metadata} counts={plan_counts} viewClickFn={handleViewClick} optionsMenuItems={optionsMenuItems}/>
    })
  }


  return (
    <PageLayout>
      <h3 className='font-heading-3 mb-[5px]'>MID Management</h3>
      <p className='font-subheading-2 mb-[39px]'>Create, view and manage MIDs for the plans configured on the platform</p>
      <div className='flex justify-end'>
        <Button
          handleClick={handleRequestNewPlanModal}
          buttonSize={ButtonSize.MEDIUM_ICON}
          buttonWidth={ButtonWidth.AUTO}
          buttonBackground={ButtonBackground.BLUE}
          labelColour={LabelColour.WHITE}
          labelWeight={LabelWeight.MEDIUM}
          requiredPermission={UserPermissions.MERCHANT_DATA_READ_WRITE}
        ><PlusSvg/>New Plan
        </Button>
      </div>
      {planList && planList.length > 0 && (
        <div className='flex mt-[51px] flex-wrap gap-[30px]'>
          {renderDirectoryPlans()}
        </div>
      )}
    </PageLayout>
  )
})

export default DirectoryPage
