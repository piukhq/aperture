import {useState, FormEvent} from 'react'
import {Button, TextInputGroup, Dropdown} from 'components'
import {ButtonType, ButtonWidth, ButtonSize, ButtonBackground, LabelColour, LabelWeight} from 'components/Button/styles'
import {InputType, InputWidth, InputColour, InputStyle} from 'components/TextInputGroup/styles'
import {useAppSelector} from 'app/hooks'
import {getJwtToken} from 'features/customerWalletSlice'
import CheckSvg from 'icons/svgs/check.svg'
import UserSvg from 'icons/svgs/user.svg'

type Props = {
  jwtCustomerLookup: (criteria: string, type: string) => void,
  hasErrorOccurred: boolean
}

const CustomerLookup = ({jwtCustomerLookup, hasErrorOccurred}: Props) => {
  const selectedJwtToken = useAppSelector(getJwtToken)
  const lookupTypeValues = ['JWT']
  const [lookupTypeValue, setLookupTypeValue] = useState(lookupTypeValues[0])
  const [lookupValue, setLookupValue] = useState('')

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    lookupValue.length > 0 && lookupTypeValue === 'JWT' && jwtCustomerLookup(lookupValue, lookupTypeValue)
  }

  return (
    <>
      <form className='flex h-[62px] gap-[25px]' onSubmit={handleSubmit}>
        <div className='h-[42px]'>
          <Dropdown label='Lookup' displayValue={lookupTypeValue} displayValues={lookupTypeValues} onChangeDisplayValue={setLookupTypeValue} hasShadow/>
        </div>

        <div className='w-[100%]'>
          <div className='h-[42px]'>
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
          </div>

          <div className='mt-[5px]'>
            {hasErrorOccurred && selectedJwtToken && (
              <p className='text-body text-[.75rem] text-red' data-testid='error-message'>
                Your search didn&apos;t return any results. Please try again
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
