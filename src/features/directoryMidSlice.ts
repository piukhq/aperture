import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {RootState} from 'app/store'
import {PaymentSchemeNameType} from 'types'

const initialState = {
  midType: null,
}

export const directoryMidSlice = createSlice({
  name: 'directoryMid',
  initialState,
  reducers: {
    setSelectedDirectoryMidType: (state, action: PayloadAction<PaymentSchemeNameType>) => {
      state.midType = action.payload
    },
    reset: () => initialState,
  },
})

export const {setSelectedDirectoryMidType, reset} = directoryMidSlice.actions

export const getSelectedDirectoryMidType = (state: RootState) => state.directoryMid
export default directoryMidSlice.reducer
