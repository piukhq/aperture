import React, {useCallback, useEffect, useState} from 'react'
import {useCustomerWallet} from 'hooks/useCustomerWallet'
import Dropdown from 'components/Dropdown'
import TransactionsTableBody from './components/TransactionsTableBody'

const CustomerTransactions = () => {
  const [selectedPlanName, setSelectedPlanName] = useState('Select Plan')
  const [selectedPlan, setSelectedPlan] = useState(null)
  const {
    getLoyaltyCardsResponse,
    getPlansResponse,
  } = useCustomerWallet()


  const userPlans = getLoyaltyCardsResponse?.map(loyaltyCard => {
    return getPlansResponse?.find((plan) => plan.id === loyaltyCard.membership_plan)
  })

  useEffect(() => {
    selectedPlanName && setSelectedPlan(userPlans.find(plan => plan.account.plan_name === selectedPlanName))
  }, [selectedPlanName, userPlans])

  const getLoyaltyCardTransactions = useCallback(() => {
    return getLoyaltyCardsResponse.find(card => card.membership_plan === selectedPlan.id).membership_transactions
  }, [getLoyaltyCardsResponse, selectedPlan])

  const renderTableHeaders = () => {
    const headers = ['REWARD', 'DATE', 'DETAILS', 'AMOUNT', 'CHANGE']
    return headers.map((header, index) => (
      <th key={header}
        data-testid='table-header'
        className={`px-[9px] font-table-header flex-col w-full ${index === 0 && 'rounded-l-[10px]'} ${index === headers.length - 1 && 'rounded-r-[10px]'} `}
      >
        {header}
      </th>
    ))
  }

  return (
    <>
      <div className='mb-[30px]'>
        <Dropdown
          label=''
          displayValue={selectedPlanName}
          displayValues={userPlans.map(plan => plan.account.plan_name)}
          onChangeDisplayValue={setSelectedPlanName}
          hasShadow
        />
      </div>

      <div className={'bg-white dark:bg-grey-850 min-h-[400px] min-w-[900px] shadow-md rounded-[20px] p-[20px]'}>
        <table className='w-full min-w-[200px] rounded-[10px] bg-white dark:bg-grey-825 table-fixed'>
          <thead className='h-[40px] w-full text-left bg-grey-200 px-[30px]'>
            <tr>
              {renderTableHeaders()}
            </tr>
          </thead>
          {selectedPlan ? <TransactionsTableBody transactions={getLoyaltyCardTransactions()} /> : <p className='font-body-4 '>Select a plan above to see transactions</p>}
        </table>
      </div>
    </>
  )
}

export default CustomerTransactions

