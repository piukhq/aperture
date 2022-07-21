import React, {useEffect, useState} from 'react'
import {useDispatch} from 'react-redux'
import {Button, TextInputGroup, Dropdown} from 'components'
import {ButtonType, ButtonWidth, ButtonSize, ButtonBackground, LabelColour, LabelWeight} from 'components/Button/styles'
import {InputType, InputWidth, InputColour, InputStyle} from 'components/TextInputGroup/styles'
import CheckSvg from 'icons/svgs/check.svg'
import UserSvg from 'icons/svgs/user.svg'
import {setJwtToken, getJwtToken} from 'features/customerWalletSlice'
import {useAppSelector} from 'app/hooks'
import {useService} from 'hooks/useService'
import {useGetCustomerWalletLookupHistory} from 'hooks/useGetCustomerWalletLookupHistory'
import {decodeJwtToken} from 'utils/jwtToken'

const CustomerLookup = () => {
  const {putLookHistoryEntry} = useGetCustomerWalletLookupHistory()
  const selectedJwtToken = useAppSelector(getJwtToken)
  const {
    getServiceResponse,
    getServiceRefresh,
  } = useService()

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
    if (getServiceResponse && selectedJwtToken) {
      const {bundle_id: channel, sub: userId, user_id: userEmail} = decodeJwtToken(selectedJwtToken) || {}
      channel && userId && userEmail && putLookHistoryEntry({
        user: {
          channel,
          user_id: userId,
          display_text: userEmail,
        },
        lookup: {
          type: lookupTypeValue,
          datetime: JSON.stringify(new Date()),
          // TODO: This will need to be dynamic based on the lookup type
          criteria: selectedJwtToken,
        },
      })
    }
  }, [getServiceResponse, putLookHistoryEntry, lookupTypeValue, selectedJwtToken])

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
