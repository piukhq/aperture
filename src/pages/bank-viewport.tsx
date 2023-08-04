import type {NextPage} from 'next'
import {PageLayout, HeadMetadata, Button, BankViewport} from 'components'
import {withPageAuthRequired} from '@auth0/nextjs-auth0'
import {useState} from 'react'
import {ButtonType, ButtonWidth, ButtonSize, ButtonBackground, LabelColour, LabelWeight} from 'components/Button/styles'
import {useBankViewport} from 'hooks/useBankViewport'
import {WalletApi2} from 'types'

// This page is very placeholdery and will be replaced with the actual bank viewport once auth is sorted

const BankViewportPage: NextPage = withPageAuthRequired(() => {
  const [demoWalletLoaded, setDemoWalletLoaded] = useState<number>(-1)

  const {getDemoWallet0Response, getDemoWallet1Response, getDemoWallet2Response} = useBankViewport()

  const demoWallets = [
    getDemoWallet0Response,
    getDemoWallet1Response,
    getDemoWallet2Response,
  ]

  const renderLoyaltyCards = () => {
    const wallet: WalletApi2 = demoWallets[demoWalletLoaded]
    return (
      <div className='flex gap-[30px] flex-wrap '>
        {wallet?.loyalty_cards.map((loyaltyCard) => (
          <BankViewport key={loyaltyCard.id} loyaltyCard={loyaltyCard} />
        ))}
      </div>
    )
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
        { demoWalletLoaded >= 0 && renderLoyaltyCards()}
      </PageLayout>
    </>
  )
})

export default BankViewportPage
