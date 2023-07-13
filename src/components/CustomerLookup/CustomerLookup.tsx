import {useState, FormEvent, useEffect} from 'react'
import {Button, TextInputGroup, Dropdown} from 'components'
import {useAppSelector, useAppDispatch} from 'app/hooks'
import {getJwtToken, setJwtToken} from 'features/customerWalletSlice'
import {ButtonType, ButtonWidth, ButtonSize, ButtonBackground, LabelColour, LabelWeight} from 'components/Button/styles'
import {InputType, InputWidth, InputColour, InputStyle} from 'components/TextInputGroup/styles'
import CheckSvg from 'icons/svgs/check.svg'
import UserSvg from 'icons/svgs/user.svg'


enum LookupType {
  EXTERNAL_ID = 'External ID',
  JWT = 'JWT',
  EMAIL = 'Email'
}

type Props = {
  jwtCustomerLookup: (criteria: string, type: string) => void,
  hasErrorOccurred: boolean
}

const CustomerLookup = ({jwtCustomerLookup, hasErrorOccurred}: Props) => {
  const selectedJwtToken = useAppSelector(getJwtToken)
  const dispatch = useAppDispatch()
  const lookupTypeValues = Object.values(LookupType)
  const [lookupTypeValue, setLookupTypeValue] = useState<string>(lookupTypeValues[0])
  const [lookupValue, setLookupValue] = useState<string>('')
  const [errorMessage, setErrorMessage] = useState<string>('')

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLookupValue(e.target.value)
    setErrorMessage('')
    selectedJwtToken && dispatch(setJwtToken(''))
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    setErrorMessage('')
    if (lookupValue.length > 0 && lookupTypeValue === 'JWT') {
      jwtCustomerLookup(lookupValue, lookupTypeValue)
    } else if (lookupValue.length === 0) {
      setErrorMessage('Enter JWT to load user')
    }
  }

  useEffect(() => {
    hasErrorOccurred && selectedJwtToken && setErrorMessage('Your search didn\'t return any results. Please try again')
  }, [hasErrorOccurred, lookupValue.length, selectedJwtToken])

  return (
    <>
      <form className='flex h-[62px] gap-[25px]' onSubmit={handleSubmit}>
        <div className='h-[42px] min-w-[230px]'>
          <Dropdown label='Lookup' displayValue={lookupTypeValue} displayValues={lookupTypeValues} onChangeDisplayValue={setLookupTypeValue} hasShadow/>
        </div>

        <div className='w-[100%]'>
          <div className='h-[42px]'>
            <TextInputGroup
              name='user-identifier'
              label='User identifier'
              autofocus
              placeholder={`Enter ${lookupTypeValue} ${lookupTypeValue === 'JWT' ? 'from Django' : ''}`}
              error={''}
              value={lookupValue}
              ariaRequired
              onChange={handleTextChange}
              inputType={InputType.SEARCH}
              inputStyle={InputStyle.ICON_LEFT}
              inputWidth={InputWidth.FULL}
              inputColour={InputColour.LIGHT_GREY}
              borderShadow
              svgIcon={<UserSvg />}
            />
          </div>

          <div className='mt-[5px]'>
            {errorMessage && (
              <p role='alert' className='text-body text-[.75rem] text-red' data-testid='error-message'>
                {errorMessage}
              </p>
            )}
          </div>
        </div>

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
    </>
  )
}

export default CustomerLookup
