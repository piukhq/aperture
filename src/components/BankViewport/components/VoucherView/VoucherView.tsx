import React from 'react'
import Image from 'next/image'
import {LoyaltyVoucherApi2} from 'types'
import {timeStampToDate} from 'utils/dateFormat'
import ArrowDownSvg from 'icons/svgs/arrow-down.svg'
import CloseSvg from 'icons/svgs/close.svg'
import InfoSvg from 'icons/svgs/info.svg'

type Props = {
  voucher : LoyaltyVoucherApi2
  imageUrl: string
  loyaltyPlanName: string
  onCloseFn: VoidFunction
}

const VoucherView = ({voucher, imageUrl, loyaltyPlanName, onCloseFn}: Props) => {
  const {reward_text: rewardText, expiry_date: expiryDate, voucher_code: voucherCode, body_text: bodyText, terms_and_conditions: termsAndConditons} = voucher
  return (
    <>
      <div className='flex w-full h-14 justify-between items-center text-lg border-b border-b-grey-200'>
        <button onClick={onCloseFn}><ArrowDownSvg className='w-6 rotate-90 scale-[200%] fill-blue/70 mt-5 ml-4' /></button>
        <h1 className='w-full p-2 rounded-t-2xl text-center'>{loyaltyPlanName} Voucher</h1>
        <button onClick={onCloseFn}><CloseSvg className='w-6 fill-blue/70 mr-4'/></button>
      </div>
      <section className='flex flex-col justify-center items-center p-4 mb-4 pt-6'>
        <Image src={imageUrl} alt='' width={100} height={100} className='shadow-md'/>
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
    </>
  )
}

export default VoucherView
