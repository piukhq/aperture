import type {NextPage} from 'next'
import {PageLayout, HeadMetadata, Button, BankViewport, TextInputGroup} from 'components'
import {withPageAuthRequired} from '@auth0/nextjs-auth0'
import {useState} from 'react'
import {ButtonType, ButtonWidth, ButtonSize, ButtonBackground, LabelColour, LabelWeight} from 'components/Button/styles'
import {useBankViewport} from 'hooks/useBankViewport'
import {WalletApi2} from 'types'
import Search from 'icons/svgs/search.svg'
import CheckSvg from 'icons/svgs/check.svg'
import {InputColour, InputStyle, InputType, InputWidth} from 'components/TextInputGroup/styles'

// This page is very placeholdery and will be replaced with the actual bank viewport once auth is sorted

const BankViewportPage: NextPage = withPageAuthRequired(() => {
  const [demoWalletLoaded, setDemoWalletLoaded] = useState<number>(-1)
  const [lookupValue, setLookupValue] = useState<string>('')
  const [errorMessage] = useState<string>('')

  const {getDemoWallet0Response, getDemoWallet1Response, getDemoWallet2Response} = useBankViewport()

  const demoWallets = [
    getDemoWallet0Response,
    getDemoWallet1Response,
    getDemoWallet2Response,
  ]

  const renderLoyaltyCards = () => {
    const wallet: WalletApi2 = demoWallets[demoWalletLoaded]
    return (
      <div className='flex gap-[30px] flex-wrap mt-6 p-2'>
        {wallet?.loyalty_cards.map((loyaltyCard) => (
          <BankViewport key={loyaltyCard.id} loyaltyCard={loyaltyCard} />
        ))}
      </div>
    )
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log('submit')
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log('change')
    setLookupValue(e.target.value)
  }

  return (
    <>
      <HeadMetadata pageTitle='Bank Viewport' pageDescription='View a customers wallet as per Banking app' />
      <PageLayout>
        <div className='flex justify-center gap-[30px] mb-12'>
          <Button
            handleClick={() => setDemoWalletLoaded(0)}
            buttonType={ButtonType.SUBMIT}
            buttonSize={ButtonSize.MEDIUM_ICON}
            buttonWidth={ButtonWidth.AUTO}
            buttonBackground={ButtonBackground.ORANGE}
            labelColour={LabelColour.WHITE}
            labelWeight={LabelWeight.MEDIUM}
            ariaLabel='Load Wallet 0'
          >
            Demo Viator Wallet
          </Button>
          <Button
            handleClick={() => setDemoWalletLoaded(1)}
            buttonType={ButtonType.SUBMIT}
            buttonSize={ButtonSize.MEDIUM_ICON}
            buttonWidth={ButtonWidth.AUTO}
            buttonBackground={ButtonBackground.BLUE}
            labelColour={LabelColour.WHITE}
            labelWeight={LabelWeight.MEDIUM}
            ariaLabel='Load Wallet 1'
          >
            Demo Empty Wallets
          </Button>
          <Button
            handleClick={() => setDemoWalletLoaded(2)}
            buttonType={ButtonType.SUBMIT}
            buttonSize={ButtonSize.MEDIUM_ICON}
            buttonWidth={ButtonWidth.AUTO}
            buttonBackground={ButtonBackground.RED}
            labelColour={LabelColour.WHITE}
            labelWeight={LabelWeight.MEDIUM}
            ariaLabel='Load Wallet 2'
          >
            Demo Populated Wallets
          </Button>
        </div>
        <div className='sticky top-0 p-2 bg-grey-200 dark:bg-grey-900 z-10'>
          <form className='flex gap-[25px]' onSubmit={handleSubmit}>
            <div className='w-[100%]'>
              <div className='h-[42px]'>
                <TextInputGroup
                  name='user-search'
                  label='User search'
                  autofocus
                  placeholder={'Search by user'}
                  error={''}
                  value={lookupValue}
                  ariaRequired
                  onChange={handleChange}
                  inputType={InputType.SEARCH}
                  inputStyle={InputStyle.ICON_LEFT}
                  inputWidth={InputWidth.FULL}
                  inputColour={InputColour.LIGHT_GREY}
                  borderShadow
                  svgIcon={<Search />}
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
        </div>
        {demoWalletLoaded >= 0 && renderLoyaltyCards()}
      </PageLayout>
    </>
  )
})

export default BankViewportPage
