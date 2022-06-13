import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {RootState} from 'app/store'
import {DecodedUserToken} from 'types'

type CustomerWallet = {
  jwtToken: string,
  decodedJwtToken: DecodedUserToken,
}

const initialState: CustomerWallet = {
  jwtToken: null,
  decodedJwtToken: null,
}

export const customerWalletSlice = createSlice({
  name: 'customerWallet',
  initialState,
  reducers: {
    setJwtToken: (state, action: PayloadAction<string>) => {
      state.jwtToken = action.payload
    },
    setDecodedJwtToken: (state, action: PayloadAction<DecodedUserToken>) => {
      state.decodedJwtToken = action.payload
    },
    reset: () => initialState,
  },
})

export const {setJwtToken, setDecodedJwtToken, reset} = customerWalletSlice.actions

export const getCustomerWallet = (state: RootState) => state.customerWallet
export const getJwtToken = (state: RootState) => state.customerWallet.jwtToken
export const getDecodedJwtToken = (state: RootState) => state.customerWallet.decodedJwtToken
export default customerWalletSlice.reducer
