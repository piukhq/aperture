import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {RootState} from 'app/store'

type CustomerWallet = {
  jwtToken: string,
  loyaltyCards: any, // TODO Temporary any
  paymentCards: any, // TODO Temporary any
}

const initialState: CustomerWallet = {
  jwtToken: null,
  loyaltyCards: [],
  paymentCards: [],
}

export const customerWalletSlice = createSlice({
  name: 'customerWallet',
  initialState,
  reducers: {
    setJwtToken: (state, action: PayloadAction<string>) => {
      state.jwtToken = action.payload
    },
    setLoyaltyCards: (state, action) => {
      state.loyaltyCards = action.payload
    },
    setPaymentCards: (state, action) => {
      state.paymentCards = action.payload
    },
    reset: () => initialState,
  },
})

export const {setJwtToken, setLoyaltyCards, setPaymentCards, reset} = customerWalletSlice.actions

export const getCustomerWallet = (state: RootState) => state.customerWallet
export const getJwtToken = (state: RootState) => state.customerWallet.jwtToken
export const getLoyaltyCards = (state: RootState) => state.customerWallet.loyaltyCards
export const getPaymentCards = (state: RootState) => state.customerWallet.paymentCards
export default customerWalletSlice.reducer
