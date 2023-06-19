import React, {useCallback} from 'react'
import VoucherTableRow from './components/VoucherTableRow'
import TransactionTableRow from './components/TransactionTableRow'
import {LoyaltyCard, LoyaltyVoucher, Plan} from 'types'

type Props = {
  selectedPlan: Plan
  loyaltyCard: LoyaltyCard
  entity: string
  tableHeaders: string[]
}

const CustomerTableContainer = ({selectedPlan, loyaltyCard, entity, tableHeaders}: Props) => {
  const getLoyaltyCardEntity = useCallback(() => {
    const entityKey = entity === 'transactions' ? 'membership_transactions' : 'vouchers'
    if (loyaltyCard) {
      if (entity === 'vouchers' && loyaltyCard[entityKey]) {
        // sort loyalty vouchers by state, with the order of issued, redeemed, cancelled, expired and inprogress
        const vouchers = [...loyaltyCard[entityKey]] as LoyaltyVoucher[]
        const sortedVouchers = vouchers.sort((a, b) => {
          const stateOrder = ['issued', 'redeemed', 'cancelled', 'expired', 'inprogress']
          return stateOrder.indexOf(a.state) - stateOrder.indexOf(b.state)
        })
        return sortedVouchers.filter(voucher => voucher.state !== 'inprogress')
      }
      return loyaltyCard[entityKey]
    }
  }, [entity, loyaltyCard])

  const renderTableHeaders = (headers: string[]) => {
    return headers.map((header, index) => (
      <th key={header}
        data-testid='table-header'
        className={`px-[9px] font-table-header flex-col w-full ${index === 0 && 'pl-[28px] rounded-l-[10px]'} ${index === headers.length - 1 && 'rounded-r-[10px]'} `}
      >
        {header}
      </th>
    ))
  }

  const renderTableBody = () => {
    return getLoyaltyCardEntity().map((entityObject, index:number) => {
      return entity === 'transactions' ? <TransactionTableRow key={index} transaction={entityObject} isIceland={selectedPlan.slug === 'iceland-bonus-card'}/> : <VoucherTableRow key={index} voucher={entityObject} />
    })
  }

  return (
    <section className='bg-white dark:bg-grey-850 min-h-[400px] min-w-[600px] overflow-x-auto shadow-sm rounded-[20px] p-[20px]'>
      <table className='w-full min-w-[200px] rounded-[10px] table-fixed'>
        <thead className='h-[40px] w-full text-left bg-grey-200 border-[20px] border-transparent'>
          <tr>
            {renderTableHeaders(tableHeaders)}
          </tr>
        </thead>
        {selectedPlan && getLoyaltyCardEntity()?.length > 0 && (
          <tbody>
            {renderTableBody()}
          </tbody>
        )}
      </table>
      {!selectedPlan && <p className='font-body-4 text-center'>Select a loyalty card above to see {entity}</p>}
      {selectedPlan && (!getLoyaltyCardEntity() || getLoyaltyCardEntity()?.length === 0) && <p className='font-body-4 text-center'>There are no {entity} to view</p>}
    </section>
  )
}

export default CustomerTableContainer
