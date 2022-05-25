import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {RootState} from 'app/store'
import {PaymentSchemeName} from 'utils/enums'
import {DirectoryIdentifier, DirectoryLocation, DirectoryMerchant, DirectoryMid, DirectorySecondaryMid} from 'types'

const initialState = {
  selectedEntity: null,
  selectedPaymentScheme: null,
  selectedMerchant: {
    merchant_metadata: {
      name: null,
      icon_url: null,
      location_label: null,
    },
    merchant_ref: null,
    merchant_counts: null,
  },
}

export const directoryMerchantSlice = createSlice({
  name: 'directoryMerchant',
  initialState,
  reducers: {
    setSelectedDirectoryMerchant: (state, action: PayloadAction<DirectoryMerchant>) => {
      const {merchant_ref, merchant_metadata, merchant_counts} = action.payload
      state.selectedMerchant.merchant_ref = merchant_ref
      state.selectedMerchant.merchant_metadata = merchant_metadata
      state.selectedMerchant.merchant_counts = merchant_counts
    },
    setSelectedDirectoryMerchantEntity: (state, action: PayloadAction<DirectoryMid | DirectoryIdentifier | DirectoryLocation | DirectorySecondaryMid>) => {
      state.selectedEntity = action.payload
    },
    setSelectedDirectoryMerchantPaymentScheme: (state, action: PayloadAction<PaymentSchemeName.VISA | PaymentSchemeName.MASTERCARD | PaymentSchemeName.AMEX >) => {
      state.selectedPaymentScheme = action.payload
    },
    reset: () => initialState,
  },
})

export const {setSelectedDirectoryMerchant, setSelectedDirectoryMerchantEntity, setSelectedDirectoryMerchantPaymentScheme, reset} = directoryMerchantSlice.actions

export const getSelectedDirectoryMerchant = (state: RootState) => state.directoryMerchant.selectedMerchant
export const getSelectedDirectoryMerchantEntity = (state: RootState) => state.directoryMerchant.selectedEntity
export const getSelectedDirectoryMerchantPaymentScheme = (state: RootState) => state.directoryMerchant.selectedPaymentScheme
export default directoryMerchantSlice.reducer
