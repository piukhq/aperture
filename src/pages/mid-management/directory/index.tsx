import type {NextPage} from 'next'
import {Button, MerchantTile, PageLayout, TextInputGroup, NewMerchantModal} from 'components'
import PlusSvg from 'icons/svgs/plus.svg'
import SearchSvg from 'icons/svgs/search.svg'
import {ButtonWidth, ButtonSize, ButtonBackground, LabelColour, LabelWeight} from 'components/Button/styles'
import {InputType, InputWidth, InputColour, InputStyle} from 'components/TextInputGroup/styles'
import {Merchant} from 'types'
import {mockMerchantData} from 'utils/mockMerchantData'
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
  const merchantList: Merchant[] = mockMerchantData
  const dispatch = useAppDispatch()
  const modalRequested: ModalType = useAppSelector(selectModal)

  const handleRequestNewMerchantModal = useCallback(() => { dispatch(requestModal('MID_MANAGEMENT_NEW_MERCHANT')) }, [dispatch])

  return (
    <>
      {modalRequested === 'MID_MANAGEMENT_NEW_MERCHANT' && <NewMerchantModal />}
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
        {merchantList.length > 0 && (
          <div className='flex mt-[51px] flex-wrap gap-[30px]'>
            {merchantList.map((merchant, index) => (
              <MerchantTile key={index} merchant={merchant} />
            ))}
          </div>
        )}
      </PageLayout>
    </>
  )
}

export default DirectoryPage
