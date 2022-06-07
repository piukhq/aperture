import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {RootState} from 'app/store'

type CustomerWallet = {
  jwtToken: string,
  loyaltyCards: any, // TODO Temporary any
}

const initialState: CustomerWallet = {
  jwtToken: null,
  loyaltyCards: null,
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
    reset: () => initialState,
  },
})

export const {setJwtToken, setLoyaltyCards, reset} = customerWalletSlice.actions

export const getCustomerWallet = (state: RootState) => state.customerWallet
export const getJwtToken = (state: RootState) => state.customerWallet.jwtToken
export const getLoyaltyCards = (state: RootState) => state.customerWallet.loyaltyCards
export default customerWalletSlice.reducer
