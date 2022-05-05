import {useCallback} from 'react'
import type {NextPage} from 'next'
import {useRouter} from 'next/router'
import {
  useAppDispatch,
  useAppSelector,
} from 'app/hooks'
import {PageLayout, DirectoryTile, DirectoryMerchantModal, DirectoryDetailsHeader, DirectoryMerchantDeleteModal} from 'components'
import {requestModal, selectModal} from 'features/modalSlice'
import {ModalType} from 'utils/enums'
import {mockPlanDetailsData} from 'utils/mockPlanDetailsData'
import {DirectoryPlanDetails, OptionsMenuItems} from 'types'
import {setSelectedDirectoryMerchant} from 'features/directoryMerchantSlice'
import EditSvg from 'icons/svgs/project.svg'
import DeleteSvg from 'icons/svgs/trash-small.svg'

const PlanDetailsPage: NextPage = () => {
  // TODO: Swap out for real api data
  const planDetails: DirectoryPlanDetails = mockPlanDetailsData
  const {plan_metadata: planMetadata, merchants} = planDetails

  const dispatch = useAppDispatch()
  const modalRequested: ModalType = useAppSelector(selectModal)

  const handleRequestNewMerchantModal = useCallback(() => { dispatch(requestModal(ModalType.MID_MANAGEMENT_DIRECTORY_MERCHANT)) }, [dispatch])

  // TODO: Use plan ID from URL to query for specific plan
  const router = useRouter()
  // const {planId} = router.query

  const renderMerchants = () => {
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

          const optionsMenuItems:OptionsMenuItems = [
            {
              label: 'Edit',
              icon: <EditSvg/>,
              clickHandler: () => requestMerchantModal(ModalType.MID_MANAGEMENT_DIRECTORY_MERCHANT),
            },
            {
              label: 'Delete',
              icon: <DeleteSvg/>,
              isRed: true,
              clickHandler: () => requestMerchantModal(ModalType.MID_MANAGEMENT_DIRECTORY_MERCHANT_DELETE),
            },
          ]

          return <DirectoryTile key={merchant_ref} metadata={merchant_metadata} counts={merchant_counts} optionsMenuItems={optionsMenuItems} viewClickFn={handleViewClick} />
        })}
      </div>
    )
  }

  return (
    <>
      {modalRequested === ModalType.MID_MANAGEMENT_DIRECTORY_MERCHANT && <DirectoryMerchantModal />}
      {modalRequested === ModalType.MID_MANAGEMENT_DIRECTORY_MERCHANT_DELETE && <DirectoryMerchantDeleteModal />}
      <PageLayout>
        <DirectoryDetailsHeader metadata={planMetadata} newItemButtonHandler={handleRequestNewMerchantModal} />
        {merchants.length > 0 && renderMerchants()}
      </PageLayout>
    </>
  )
}

export default PlanDetailsPage
