import type {NextPage} from 'next'
import {Button, MerchantTile, PageLayout, TextInputGroup} from 'components'
import PlusSvg from 'icons/svgs/plus.svg'
import SearchSvg from 'icons/svgs/search.svg'
import {ButtonWidth, ButtonSize, ButtonBackground, LabelColour, LabelWeight} from 'components/Button/styles'
import {InputType, InputWidth, InputColour, InputStyle} from 'components/TextInputGroup/styles'
import {Merchant} from 'types'
import {mockMerchantData} from 'utils/mockMerchantData'

const DatabasePage: NextPage = () => {
  // TODO: Swap out for real api data
  const merchantList: Merchant[] = mockMerchantData

  return (
    <PageLayout>
      <h3 className='font-heading-3 mb-[5px]'>MID Management</h3>
      <p className='font-subheading-2 mb-[39px]'>Create, view and manage MIDs for the merchants configured on the platform</p>

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
          handleClick={() => console.log('New merchant button clicked')}
          buttonSize={ButtonSize.MEDIUM_ICON}
          buttonWidth={ButtonWidth.AUTO}
          buttonBackground={ButtonBackground.BLUE}
          labelColour={LabelColour.WHITE}
          labelWeight={LabelWeight.MEDIUM}
        ><PlusSvg/>New Merchant
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
  )
}

export default DatabasePage
