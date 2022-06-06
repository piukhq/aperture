import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {RootState} from 'app/store'

type CustomerWallet = {
  jwtToken: string,
}

const initialState: CustomerWallet = {
  jwtToken: null,
}

export const customerWalletSlice = createSlice({
  name: 'customerWallet',
  initialState,
  reducers: {
    setSelectedJwtToken: (state, action: PayloadAction<string>) => {
      state.jwtToken = action.payload
    },
    reset: () => initialState,
  },
})

export const {setSelectedJwtToken, reset} = customerWalletSlice.actions

export const getSelectedCustomerWallet = (state: RootState) => state
export default customerWalletSlice.reducer
