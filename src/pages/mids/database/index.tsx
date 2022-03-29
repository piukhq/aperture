import type {NextPage} from 'next'
import {Button, PageLayout} from 'components'
import {ButtonWidth, ButtonSize, ButtonBackground, LabelColour, LabelWeight} from 'components/Button/styles'
import PlusSvg from 'icons/svgs/plus.svg'
import SearchSvg from 'icons/svgs/search.svg'
import {TextInputGroup} from 'components'

const DatabasePage: NextPage = () => {
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
          inputType={TextInputGroup.inputType.SEARCH}
          inputStyle={TextInputGroup.inputStyle.WHITE_ICON_LEFT_SMALL}
          inputWidth={TextInputGroup.inputWidth.SMALL}
          inputColour={TextInputGroup.inputColour.GREY}
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

    </PageLayout>
  )
}

export default DatabasePage
