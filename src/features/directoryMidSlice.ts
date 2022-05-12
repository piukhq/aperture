import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {RootState} from 'app/store'
import {PaymentSchemeNameType} from 'types'

const initialState = {
  selectedPaymentScheme: null,
}

export const directoryMidSlice = createSlice({
  name: 'directoryMid',
  initialState,
  reducers: {
    setSelectedDirectoryMidPaymentScheme: (state, action: PayloadAction<PaymentSchemeNameType>) => { // Sets the requested mid payment scheme for a new MID
      state.selectedPaymentScheme = action.payload
    },
    // TODO: Add setSelectedDirectoryMid for selecting an existing MID
    reset: () => initialState,
  },
})

export const {setSelectedDirectoryMidPaymentScheme, reset} = directoryMidSlice.actions

export const getSelectedDirectoryMidPaymentScheme = (state: RootState) => state.directoryMid
export default directoryMidSlice.reducer
