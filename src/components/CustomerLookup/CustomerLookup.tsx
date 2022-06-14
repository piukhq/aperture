import React, {useState} from 'react'
import {useDispatch} from 'react-redux'
import {Button, TextInputGroup, Dropdown} from 'components'
import {ButtonType, ButtonWidth, ButtonSize, ButtonBackground, LabelColour, LabelWeight} from 'components/Button/styles'
import {InputType, InputWidth, InputColour, InputStyle} from 'components/TextInputGroup/styles'
import CheckSvg from 'icons/svgs/check.svg'
import UserSvg from 'icons/svgs/user.svg'
import {setJwtToken, getJwtToken, setDecodedJwtToken} from 'features/customerWalletSlice'
import {useCustomerWallet} from 'hooks/useCustomerWallet'
import {useAppSelector} from 'app/hooks'
import {decodeJwtToken} from 'utils/jwtToken'

const CustomerLookup = () => {
  // const barclaysSam = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJidW5kbGVfaWQiOiJjb20uYmFyY2xheXMuYm1iIiwidXNlcl9pZCI6ImN1c3RvbWVyX3dhbGxldDFAYmluay5jb20iLCJzdWIiOjQwNjUyLCJpYXQiOjE2NTQ3Nzg3MTF9.DXzUBmpNMSpsRpdbMLqd5c-6aBgZ8qf3MeGmyQ5tWHA'
  // const binkSam = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJidW5kbGVfaWQiOiJjb20uYmluay53YWxsZXQiLCJ1c2VyX2lkIjoiY3VzdG9tZXJfd2FsbGV0MUBiaW5rLmNvbSIsInN1YiI6NDA2NTEsImlhdCI6MTY1NDc3ODUxMX0.MoHe5vbxmYBUI2zFREQ4MgPfYPee_wBfgUMq64kqvNQ'
  const regular = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJidW5kbGVfaWQiOiJjb20uYmluay53YWxsZXQiLCJ1c2VyX2lkIjoibGtfMUBiaW5rLmNvbSIsInN1YiI6NDA0NTYsImlhdCI6MTY1NDUyNjIyMH0._Vy6BbYd_27K0FCcWWeyxSCKyYyNUy2O2Q_MUeUAOf0'

  const dispatch = useDispatch()
  const selectedJwtToken = useAppSelector(getJwtToken)
  const {getLoyaltyCardsRefresh, getPaymentCardsRefresh, getPlansRefresh} = useCustomerWallet()
  const lookupTypeValues = ['JWT']
  const [lookupTypeValue, setLookupTypeValue] = useState(lookupTypeValues[0])
  const [lookupValue, setLookupValue] = useState(regular) // TODO: Remove handy placeholder for testing when required

  const handleSubmit = (e: React.FormEvent) => { // TODO: Handle other lookup types when required
    e.preventDefault()
    dispatch(setJwtToken(lookupValue))
    dispatch(setDecodedJwtToken(decodeJwtToken(lookupValue)))

    if(lookupTypeValue !== selectedJwtToken) {
      getLoyaltyCardsRefresh()
      getPaymentCardsRefresh()
      getPlansRefresh()
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
        handleClick={() => handleSubmit}
        ariaLabel='Load User'
      >
        <CheckSvg fill='white' />Load User
      </Button>
    </form>
  )
}

export default CustomerLookup
