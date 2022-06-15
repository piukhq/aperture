import CheckSvg from 'icons/svgs/check.svg'
import CloseSvg from 'icons/svgs/close.svg'
import {useCustomerWallet} from 'hooks/useCustomerWallet'

type Props = {
  isPllCard: boolean,
  loyaltyCardPaymentCardIds: number[],
  paymentCardIndex: number,
}

const LinkStatus = ({isPllCard, loyaltyCardPaymentCardIds, paymentCardIndex}: Props) => {
  const {getPaymentCardsResponse} = useCustomerWallet()

  const getLinkStatus = () => {
    const paymentCardId = getPaymentCardsResponse[paymentCardIndex].id
    const isPaymentCardLinkedToThisLoyaltyCard = loyaltyCardPaymentCardIds.some((id:number) => id === paymentCardId)
    return isPaymentCardLinkedToThisLoyaltyCard ? <CheckSvg fill='green' className='scale-125' alt='Linked' /> : <CloseSvg fill='red' className={'h-[15px]'} alt='Not linked'/>
  }

  return (
    <div className='w-[200px] flex items-center justify-center'>
      { isPllCard ? getLinkStatus() : <div aria-label='Not applicable' role='img' className='h-[3px] bg-grey-600 w-[20px]'/>}
    </div>
  )
}

export default LinkStatus
