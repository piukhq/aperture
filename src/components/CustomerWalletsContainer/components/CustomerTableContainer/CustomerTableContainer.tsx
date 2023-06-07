import React, {useCallback, useEffect, useState} from 'react'
import Image from 'next/image'
import {useCustomerWallet} from 'hooks/useCustomerWallet'
import Dropdown from 'components/Dropdown'
import {LoyaltyTransaction, LoyaltyVoucher, Plan} from 'types'
import {capitaliseFirstLetter} from 'utils/stringFormat'
import {timeStampToDate} from 'utils/dateFormat'
import ArrowDownSvg from 'icons/svgs/arrow-down.svg'

type Props = {
  userPlans: Plan[]
  entity: string
  tableHeaders: string[]
}

const CustomerTableContainer = ({userPlans, entity, tableHeaders}: Props) => {
  const [selectedPlan, setSelectedPlan] = useState(null)
  const {
    getLoyaltyCardsResponse,
    getPlansResponse,
  } = useCustomerWallet()

  useEffect(() => {
    setSelectedPlan(null)
  }, [getLoyaltyCardsResponse, getPlansResponse])

  const getLoyaltyCardEntity = useCallback(() => {
    const loyaltyCard = getLoyaltyCardsResponse.find(card => card.membership_plan === selectedPlan?.id)
    const entityKey = entity === 'transactions' ? 'membership_transactions' : 'vouchers'
    if (loyaltyCard) {
      if (entity === 'vouchers') {
        // sort loyalty vouchers by state, with the order of issued, redeemed, cancelled and expired
        const vouchers = [...loyaltyCard[entityKey]] as LoyaltyVoucher[]
        const sortedVouchers = vouchers.sort((a, b) => {
          const stateOrder = ['issued', 'redeemed', 'cancelled', 'expired', 'inprogress']
          return stateOrder.indexOf(a.state) - stateOrder.indexOf(b.state)
        })
        return sortedVouchers
      }
      return loyaltyCard[entityKey]
    }
  }, [entity, getLoyaltyCardsResponse, selectedPlan?.id])

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

  const renderDropdownPlan = (plan: Plan) => {
    const {images} = plan
    const image = images.find(image => image.type === 3)
    const src = image?.url

    return (
      <div className='flex items-center ml-[5px]'>
        <div className='h-[24px] w-[24px] mr-[10px]'>
          {src && <Image src={src} height={24} width={24} alt='' />}
        </div>
        <p className='font-body text-sm tracking[.006rem] text-grey-800 dark:text-grey-100'>{plan.account?.plan_name}</p>
      </div>
    )
  }

  const renderTableBody = () => {
    const renderTransactionRow = (transaction: LoyaltyTransaction, transactionIndex: number) => {
      const isIceland = selectedPlan.slug === 'iceland-bonus-card'
      const {amounts, timestamp, description} = transaction
      const {value, currency} = amounts[0]

      const rewardCell = isIceland ? 'N/A' : `${value > 0 ? '+' : ''}${value} ${currency}`
      const detailsAmountCells = description.split('£')

      const getChangeCell = () => {
        if (value > 0) {
          return <ArrowDownSvg className={'rotate-180 fill-green'} />
        } else if (value < 0) {
          return <ArrowDownSvg className={'fill-red'}/>
        } else {
          return <ArrowDownSvg className={'rotate-90 fill-orange'}/>
        }
      }
      const getNullAmountCell = () => isIceland ? `£${Math.abs(value)}` : rewardCell

      const transactionRowArray = [
        rewardCell, // REWARD
        timeStampToDate(timestamp, true), //DATE
        detailsAmountCells[0], // DETAILS
        detailsAmountCells[1] ? `£${detailsAmountCells[1]}` : getNullAmountCell(), // AMOUNT
        getChangeCell(), // CHANGE
      ]

      return (
        <tr data-testid='transaction-row' key={transactionIndex} className='border-b-[20px] border-transparent'>
          {transactionRowArray.map((row, index) => <td key={index} className={`px-[9px] font-body-3 ${index === 0 && 'pl-[38px]'}`}>{row}</td>)}
        </tr>
      )
    }

    const renderVoucherRow = (voucher: LoyaltyVoucher, voucherIndex: number) => {
      console.log('voucher', voucher)
      const {burn, date_issued: dateIssued, expiry_date: expiryDate, state, code} = voucher
      const {prefix = '', suffix = '', type} = burn || {}

      if (state === 'inprogress') {
        return null
      }

      const renderVoucherState = () => {
        switch (state) {
          case 'redeemed': return <span className='text-blue dark:text-lightBlue'>Redeemed</span>
          case 'expired': return <span className='text-red'>Expired</span>
          case 'cancelled': return <span className='text-grey-700 dark:text-grey-500'>Cancelled</span>
          case 'issued': return <span className='text-green'>Issued</span>
          default: return null
        }
      }


      const voucherColumnArray = [
        `${prefix} ${suffix} ${type}`,
        code.toLocaleUpperCase(),
        dateIssued ? timeStampToDate(dateIssued, true) : '-',
        expiryDate ? timeStampToDate(expiryDate, true) : '-',
        renderVoucherState(),
      ]

      return (
        <tr data-testid='voucher-row' key={voucherIndex} className='border-b-[20px] border-transparent'>
          {voucherColumnArray.map((column, index) => (
            <td key={index} className={`px-[9px] font-body-3 ${index === 0 && 'pl-[38px]'}`}>{column}</td>
          ))}
        </tr>
      )
    }

    return getLoyaltyCardEntity().map((entityObject, index:number) => {
      return entity === 'transactions' ? renderTransactionRow(entityObject, index) : renderVoucherRow(entityObject, index)
    })
  }

  return (
    <section>
      <h1 className='font-heading-4 mb-[10px]'>{capitaliseFirstLetter(entity)}</h1>
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

          <div className='bg-white dark:bg-grey-850 min-h-[400px] min-w-[600px] overflow-x-auto shadow-sm rounded-[20px] p-[20px]'>
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
            {!selectedPlan && <p className='font-body-4 text-center'>Select a plan above to see {entity}</p>}
            {selectedPlan && getLoyaltyCardEntity()?.length === 0 && <p className='font-body-4 text-center'>There are no {entity} to view</p>}
          </div>
        </>
      )}
    </section>
  )
}

export default CustomerTableContainer
