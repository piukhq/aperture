import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {RootState} from 'app/store'
import {PaymentSchemeName} from 'utils/enums'
import {DirectoryMerchant, DirectoryEntity, DirectoryMerchantEntityDeletionItem} from 'types'

type DirectoryMerchantSliceState = {
  selectedEntity: DirectoryEntity | null
  selectedPaymentScheme: PaymentSchemeName | null
  selectedMerchant: DirectoryMerchant | null
  selectedEntityCheckedSelection: DirectoryMerchantEntityDeletionItem[]
  selectedTableCheckedRows: boolean[]
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
  selectedEntityCheckedSelection: [],
  selectedTableCheckedRows: [],
}

export const directoryMerchantSlice = createSlice({
  name: 'directoryMerchant',
  initialState,
  reducers: {
    setSelectedDirectoryMerchant: (state, action: PayloadAction<DirectoryMerchant>) => {
      state.selectedMerchant = {...action.payload}
    },
    setSelectedDirectoryMerchantEntity: (state, action: PayloadAction<DirectoryEntity>) => {
      state.selectedEntity = action.payload
    },
    setSelectedDirectoryMerchantPaymentScheme: (state, action: PayloadAction<PaymentSchemeName.VISA | PaymentSchemeName.MASTERCARD | PaymentSchemeName.AMEX >) => {
      state.selectedPaymentScheme = action.payload
    },
    setSelectedDirectoryEntityCheckedSelection: (state, action) => {
      state.selectedEntityCheckedSelection = action.payload
    },
    setSelectedDirectoryTableCheckedRows: (state, action) => { //
      state.selectedTableCheckedRows = action.payload
    },
    reset: () => initialState,
  },
})

export const {
  setSelectedDirectoryMerchant,
  setSelectedDirectoryMerchantEntity,
  setSelectedDirectoryMerchantPaymentScheme,
  setSelectedDirectoryEntityCheckedSelection,
  setSelectedDirectoryTableCheckedRows,
  reset,
} = directoryMerchantSlice.actions

export const getSelectedDirectoryMerchant = (state: RootState) => state.directoryMerchant.selectedMerchant
export const getSelectedDirectoryMerchantEntity = (state: RootState) => state.directoryMerchant.selectedEntity
export const getSelectedDirectoryMerchantPaymentScheme = (state: RootState) => state.directoryMerchant.selectedPaymentScheme
export const getSelectedDirectoryEntityCheckedSelection = (state: RootState) => state.directoryMerchant.selectedEntityCheckedSelection
export const getSelectedDirectoryTableCheckedRows = (state: RootState) => state.directoryMerchant.selectedTableCheckedRows
export default directoryMerchantSlice.reducer
