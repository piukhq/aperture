import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {RootState} from 'app/store'
import {DirectoryMerchant} from 'types'

const initialState: DirectoryMerchant = {
  merchant_metadata: {
    name: null,
    icon_url: null,
    location_label: null,
  },
  merchant_ref: null,
  merchant_counts: null,
}

export const directoryMerchantSlice = createSlice({
  name: 'directoryMerchant',
  initialState,
  reducers: {
    setSelectedDirectoryMerchant: (state, action: PayloadAction<DirectoryMerchant>) => {
      const {merchant_ref, merchant_metadata, merchant_counts} = action.payload
      state.merchant_ref = merchant_ref
      state.merchant_metadata = merchant_metadata
      state.merchant_counts = merchant_counts
    },

    reset: () => initialState,
  },
})

export const {setSelectedDirectoryMerchant, reset} = directoryMerchantSlice.actions

export const getSelectedDirectoryMerchant = (state: RootState) => state.directoryMerchant
export default directoryMerchantSlice.reducer
