import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {RootState} from 'app/store'

type CustomerWallet = {
  jwtToken: string,
  activeUserId: string | number,
}

const initialState: CustomerWallet = {
  jwtToken: null,
  activeUserId: null,
}

export const customerWalletSlice = createSlice({
  name: 'customerWallet',
  initialState,
  reducers: {
    setJwtToken: (state, action: PayloadAction<string>) => {
      state.jwtToken = action.payload
    },
    setActiveUserId: (state, action: PayloadAction<string | number>) => {
      state.activeUserId = action.payload
    },
    reset: () => initialState,
  },
})

export const {setJwtToken, setActiveUserId, reset} = customerWalletSlice.actions
export const getJwtToken = (state: RootState) => state.customerWallet.jwtToken
export const getActiveUserId = (state: RootState) => state.customerWallet.activeUserId
export default customerWalletSlice.reducer
