import React, {useEffect, useState} from 'react'
import Image from 'next/image'
import {useCustomerWalletUserPlans} from 'hooks/useCustomerWalletUserPlans'
import {useCustomerWallet} from 'hooks/useCustomerWallet'
import CustomerWallet from './components/CustomerWallet'
import CustomerTableContainer from './components/CustomerTableContainer'
import Dropdown from 'components/Dropdown'
import {Plan} from 'types'

const CustomerWalletsContainer: React.FC = () => {
  const [selectedPlan, setSelectedPlan] = useState<Plan>(null)
  const [selectedDropdownValue, setSelectedDropdownValue] = useState<string>('')

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

  const getLoyaltyCardIdFromDropdownString = (dropdownString: string) => {
    const dropdownStringArr = dropdownString?.split(' ')
    return dropdownStringArr && Number(dropdownStringArr[dropdownStringArr.length - 1])
  }

  const setPlanFromDropdownString = (dropdownString: string) => {
    if (!getLoyaltyCardsResponse || !getPlansResponse) { return null }
    const loyaltyCard = getLoyaltyCardsResponse.find(card => card.id === getLoyaltyCardIdFromDropdownString(dropdownString))
    loyaltyCard && setSelectedPlan(getPlansResponse.find(plan => plan?.id === loyaltyCard.membership_plan) || null)
    setSelectedDropdownValue(dropdownString)
  }


  const renderDropdownPlan = (dropdownString: string) => {
    const loyaltyCardId = getLoyaltyCardIdFromDropdownString(dropdownString)
    if (!getLoyaltyCardsResponse || !getPlansResponse) { return <div /> }
    const loyaltyCard = getLoyaltyCardsResponse.find(card => card.id === loyaltyCardId)
    const plan = getPlansResponse.find(plan => plan?.id === loyaltyCard?.membership_plan)

    const images = plan?.images || []
    const image = images.find(image => image.type === 3)
    const src = image?.url

    return (
      <div className='flex items-center ml-[5px]'>
        <div className='h-[24px] w-[24px] mr-[10px]'>
          {src && <Image src={src} height={24} width={24} alt='' />}
        </div>
        <p className='font-body text-sm tracking[.006rem] text-grey-800 dark:text-grey-100'>{plan?.account?.plan_name} {loyaltyCardId} </p>
      </div>
    )
  }

  if (getLoyaltyCardsResponse && getLoyaltyCardsResponse.length > 0 && getPlansResponse && getPaymentCardsResponse) {
    const dropdownValues = getLoyaltyCardsResponse.map(card => {
      const plan = getPlansResponse.find(plan => plan?.id === card.membership_plan)
      return `${plan?.account?.plan_name} ${card.id}`
    })

    const loyaltyCardFromSelectedDropdownValue = getLoyaltyCardsResponse.find(card => card.id === getLoyaltyCardIdFromDropdownString(selectedDropdownValue)) || null

    return (
      <>
        <h1 className='font-heading-4 mb-[10px]'>Wallet</h1>
        {/* @ts-expect-error - TODO: Fix this wierd typing error */}
        <CustomerWallet loyaltyCards={getLoyaltyCardsResponse} paymentCards={getPaymentCardsResponse} userPlans={userPlans} />
        <h1 className='font-heading-4'>Transactions</h1>
        <div className='h-[42px] w-[350px]'>
          <Dropdown
            displayValue={selectedDropdownValue || 'Select Loyalty Card'}
            displayValues={dropdownValues}
            onChangeDisplayValue={setPlanFromDropdownString}
            renderFn={renderDropdownPlan}
            hasShadow
          />
        </div>
        <CustomerTableContainer
          selectedPlan={selectedPlan}
          loyaltyCard={loyaltyCardFromSelectedDropdownValue}
          entity='transactions'
          tableHeaders={['REWARD', 'DATE', 'DETAILS', 'AMOUNT', 'CHANGE']}
        />
        <h1 className='font-heading-4'>Vouchers</h1>
        <CustomerTableContainer
          selectedPlan={selectedPlan}
          loyaltyCard={loyaltyCardFromSelectedDropdownValue}
          entity='vouchers'
          tableHeaders={['TYPE', 'CODE', 'ISSUED', 'EXPIRES', 'STATE']}
        />
      </>
    )
  }

  return <div />
}

export default CustomerWalletsContainer
