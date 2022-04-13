import type {NextPage} from 'next'
import {Button, DirectoryTile, PageLayout, TextInputGroup, NewMerchantModal} from 'components'
import PlusSvg from 'icons/svgs/plus.svg'
import SearchSvg from 'icons/svgs/search.svg'
import {ButtonWidth, ButtonSize, ButtonBackground, LabelColour, LabelWeight} from 'components/Button/styles'
import {InputType, InputWidth, InputColour, InputStyle} from 'components/TextInputGroup/styles'
import {DirectoryPlan} from 'types'

import {mockPlanData} from 'utils/mockPlanData'
import {
  useAppDispatch,
  useAppSelector,
} from 'app/hooks'
import {
  ModalType,
  requestModal,
  selectModal,
} from 'features/modalSlice'
import {useCallback} from 'react'

const DirectoryPage: NextPage = () => {
  // TODO: Swap out for real api data
  const planList: DirectoryPlan[] = mockPlanData
  const dispatch = useAppDispatch()
  const modalRequested: ModalType = useAppSelector(selectModal)


  // TODO: To be updated with New Plan modal implementation
  const handleRequestNewMerchantModal = useCallback(() => { dispatch(requestModal('MID_MANAGEMENT_NEW_MERCHANT')) }, [dispatch])

  return (
    <>
      {modalRequested === 'MID_MANAGEMENT_NEW_MERCHANT' && <NewMerchantModal /> /* TODO: To be updated with New Plan modal implementation */}
      <PageLayout>
        <h3 className='font-heading-3 mb-[5px]'>MID Management</h3>
        <p className='font-subheading-2 mb-[39px]'>Create, view and manage MIDs for the plans configured on the platform</p>

        <div className='flex justify-between'>
          <TextInputGroup
            name='placeholder'
            label='Search'
            placeholder='Search'
            value=''
            onChange={() => null}
            inputType={InputType.SEARCH}
            inputStyle={InputStyle.WHITE_ICON_LEFT_SMALL}
            inputWidth={InputWidth.SMALL}
            inputColour={InputColour.GREY}
            svgIcon={<SearchSvg/>}
          />
          <Button
            handleClick={handleRequestNewMerchantModal}
            buttonSize={ButtonSize.MEDIUM_ICON}
            buttonWidth={ButtonWidth.AUTO}
            buttonBackground={ButtonBackground.BLUE}
            labelColour={LabelColour.WHITE}
            labelWeight={LabelWeight.MEDIUM}
          ><PlusSvg/>New Plan
          </Button>
        </div>
        {planList.length > 0 && (
          <div className='flex mt-[51px] flex-wrap gap-[30px]'>
            {planList.map((plan, index) => {
              const {plan_metadata, plan_counts, plan_ref} = plan
              return <DirectoryTile key={index} metadata={plan_metadata} counts={plan_counts} id={plan_ref} />
            })}
          </div>
        )}
      </PageLayout>
    </>
  )
}

export default DirectoryPage
