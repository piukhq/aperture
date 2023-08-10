import React from 'react'
import Image from 'next/image'
import {LoyaltyCardApi2, LoyaltyVoucherApi2} from 'types'
import {timeStampToDate} from 'utils/dateFormat'
import localFont from 'next/font/local'
import LinkLloydsSvg from 'icons/svgs/link-lloyds.svg'
import InfoSvg from 'icons/svgs/info.svg'
import TicketSvg from 'icons/svgs/task.svg'
import ArrowDownSvg from 'icons/svgs/arrow-down.svg'
import CloseSvg from 'icons/svgs/close.svg'

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
  const [selectedVoucherIndex, setSelectedVoucherIndex] = React.useState<number | null>(null)

  const getAccumulatorPercentage = () => {
    const inProgressVoucher = loyaltyCard.vouchers.find((voucher) => voucher.state === 'inprogress')
    if (!inProgressVoucher) {
      return 0
    }
    const {
      current_value: currentValue,
      target_value: targetValue,
    } = inProgressVoucher
    return `${(Number(currentValue) / Number(targetValue)) * 100}%`
  }

  const dyanamicStyles = {
    progressBar: {width: getAccumulatorPercentage()},
  } // In-line style as these are generated at render time which tailwind does not support easily
  const {
    loyalty_plan_name: loyaltyPlanName,
    card,
  } = loyaltyCard

  const {card_number: cardNumber} = card
  const inProgressVoucher = loyaltyCard.vouchers.find((voucher) => voucher.state === 'inprogress')
  const isStampsVoucher = inProgressVoucher?.earn_type === 'stamps'

  const renderInProgressVoucher = () => {
    if (!inProgressVoucher) {
      return <p className='font-body-3'>There are no in-progress vouchers to display</p>
    }

    const renderAccumalatorProgress = () => (
      <>
        <p className='font-medium text-grey-700 pl-4 mt-1 mb-2'>{prefix}{Number(targetValue) - Number(currentValue)} remaining</p>
        <div className='w-[90%] bg-grey-300 rounded-full h-2 ml-4 mb-2'>
          <div style={dyanamicStyles.progressBar} className='bg-lloydsGreen h-2 rounded-full'></div>
        </div>
        <div className='flex justify-between w-full px-4 pt-2 pb-4 text-sm'>
          <span>You&apos;ve spent: <strong>{prefix}{currentValue}</strong></span>
          <span>Your target: <strong>{prefix}{targetValue}</strong></span>
        </div>
      </>
    )

    const renderStampsProgress = () => (
      <div className='mx-4'>
        <p className='text-lg'>{Number(targetValue) - Number(currentValue)} stamps to go until your reward</p>
        <div className='w-[90%] my-3'>
          <div className='flex gap-2'>
            {Array.from(Array(Number(targetValue)).keys()).map((index) => (
              <div
                key={index}
                className={`flex justify-center items-center w-6 h-6 rounded-full border-2 ${index < Number(currentValue) ? 'border-grey-700' : 'border-grey-300'}`}>
                <div className={`w-4 h-4 rounded-full ${index < Number(currentValue) ? 'bg-lloydsGreen' : 'bg-grey-30'}`}></div>
              </div>
            ))}
          </div>
        </div>
        <p className='text-sm mb-4'>collected: <strong>{currentValue}/{targetValue} stamps</strong></p>
      </div>
    )

    const {
      headline,
      prefix,
      current_value: currentValue,
      target_value: targetValue,
    } = inProgressVoucher
    return (
      <div className='border-2 border-grey-300 rounded flex flex-col w-full m-5 text-left'>
        <p className={'text-lloydsGreen text-sm font-bold border-b-grey-300 border-b border-dashed m-4 mb-2 pb-2'}>{headline}</p>
        {isStampsVoucher ? renderStampsProgress() : renderAccumalatorProgress()}
      </div>
    )
  }

  const renderVouchers = () => { // This code currently only supports one issued voucher, need to check for unique identifiers for multiple
    const issuedVouchers = loyaltyCard.vouchers.filter((voucher) => voucher.state === 'issued')
    const renderDateDetails = (voucher: LoyaltyVoucherApi2) => {
      switch (voucher.state) {
        case 'issued':
          return <p>Expires: {timeStampToDate(Number(voucher.expiry_date), {isShortMonthYear: true})}</p>
        default: return <p></p>
      }
    }

    if (issuedVouchers.length === 0) {
      return <p className='font-body-3'>There are no issued vouchers to display</p>
    }

    return issuedVouchers.map((voucher, index) => {
      const {state, reward_text: rewardText} = voucher
      return (
        <button key={index} onClick={() => setSelectedVoucherIndex(loyaltyCard.vouchers.findIndex(voucher => voucher.state === 'issued'))} className='border-2 border-grey-300 rounded flex flex-col p-4 mx-6 mb-8'>
          <p className='bg-lloydsGreen text-white text-sm font-medium w-max px-2 py-1 rounded'>{state.toLocaleUpperCase()}</p>
          <div className='flex items-center gap-4 border-b border-dashed border-grey-300 py-4'>
            <TicketSvg className='fill-lloydsGreen'/>
            <span className='text-lloydsGreen text-lg'>{rewardText}</span>
          </div>
          <div className='flex justify-between pt-4 text-sm items-center'>
            <span>{renderDateDetails(voucher)}</span>
            <ArrowDownSvg className='-rotate-90 fill-grey-500 mr-4' />
          </div>
        </button>
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
            <p className='text-lloydsGreen text-sm font-bold'>{timeStampToDate(timestamp, {isShortMonthYear: true})}</p>
            <p className='capitalize'>{description}</p>
          </div>
          <span className='text-sm font-bold'>{prefix}{value}</span>
        </div>
      )
    })
  }

  const renderAccumalatorHeroInfo = () => (
    <div className='bg-white flex justify-end items-center h-8 text-xs absolute right-0 top-3 px-2 rounded-l-xl shadow-md'>
      <span className='text-lloydsGreen mr-1'>{getAccumulatorPercentage()}</span>
      <span>full</span>
    </div>
  )

  const renderStampsHeroInfo = () => (
    <div className='bg-white flex justify-end items-center h-8 text-xs absolute right-0 top-3 px-2 rounded-l-xl shadow-md'>
      <span className='text-lloydsGreen mr-1'>{loyaltyCard.balance.current_value}/{loyaltyCard.balance.target_value}</span>
      <span>stamps</span>
    </div>
  )

  // Voucher View Screen
  if (selectedVoucherIndex !== null) {
    const voucherImageUrl = loyaltyCard.images.find((image) => image.type === 3)?.url || ''
    const selectedVoucher = loyaltyCard.vouchers[selectedVoucherIndex]
    const {reward_text: rewardText, expiry_date: expiryDate, voucher_code: voucherCode, body_text: bodyText, terms_and_conditions: termsAndConditons} = selectedVoucher

    return (
      <div className={`${lloyds.variable} font-lloyds text-grey-700 w-[400px] shadow-md rounded-2xl bg-white h-[800px]`}>
        <div className='flex w-full h-14 justify-between items-center text-lg border-b border-b-grey-200'>
          <button onClick={() => setSelectedVoucherIndex(null)}><ArrowDownSvg className='w-6 rotate-90 scale-[200%] fill-blue/70 mt-5 ml-4' /></button>
          <h1 className='w-full p-2 rounded-t-2xl text-center'>{loyaltyPlanName} Voucher</h1>
          <button onClick={() => setSelectedVoucherIndex(null)}><CloseSvg className='w-6 fill-blue/70 mr-4'/></button>
        </div>
        <section className='flex flex-col justify-center items-center p-4 mb-4 pt-6'>
          <Image src={voucherImageUrl} alt='' width={100} height={100} className='shadow-md'/>
          <p className='mt-2'>{rewardText}</p>
          <p className='text-blue'>Ready to be redeemed</p>
        </section>
        <section className='px-5 flex flex-col gap-2'>
          <div className='flex w-full gap-4 text-left mb-4'>
            <InfoSvg className='fill-blue/70 w-4 scale-[200%] rotate-180 mt-2'/>
            <p className='w-full'>{bodyText}</p>
          </div>
          <p>Voucher code: <span className='ml-1 font-medium'>{voucherCode}</span></p>
          <p>Voucher expires: <span className='ml-1 font-medium'>{ timeStampToDate(Number(expiryDate), {isShortMonthYear: true})}</span></p>
          <a href={termsAndConditons} target='_' className='mt-6 text-blue text-sm'>View retailer&apos;s terms and conditions</a>
        </section>
      </div>
    )
  }

  // Card Details View Screen
  return (
    <div className={`${lloyds.variable} font-lloyds text-grey-700 w-[400px] shadow-md rounded-2xl bg-white`}>
      <div className='flex w-full h-14 justify-between items-center text-lg border-b border-b-grey-200'>
        <h1 className='w-full p-2 rounded-t-2xl text-center'>{loyaltyPlanName} Voucher</h1>
      </div>
      {/* Hero Section */}
      <section className='w-full px-[5rem] pt-8 pb-6 text-center flex flex-col gap-2'>
        <div className='w-full relative'>
          {isStampsVoucher ? renderStampsHeroInfo() : renderAccumalatorHeroInfo()}
          <Image src={heroImageUrl} alt='Hero Image' width={400} height={200} className='rounded-xl'/>
        </div>
        <p className='uppercase'>{cardNumber}</p>
      </section>
      {/* Inprogress Voucher Section */}
      <section className='w-full text-center flex items-center justify-center mb-4'>
        {renderInProgressVoucher()}
      </section>
      {/* Big Buttons Section */}
      <div className='bg-grey-200 py-6 px-4 flex justify-between gap-4 mb-6 font-light text-sm leading-1'>
        <button className='flex flex-col border-2 border-grey-400 bg-white h-24 w-[50%] rounded-lg p-2 items-center gap-1'>
          <LinkLloydsSvg className='my-1 fill-lloydsGreen ' />
          <p className='px-6'>Your linked payment card(s)</p>
        </button> {/* TODO: Make button functional*/}
        <button className='flex flex-col border-2 border-grey-400 bg-white h-24 w-[50%] rounded-lg p-2 items-center gap-1'>
          <InfoSvg className='my-2 scale-150 text-orange fill-lloydsGreen  ' />
          <p className='px-2'>About this loyalty scheme</p>
        </button> {/* TODO: Make button functional*/}
      </div>
      {/* Vouchers Section */}
      <section className='w-full px-4 mb-6 flex flex-col'>
        <div className='flex justify-between items-center mb-5'>
          <h2 className='text-xl font-light'>Your voucher(s)</h2>
          <button className='text-lloydsGreen text-lg font-medium'>See all</button> {/* TODO: Make a button functional*/}
        </div>
        {renderVouchers()}
      </section>
      {/* Transactions Section */}
      <section className='w-full px-4 flex flex-col mb-6'>
        <h2 className='text-xl font-light mb-3'>Latest transactions</h2>
        {renderTransactions()}
      </section>
    </div>
  )
}

export default BankViewport
