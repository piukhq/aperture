import type {NextPage} from 'next'
import {PageLayout, HeadMetadata, Button, BankViewport} from 'components'
import {withPageAuthRequired} from '@auth0/nextjs-auth0'
import {useState} from 'react'
import {ButtonType, ButtonWidth, ButtonSize, ButtonBackground, LabelColour, LabelWeight} from 'components/Button/styles'
import CheckSvg from 'icons/svgs/check.svg'
import {useBankViewport} from 'hooks/useBankViewport'
import {WalletApi2} from 'types'

// This page is very placeholdery and will be replaced with the actual bank viewport once auth is sorted

const BankViewportPage: NextPage = withPageAuthRequired(() => {
  const [isLoaded, setIsLoaded] = useState(false)

  const {getDemoWalletResponse} = useBankViewport()

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoaded(true)
  }

  const renderLoyaltyCards = () => {
    const wallet: WalletApi2 = getDemoWalletResponse
    return (
      <div className='flex flex-col gap-[30px]'>
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
        <div className='flex flex-col gap-[30px]'>
          <form className='flex h-[62px] gap-[25px] justify-end' onSubmit={handleSubmit}>
            <Button
              buttonType={ButtonType.SUBMIT}
              buttonSize={ButtonSize.MEDIUM_ICON}
              buttonWidth={ButtonWidth.AUTO}
              buttonBackground={ButtonBackground.BLUE}
              labelColour={LabelColour.WHITE}
              labelWeight={LabelWeight.MEDIUM}
              ariaLabel='Load User'
            >
              <CheckSvg fill='white' />Load Viator Demo User
            </Button>
          </form>
          { isLoaded && renderLoyaltyCards() }
        </div>
      </PageLayout>
    </>
  )
})

export default BankViewportPage
