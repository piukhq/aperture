import React, {useState, useEffect} from 'react'
import {useDispatch} from 'react-redux'
import {Button, TextInputGroup, Dropdown} from 'components'
import {ButtonType, ButtonWidth, ButtonSize, ButtonBackground, LabelColour, LabelWeight} from 'components/Button/styles'
import {InputType, InputWidth, InputColour, InputStyle} from 'components/TextInputGroup/styles'
import CheckSvg from 'icons/svgs/check.svg'
import UserSvg from 'icons/svgs/user.svg'
import {setJwtToken} from 'features/customerWalletSlice'
import {useService} from 'hooks/useService'
import {useCustomerLookup} from 'hooks/useCustomerLookup'

const CustomerLookup = () => {
  const {
    getServiceRefresh,
  } = useService()
  const {jwtCustomerLookup} = useCustomerLookup()

  const dispatch = useDispatch()
  const lookupTypeValues = ['JWT']
  const [lookupTypeValue, setLookupTypeValue] = useState(lookupTypeValues[0])
  const [lookupValue, setLookupValue] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (lookupTypeValue === 'JWT' && lookupValue.length > 0) { // TODO: Add better validation rules
      dispatch(setJwtToken(lookupValue))
      getServiceRefresh()
    }
  }

  useEffect(() => {
    if (lookupTypeValue === 'JWT' && lookupValue) {
      jwtCustomerLookup(lookupValue, lookupTypeValue)
    }
  }, [jwtCustomerLookup, lookupValue, lookupTypeValue])

  return (
    <form className='flex h-[42px] items-center gap-[25px]' onSubmit={handleSubmit}>
      <Dropdown label='Lookup' displayValue={lookupTypeValue} displayValues={lookupTypeValues} onChangeDisplayValue={setLookupTypeValue} hasShadow/>
      <TextInputGroup
        name='user-identifier'
        label='User identifier'
        placeholder='Enter JWT from Django'
        error={null}
        value={lookupValue}
        ariaRequired
        onChange={(e) => setLookupValue(e.target.value)}
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
        ariaLabel='Load User'
      >
        <CheckSvg fill='white' />Load User
      </Button>
    </form>
  )
}

export default CustomerLookup
