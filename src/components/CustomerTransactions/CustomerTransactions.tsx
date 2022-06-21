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
    // TODO: Refactor for Transactions AND Wallet to keep only the relevant plans for the user to reduce the number of plans to go through, probably via saving to redux?
  })

  useEffect(() => {
    getLoyaltyCardsResponse && getPlansResponse && setSelectedPlan(userPlans.find(plan => plan.account.plan_name === selectedPlanName))
  }, [getLoyaltyCardsResponse, getPlansResponse, selectedPlanName, userPlans])

  const getLoyaltyCardTransactions = useCallback(() => {
    return getLoyaltyCardsResponse.find(card => card.membership_plan === selectedPlan.id)?.membership_transactions
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
      {getLoyaltyCardsResponse && getPlansResponse && (
        <>
          <div className='mb-[30px] h-[42px] w-[280px]'>
            <Dropdown
              label=''
              displayValue={selectedPlanName}
              displayValues={userPlans.map(plan => plan.account.plan_name)}
              onChangeDisplayValue={setSelectedPlanName}
              hasShadow
              // TODO: Figure out a way of allowing the values to contain an icon as well as value.
            />
          </div>

          <div className={'bg-white dark:bg-grey-850 min-h-[400px] min-w-[900px] shadow-md rounded-[20px] p-[20px]'}>
            <table className='w-full min-w-[200px] rounded-[10px] bg-white dark:bg-grey-825 table-fixed'>
              <thead className='h-[40px] w-full text-left bg-grey-200 px-[30px]'>
                <tr>
                  {renderTableHeaders()}
                </tr>
              </thead>
              {selectedPlan && <TransactionsTableBody transactions={getLoyaltyCardTransactions()} plan={selectedPlan} />}
            </table>
            {!selectedPlan && <p className='font-body-4 text-center'>Select a plan above to see transactions</p>}
            {selectedPlan && getLoyaltyCardTransactions().length === 0 && <p className='font-body-4 text-center'>There are no transactions to view</p>}
          </div>
        </>
      )}
    </>
  )
}

export default CustomerTransactions

