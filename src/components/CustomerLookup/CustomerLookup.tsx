import React, {useState} from 'react'
import {useDispatch} from 'react-redux'
import {Button, TextInputGroup, Dropdown} from 'components'
import {ButtonType, ButtonWidth, ButtonSize, ButtonBackground, LabelColour, LabelWeight} from 'components/Button/styles'
import {InputType, InputWidth, InputColour, InputStyle} from 'components/TextInputGroup/styles'
import CheckSvg from 'icons/svgs/check.svg'
import UserSvg from 'icons/svgs/user.svg'
import {setJwtToken, getJwtToken} from 'features/customerWalletSlice'
import {useCustomerWallet} from 'hooks/useCustomerWallet'
import {useAppSelector} from 'app/hooks'

const CustomerLookup = () => {
  const dispatch = useDispatch()
  const selectedJwtToken = useAppSelector(getJwtToken)
  const {getLoyaltyCardsRefresh, getPaymentCardsRefresh, getPlansRefresh} = useCustomerWallet()
  const lookupTypeValues = ['JWT']
  const [lookupTypeValue, setLookupTypeValue] = useState(lookupTypeValues[0])
  const [lookupValue, setLookupValue] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (lookupTypeValue === 'JWT') { // TODO: Add better validation rules
      if(lookupTypeValue !== selectedJwtToken) { // If a previous token exists that is not this one, clear the api data
        dispatch(setJwtToken(lookupValue))
        getLoyaltyCardsRefresh()
        getPaymentCardsRefresh()
        getPlansRefresh()
      }
    }
  }

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
