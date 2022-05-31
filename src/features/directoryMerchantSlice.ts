import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {RootState} from 'app/store'
import {PaymentSchemeName} from 'utils/enums'
import {DirectoryMerchant, DirectoryEntity} from 'types'

type DirectoryMerchantSliceState = {
  selectedEntity: DirectoryEntity | null
  selectedPaymentScheme: PaymentSchemeName | null
  selectedMerchant: DirectoryMerchant | null
}
const initialState: DirectoryMerchantSliceState = {
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
      state.selectedMerchant = {...action.payload}
    },
    setSelectedDirectoryMerchantEntity: (state, action: PayloadAction<DirectoryEntity>) => {
      state.selectedEntity = action.payload // TODO: Idea to transform each entity type into a generic object that can be used without needing translation of the different types
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
