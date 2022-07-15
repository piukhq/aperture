import React, {useCallback, useState} from 'react'
import Image from 'next/image'
import {useCustomerWallet} from 'hooks/useCustomerWallet'
import Dropdown from 'components/Dropdown'
import TransactionsTableBody from './components/TransactionsTableBody'
import {Plan} from 'types'

type Props = {
  userPlans: Plan[]
}

const CustomerTransactions = ({userPlans}: Props) => {
  const [selectedPlan, setSelectedPlan] = useState(null)
  const {
    getLoyaltyCardsResponse,
    getPlansResponse,
  } = useCustomerWallet()

  const getLoyaltyCardTransactions = useCallback(() => {
    return getLoyaltyCardsResponse.find(card => card.membership_plan === selectedPlan.id)?.membership_transactions
  }, [getLoyaltyCardsResponse, selectedPlan])

  const renderTableHeaders = () => {
    const headers = ['REWARD', 'DATE', 'DETAILS', 'AMOUNT', 'CHANGE']
    return headers.map((header, index) => (
      <th key={header}
        data-testid='table-header'
        className={`px-[9px] font-table-header flex-col w-full ${index === 0 && 'pl-[28px] rounded-l-[10px]'} ${index === headers.length - 1 && 'rounded-r-[10px]'} `}
      >
        {header}
      </th>
    ))
  }

  const renderDropdownPlan = (plan: Plan) => {
    const {images} = plan
    const image = images.find(image => image.type === 3)

    const src = image?.url

    return (
      <div className='flex items-center ml-[5px]'>
        <div className='h-[24px] w-[24px] mr-[10px]'>
          {src && <Image src={src} height={24} width={24} alt='' />}
        </div>

        <p className='font-body text-sm tracking-[0.1px] text-grey-800 dark:text-grey-100'>{plan.account?.plan_name}</p>
      </div>
    )
  }

  return (
    <>
      <h1 className='font-heading-4 mb-[10px]'>Transactions</h1>
      {getLoyaltyCardsResponse && getPlansResponse && (
        <>
          <div className='mb-[30px] h-[42px] w-[280px]'>
            <Dropdown
              displayValue={selectedPlan || 'Select Plan'}
              displayValues={userPlans}
              onChangeDisplayValue={setSelectedPlan}
              renderFn={renderDropdownPlan}
              hasShadow
            />
          </div>


          <div className={'bg-white dark:bg-grey-850 min-h-[400px] min-w-[900px] overflow-x-auto shadow-md rounded-[20px] p-[20px]'}>
            <table className='w-full min-w-[200px] rounded-[10px] table-fixed'>
              <thead className='h-[40px] w-full text-left bg-grey-200 border-[20px] border-transparent'>
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

