import {useCallback} from 'react'
import type {NextPage} from 'next'
import {useRouter} from 'next/router'
import {
  useAppDispatch,
  useAppSelector,
} from 'app/hooks'
import {PageLayout, DirectoryTile, NewMerchantModal, DirectoryDetailsHeader} from 'components'
import {
  ModalType,
  requestModal,
  selectModal,
} from 'features/modalSlice'
import {mockPlanDetailsData} from 'utils/mockPlanDetailsData'
import {DirectoryPlanDetails} from 'types'

const PlanDetailsPage: NextPage = () => {
  // TODO: Swap out for real api data
  const planDetails: DirectoryPlanDetails = mockPlanDetailsData
  const {plan_metadata: planMetadata, merchants} = planDetails

  const dispatch = useAppDispatch()
  const modalRequested: ModalType = useAppSelector(selectModal)

  const handleRequestNewMerchantModal = useCallback(() => { dispatch(requestModal('MID_MANAGEMENT_NEW_MERCHANT')) }, [dispatch])

  const router = useRouter()
  const {planId} = router.query

  console.log(`Plan ID ${planId} to be used when real data is used`)

  return (
    <>
      {modalRequested === 'MID_MANAGEMENT_NEW_MERCHANT' && <NewMerchantModal />}
      <PageLayout>
        <DirectoryDetailsHeader metadata={planMetadata} newItemButtonHandler={handleRequestNewMerchantModal} />

        <div className='flex mt-[30px] flex-wrap gap-[31px]'>
          {merchants.map((merchant, index) => {
            const {merchant_metadata, merchant_counts, merchant_ref} = merchant.merchant
            return <DirectoryTile key={index} metadata={merchant_metadata} counts={merchant_counts} id={merchant_ref} />
          })}
        </div>
      </PageLayout>
    </>
  )
}

export default PlanDetailsPage
