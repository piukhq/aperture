import CheckSvg from 'icons/svgs/check.svg'
import CloseSvg from 'icons/svgs/close.svg'
import {useCustomerWallet} from 'hooks/useCustomerWallet'

const LinkStatus = ({isPllCard, loyaltyCardPaymentCards, paymentCardIndex}) => {
  const {getPaymentCardsResponse} = useCustomerWallet()

  const getLinkStatus = () => {
    const paymentCardId = getPaymentCardsResponse[paymentCardIndex].id
    const isPaymentCardLinkedToThisLoyaltyCard = loyaltyCardPaymentCards.some((loyaltyCardPaymentCard) => loyaltyCardPaymentCard.id === paymentCardId)
    return isPaymentCardLinkedToThisLoyaltyCard ? <CheckSvg fill='green' className='scale-125' /> : <CloseSvg fill='red' className={'h-[15px]'} />
  }

  return (
    <div className='w-[200px] flex items-center justify-center'>
      { isPllCard ? getLinkStatus() : <div className='h-[3px] bg-grey-600 w-[20px]'/>}
    </div>
  )
}

export default LinkStatus
