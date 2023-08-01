import React from 'react'
import Image from 'next/image'
import {LoyaltyCardApi2} from 'types'
import {timeStampToDate} from 'utils/dateFormat'
import localFont from 'next/font/local'

const lloyds = localFont({
  src: [
    {
      path: './fonts/lloyds_bank_jack_regular.ttf',
      weight: '400',
    },
    {
      path: './fonts/lloyds_bank_jack_bold.ttf',
      weight: '700',
    },
    {
      path: './fonts/lloyds_bank_jack_medium.ttf',
      weight: '500',
    },
    {
      path: './fonts/lloyds_bank_jack_light.ttf',
      weight: '300',
    },
  ],
  variable: '--font-lloyds',
})
type Props = {
  loyaltyCard: LoyaltyCardApi2
}

const BankViewport = ({loyaltyCard}: Props) => {
  const heroImageUrl = loyaltyCard?.images?.find((image) => image.type === 0)?.url || ''

  const dyanamicStyles = {
    text: {color: loyaltyCard?.card?.colour},
    background: {backgroundColor: loyaltyCard?.card?.colour},
  } // In-line style as Tailwind does not support dynamic styles
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
      <div className='border-2 border-grey-300 rounded flex flex-col w-full m-5 text-left'>
        <p style={dyanamicStyles.text} className={'text-sm font-medium border-b-grey-300 border-b border-dashed m-4 mb-2 pb-2'}>{headline}</p>
        <p className='font-medium text-grey-700 pl-4 my-1'>{prefix}{Number(targetValue) - Number(currentValue)} remaining</p>
        <div className='w-[90%] h-2 m-2 bg-grey-300 rounded-2xl ml-4'></div>
        <div className='flex justify-between w-full px-4 pt-2 pb-4 text-sm'>
          <span>You&apos;ve spent: <strong>{prefix}{currentValue}</strong></span>
          <span>Your target: <strong>£200</strong></span>
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
          return <p>Expires: {timeStampToDate(voucher.expiry_date, {isShortMonthYear: true})}</p>
        default: return <p></p>
      }
    }

    if (vouchers.length === 0) {
      return <p className='font-body-3'>There are no vouchers to display</p>
    }

    return vouchers.map((voucher, index) => {
      const {state, reward_text: rewardText} = voucher

      return (
        <div key={index} className='border-2 border-grey-300 rounded flex flex-col p-4 mx-6'>
          <p style={dyanamicStyles.background} className='text-white text-sm font-medium w-max px-2 py-1 rounded'>{state.toLocaleUpperCase()}</p>
          <div className='flex items-center gap-4 border-b border-dashed border-grey-300 py-4'>
            {renderVoucherIcon(state)}
            <span style={dyanamicStyles.text} className='text-lg'>{rewardText}</span>
          </div>
          <div className='flex justify-between pt-4 text-sm'>
            <span>{renderDateDetails(voucher)}</span>
            <span>RightChev</span>
          </div>
        </div>
      )
    })
  }

  const renderTransactions = () => {
    const transactions = loyaltyCard.transactions
    if (transactions.length === 0) {
      return <p>There are no transactions to display</p>
    }
    return transactions.map((transaction) => {
      const {timestamp, description, amounts, id} = transaction
      const {value, prefix} = amounts[0]
      return (
        <div key={id} className='flex justify-between items-center border-t border-t-grey-400'>
          <div className=' flex flex-col py-3'>
            <p style={dyanamicStyles.text} className='text-sm font-bold'>{timeStampToDate(timestamp, {isShortMonthYear: true})}</p>
            <p className='capitalize'>{description}</p>
          </div>
          <span className='text-sm font-bold'>{prefix}{value}</span>
        </div>

      )
    })
  }

  return (
    <div className={`${lloyds.variable} font-lloyds text-grey-700 w-[400px] shadow-md rounded-2xl bg-white`}>
      <h1 className='text-xl border-b border-b-grey-200 text-center p-2 rounded-t-2xl'>{loyaltyPlanName}</h1>
      <>
        <div className='w-full px-[5rem] pt-8 pb-6 text-center flex flex-col gap-2'>
          <Image src={heroImageUrl} alt='Hero Image' width={400} height={200} className='rounded-2xl'/>
          <p className='uppercase'>{cardNumber}</p>
        </div>
        <div className='w-full text-center flex items-center justify-center mb-4'>
          {renderAccumalator()}
        </div>
        <div className='w-full px-4 mb-12 flex flex-col'>
          <div className='flex justify-between items-center mb-5'>
            <h2 className='text-xl font-light'>Your voucher(s)</h2>
            <span style={dyanamicStyles.text} className='text-lg'>See all</span>
          </div>
          {renderVouchers()}
        </div>
        <div className='w-full px-4 flex flex-col mb-2'>
          <h2 className='text-xl font-light mb-3'>Latest Transactions</h2>
          {renderTransactions()}
        </div>
      </>
    </div>
  )
}

export default BankViewport
