import React from 'react'
import Image from 'next/image'
import {LoyaltyCardApi2} from 'types'
import {timeStampToDate} from 'utils/dateFormat'

type Props = {
  loyaltyCard: LoyaltyCardApi2
}

const BankViewport = ({loyaltyCard}: Props) => {
  const heroImageUrl = loyaltyCard?.images?.find((image) => image.type === 0)?.url || ''

  const {
    loyalty_plan_name: loyaltyPlanName,
    card,
  } = loyaltyCard

  const {card_number: cardNumber} = card

  const inProgressVoucher = loyaltyCard.vouchers.find((voucher) => voucher.state === 'inprogress')


  const renderAccumalator = () => {
    if (!inProgressVoucher) {
      return <p className='font-body-3'>There are no in-progress vouchers to display</p>
    }
    const {
      headline,
      prefix,
      current_value: currentValue,
      target_value: targetValue,
    } = inProgressVoucher
    return (
      <div className='border border-grey-400 w-4/5 flex flex-col p-2 m-4'>
        <p className='text-grey-800 border-b-grey-300 border-b w-4/5'>{headline}</p>
        <p className='text-grey-800'>{prefix}{Number(targetValue) - Number(currentValue)} remaining</p>
        <div className='w-[90%] h-2 m-2 bg-grey-300 rounded-2xl ml-4'></div>
        <div className='flex justify-between w-full'>
          <span className='text-grey-800'>You&apos;ve spent {prefix}{currentValue}</span>
          <span className='text-grey-800'>Your target: £200</span>
        </div>
      </div>
    )
  }

  const renderVouchers = () => {
    const vouchers = loyaltyCard.vouchers.filter((voucher) => voucher.state !== 'inprogress')

    const renderVoucherIcon = (state: string) => {
      switch (state) {
        case 'issued':
          return <p>IS</p>
        default: return <p>ICON</p>
      }
    }

    const renderDateDetails = (voucher) => {
      switch (voucher.state) {
        case 'issued':
          return <p>Expires: {timeStampToDate(voucher.expiry_date, true)}</p>
        default: return <p>ICON</p>
      }
    }

    if (vouchers.length === 0) {
      return <p className='font-body-3'>There are no vouchers to display</p>
    }

    return vouchers.map((voucher, index) => {
      const {state, reward_text: rewardText} = voucher


      return (
        <div key={index} className='border border-grey-400 w-4/5 flex flex-col p-4 m-4'>
          <p className='bg-green text-white font-body-3 w-max px-2 py-1 rounded-lg'>{state.toLocaleUpperCase()}</p>
          <div className='flex gap-2 border-b border-dashed border-grey-300 pb-6 pt-6'>
            {renderVoucherIcon(state)}
            <span>{rewardText}</span>
          </div>
          <div className='flex justify-between pt-4'>
            <span>{renderDateDetails(voucher)}</span>
            <span>RightChev</span>
          </div>
        </div>
      )
    })
  }

  const renderTransactions = () => {
    const transactions = loyaltyCard.transactions

    console.log(transactions)
    if (transactions.length === 0) {
      return <p className='font-body-3'>There are no transactions to display</p>
    }

    return transactions.map((transaction, index) => {


      const {timestamp, description, amounts} = transaction
      const {value, prefix} = amounts[0]
      return (
        <div key={index} className='border-t border-t-grey-400 w-4/5 flex flex-col p-4 m-2'>
          <p>{timeStampToDate(timestamp, true)}</p>
          <p className='capitalize'>{description} - {prefix}{value}</p>
        </div>

      )
    })
  }


  return (
    <div className='w-[400px] shadow-md rounded-2xl'>
      <h1 className='font-heading-5 border-b border-b-grey-300 bg-white text-center p-2 rounded-t-2xl'>{loyaltyPlanName}</h1>
      <div className='w-full bg-white p-16 text-center flex flex-col gap-2'>
        <Image src={heroImageUrl} alt='Hero Image' width={400} height={200} className='rounded-2xl shadow-md'/>
        <p className='uppercase text-grey-800'>{cardNumber}</p>
      </div>

      <div className='w-full bg-white text-center flex items-center justify-center'>
        {renderAccumalator()}
      </div>
      <div className='w-full bg-white p-2 flex flex-col gap-4'>
        <div className='flex justify-between items-center'>
          <h2 className='font-heading-5 '>Your voucher(s)</h2>
          <span className='text-grey-800'>See all</span>

        </div>
        {renderVouchers()}
      </div>
      <div className='w-full bg-white p-2 flex flex-col gap-4'>
        <h2 className='font-heading-5 '>Latest Transactions</h2>
        {renderTransactions()}
      </div>
    </div>
  )
}

export default BankViewport
