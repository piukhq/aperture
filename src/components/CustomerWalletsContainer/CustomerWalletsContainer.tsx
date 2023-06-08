import React, {useEffect, useState} from 'react'
import Image from 'next/image'
import {useCustomerWalletUserPlans} from 'hooks/useCustomerWalletUserPlans'
import {useCustomerWallet} from 'hooks/useCustomerWallet'
import CustomerWallet from './components/CustomerWallet'
import CustomerTableContainer from './components/CustomerTableContainer'
import Dropdown from 'components/Dropdown'
import {Plan} from 'types'

const CustomerWalletsContainer = () => {
  const [selectedPlan, setSelectedPlan] = useState(null)
  const [selectedLoyaltyCard, setSelectedLoyaltyCard] = useState(null)
  const {
    userPlans,
  } = useCustomerWalletUserPlans()

  const {
    getLoyaltyCardsResponse,
    getPlansResponse,
    getPaymentCardsResponse,
  } = useCustomerWallet()

  useEffect(() => {
    setSelectedPlan(null)
  }, [getLoyaltyCardsResponse, getPlansResponse])

  useEffect(() => {
    setSelectedLoyaltyCard(getLoyaltyCardsResponse?.find(card => card.membership_plan === selectedPlan?.id))
  }, [getLoyaltyCardsResponse, selectedPlan])

  const renderDropdownPlan = (plan: Plan) => {
    const {images} = plan
    const image = images.find(image => image.type === 3)
    const src = image?.url
    const loyaltyCard = getLoyaltyCardsResponse?.find(card => card.membership_plan === plan.id)

    return (
      <div className='flex items-center ml-[5px]'>
        <div className='h-[24px] w-[24px] mr-[10px]'>
          {src && <Image src={src} height={24} width={24} alt='' />}
        </div>
        <p className='font-body text-sm tracking[.006rem] text-grey-800 dark:text-grey-100'>{plan.account?.plan_name} {loyaltyCard.id} </p>
      </div>
    )
  }

  if (getLoyaltyCardsResponse && getPlansResponse && getPaymentCardsResponse) {
    return (
      <>
        <h1 className='font-heading-4 mb-[10px]'>Wallet</h1>
        <CustomerWallet loyaltyCards={getLoyaltyCardsResponse} paymentCards={getPaymentCardsResponse} userPlans={userPlans} />
        <h1 className='font-heading-4'>Transactions</h1>
        <div className='h-[42px] w-[350px]'>
          <Dropdown
            displayValue={selectedPlan || 'Select Plan'}
            displayValues={userPlans}
            onChangeDisplayValue={setSelectedPlan}
            renderFn={renderDropdownPlan}
            hasShadow
          />
        </div>
        <CustomerTableContainer
          selectedPlan={selectedPlan}
          loyaltyCard={selectedLoyaltyCard}
          entity='transactions'
          tableHeaders={['REWARD', 'DATE', 'DETAILS', 'AMOUNT', 'CHANGE']}
        />
        <h1 className='font-heading-4'>Vouchers</h1>
        <CustomerTableContainer
          selectedPlan={selectedPlan}
          loyaltyCard={selectedLoyaltyCard}
          entity='vouchers'
          tableHeaders={['TYPE', 'CODE', 'ISSUED', 'EXPIRES', 'STATE']}
        />
      </>
    )
  }
}

export default CustomerWalletsContainer
