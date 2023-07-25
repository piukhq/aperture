import React from 'react'
import {WalletApi2} from 'types'

type Props = {
  wallet: WalletApi2
}
const BankViewport = ({wallet}: Props) => {
  return (
    <>
      <h1 className='font-heading-4 mb-[10px]'>Bank Viewport</h1>
      <p className='font-body-3'>{JSON.stringify(wallet)}</p>
    </>
  )
}

export default BankViewport
