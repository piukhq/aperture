import {useCallback} from 'react'
import type {NextPage} from 'next'
import Image from 'next/image'
import {useRouter} from 'next/router'
import {
  useAppDispatch,
  useAppSelector,
} from 'app/hooks'
import {PageLayout, Button, DirectoryTile, NewMerchantModal} from 'components'
import {
  ModalType,
  requestModal,
  selectModal,
} from 'features/modalSlice'
import PlusSvg from 'icons/svgs/plus.svg'
import DotsSvg from 'icons/svgs/dots.svg'
import {ButtonWidth, ButtonSize, BorderColour, ButtonBackground, LabelColour, LabelWeight} from 'components/Button/styles'

import {mockPlanDetailsData} from 'utils/mockPlanDetailsData'
import {DirectoryPlanDetails} from 'types'

const PlanDetailsPage: NextPage = () => {
  // TODO: Swap out for real api data
  const planDetails: DirectoryPlanDetails = mockPlanDetailsData
  const dispatch = useAppDispatch()
  const modalRequested: ModalType = useAppSelector(selectModal)

  const handleRequestNewMerchantModal = useCallback(() => { dispatch(requestModal('MID_MANAGEMENT_NEW_MERCHANT')) }, [dispatch])

  const router = useRouter()
  const {planId} = router.query

  console.log(`Plan ID ${planId} to be used when real data is used`)

  const {plan_metadata: planMetadata, merchants} = planDetails
  const {name, icon_url: iconUrl, slug, plan_id: planDetailsId} = planMetadata

  return (
    <>

      {modalRequested === 'MID_MANAGEMENT_NEW_MERCHANT' && <NewMerchantModal />}
      <PageLayout>
        {/* Breadcrumb */}
        <p className='font-subheading-6 text-blue ml-[245px] mt-[15px]'>PLANS / SQUAREMEAL</p>

        <div className='ml-[40px]'>
          {/* Icon image div to provide top border shadow */}
          <div className='absolute z-70 top-[50px] flex justify-center rounded-[30px] items-center h-[180px] w-[180px] shadow-[0_1px_6px_0px_rgba(0,0,0,0.5)]' />

          {/* Icon image div container */}
          <div className='absolute z-30 top-[50px] flex justify-center rounded-[30px] items-center h-[180px] w-[180px] bg-grey-100'>
            <Image className='z-50 absolute rounded-[30px]' src={iconUrl} height={165} width={165} alt='' data-testid='icon' />
          </div>
        </div>

        <div className='relative flex rounded-[10px] pl-[250px] h-[152px] mt-[15px]  pr-[16px] bg-white dark:bg-grey-825 shadow-[0_1px_6px_0px_rgba(0,0,0,0.5)]'>
          <div className='flex justify-between flex-1 pt-[20px] pb-[32px]'>
            <div>
              <h3 className='font-heading-3 mb-[8px]'>{name}</h3>
              <div className='flex flex-row'>
                <div className='flex flex-col w-[74px]'>
                  <p className='font-subheading-5 text-grey-600 dark:text-grey-500'>Slug</p>
                  <p className='font-subheading-5 text-grey-600 dark:text-grey-500'>Scheme ID</p>
                </div>
                <div className='flex flex-col ml-[91px]'>
                  <p className='font-subheading-3'>{slug}</p>
                  <p className='font-subheading-3'>{planDetailsId}</p>
                </div>

                <div className='flex flex-col ml-[91px]'>
                  <p className='font-subheading-5 text-grey-600 dark:text-grey-500'>Location Label</p>
                </div>
                <div className='flex flex-col ml-[91px]'>
                  <p className='font-subheading-3'>Store</p>
                </div>
              </div>
            </div>

            <div className='flex gap-[22px]'>
              <Button
                handleClick={handleRequestNewMerchantModal}
                buttonSize={ButtonSize.MEDIUM_ICON}
                buttonWidth={ButtonWidth.AUTO}
                buttonBackground={ButtonBackground.BLUE}
                labelColour={LabelColour.WHITE}
                labelWeight={LabelWeight.MEDIUM}
              ><PlusSvg/>New Merchant
              </Button>
              <Button
                handleClick={() => console.log('More Options button clicked')}
                buttonSize={ButtonSize.MEDIUM_ICON}
                buttonWidth={ButtonWidth.ICON_ONLY}
                borderColour={BorderColour.GREY}
                ariaLabel='Options'
              ><DotsSvg/></Button>
            </div>
          </div>
        </div>

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
