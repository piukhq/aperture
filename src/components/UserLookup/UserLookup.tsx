import {useState} from 'react'
import {Button, TextInputGroup, Dropdown} from 'components'
import {ButtonType, ButtonWidth, ButtonSize, ButtonBackground, LabelColour, LabelWeight} from 'components/Button/styles'
import {InputType, InputWidth, InputColour, InputStyle} from 'components/TextInputGroup/styles'
import CheckSvg from 'icons/svgs/check.svg'
import UserSvg from 'icons/svgs/user.svg'

const UserLookup = () => {
  const displayValues = ['JWT']
  const [displayValue, setDisplayValue] = useState(displayValues[0])

  return (
    <div className='flex h-[42px] items-center gap-[25px]'>
      <Dropdown label='Lookup' displayValue={displayValue} displayValues={displayValues} onChangeDisplayValue={setDisplayValue} hasShadow/>
      <TextInputGroup
        name='user-identifier'
        label='User identifier'
        placeholder='Enter JWT from Django'
        error={null}
        value={''}
        ariaRequired
        onChange={() => null}
        inputType={InputType.SEARCH}
        inputStyle={InputStyle.ICON_LEFT}
        inputWidth={InputWidth.FULL}
        inputColour={InputColour.LIGHT_GREY}
        borderShadow
        svgIcon={<UserSvg />}
      />

      <Button
        buttonType={ButtonType.SUBMIT}
        buttonSize={ButtonSize.MEDIUM_ICON}
        buttonWidth={ButtonWidth.AUTO}
        buttonBackground={ButtonBackground.BLUE}
        labelColour={LabelColour.WHITE}
        labelWeight={LabelWeight.MEDIUM}
        handleClick={() => console.log('Load user clicked')}
        ariaLabel='Load User'
      >
        <CheckSvg fill='white' />Load User
      </Button>
    </div>
  )
}

export default UserLookup
