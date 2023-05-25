import CheckSvg from 'icons/svgs/check.svg'
import CloseSvg from 'icons/svgs/close.svg'
import {useCustomerWallet} from 'hooks/useCustomerWallet'
import {useIsMobileViewportDimensions} from 'utils/windowDimensions'

type Props = {
  isPllCard: boolean,
  loyaltyCardPaymentCardIds: number[],
  paymentCardIndex: number,
}

const LinkStatus = ({isPllCard, loyaltyCardPaymentCardIds, paymentCardIndex}: Props) => {
  const {getPaymentCardsResponse} = useCustomerWallet()
  const isMobileViewport = useIsMobileViewportDimensions()

  const getLinkStatus = () => {
    const paymentCardId = getPaymentCardsResponse[paymentCardIndex]?.id
    const isPaymentCardLinkedToThisLoyaltyCard = loyaltyCardPaymentCardIds.some((id:number) => id === paymentCardId)
    return isPaymentCardLinkedToThisLoyaltyCard ? <CheckSvg fill='green' className='scale-125' data-testid='linked' alt='Linked' /> : <CloseSvg fill='red' className={'h-[15px]'} data-testid='not-linked' alt='Not linked'/>
  }

  return (
    <div className={`flex items-center justify-center ${isMobileViewport ? 'w-[120px]' : 'w-[200px]'}`}>
      { isPllCard ? getLinkStatus() : <div aria-label='Not applicable' role='img' className='h-[3px] bg-grey-600 w-[20px]'/>}
    </div>
  )
}

export default LinkStatus
