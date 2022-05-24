import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {RootState} from 'app/store'
import {PaymentSchemeNameType} from 'types'

const initialState = {
  selectedPaymentScheme: null,
  selectedMid: null,
}

export const directoryMidSlice = createSlice({
  name: 'directoryMid',
  initialState,
  reducers: {
    setSelectedDirectoryMidPaymentScheme: (state, action: PayloadAction<PaymentSchemeNameType>) => { // Sets the requested mid payment scheme for a new MID
      state.selectedPaymentScheme = action.payload
    },
    setSelectedDirectoryMid: (state, action) => {
      state.selectedMid = action.payload
    },
    reset: () => initialState,
  },
})

export const {setSelectedDirectoryMidPaymentScheme, setSelectedDirectoryMid, reset} = directoryMidSlice.actions

export const getSelectedDirectoryMidPaymentScheme = (state: RootState) => state.directoryMid.selectedPaymentScheme
export const getSelectedDirectoryMid = (state: RootState) => state.directoryMid.selectedMid
export default directoryMidSlice.reducer
