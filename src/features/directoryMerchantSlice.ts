import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {RootState} from 'app/store'
import {PaymentSchemeName} from 'utils/enums'
import {DirectoryMerchant, DirectoryEntity, DirectoryMerchantEntitySelectedItem} from 'types'

type DirectoryMerchantSliceState = {
  selectedEntity: DirectoryEntity | null
  selectedPaymentScheme: PaymentSchemeName | null
  selectedMerchant: DirectoryMerchant | null
  selectedEntityCheckedSelection: DirectoryMerchantEntitySelectedItem[]
  selectedTableCheckedRows: boolean[]
  selectedTableCheckedRefs: string[]
  shouldRefreshEntityList: boolean,
  hasHarmoniaStatusUpdate: boolean,
}

const initialMerchantState = {
  merchant_metadata: {
    name: '',
    icon_url: '',
    location_label: '',
  },
  merchant_ref: '',
  merchant_counts: {
    locations: 0,
    payment_schemes: [],
  },
}
const initialState: DirectoryMerchantSliceState = {
  selectedEntity: null,
  selectedPaymentScheme: null,
  selectedMerchant: initialMerchantState,
  selectedEntityCheckedSelection: [],
  selectedTableCheckedRows: [],
  selectedTableCheckedRefs: [],
  shouldRefreshEntityList: false,
  hasHarmoniaStatusUpdate: false,
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
    setSelectedDirectoryEntityCheckedSelection: (state, action: PayloadAction<DirectoryMerchantEntitySelectedItem[]>) => {
      state.selectedEntityCheckedSelection = action.payload
    },
    setSelectedDirectoryTableCheckedRows: (state, action) => {
      state.selectedTableCheckedRows = action.payload
    },
    setSelectedDirectoryTableCheckedRefs: (state, action: PayloadAction<string[] | []>) => {
      state.selectedTableCheckedRefs = action.payload
    },
    setShouldRefreshEntityList: (state, action: PayloadAction<boolean>) => {
      state.shouldRefreshEntityList = action.payload
    },
    setHasHarmoniaStatusUpdate: (state, action: PayloadAction<boolean>) => {
      state.hasHarmoniaStatusUpdate = action.payload
    },
    resetSelectedDirectoryEntities: (state) => {
      state.selectedEntityCheckedSelection = []
      state.selectedTableCheckedRows = []
      state.selectedTableCheckedRefs = []
    },
    reset: () => initialState,
    resetMerchant: (state) => {
      state.selectedMerchant = initialMerchantState
    },
  },
})

export const {
  setSelectedDirectoryMerchant,
  setSelectedDirectoryMerchantEntity,
  setSelectedDirectoryMerchantPaymentScheme,
  setSelectedDirectoryEntityCheckedSelection,
  setSelectedDirectoryTableCheckedRows,
  setSelectedDirectoryTableCheckedRefs,
  resetSelectedDirectoryEntities,
  setShouldRefreshEntityList,
  setHasHarmoniaStatusUpdate,
  resetMerchant,
  reset,
} = directoryMerchantSlice.actions

export const getSelectedDirectoryMerchant = (state: RootState) => state.directoryMerchant.selectedMerchant
export const getSelectedDirectoryMerchantEntity = (state: RootState) => state.directoryMerchant.selectedEntity
export const getSelectedDirectoryMerchantPaymentScheme = (state: RootState) => state.directoryMerchant.selectedPaymentScheme
export const getSelectedDirectoryEntityCheckedSelection = (state: RootState) => state.directoryMerchant.selectedEntityCheckedSelection
export const getSelectedDirectoryTableCheckedRows = (state: RootState) => state.directoryMerchant.selectedTableCheckedRows
export const getSelectedDirectoryTableCheckedRefs = (state: RootState) => state.directoryMerchant.selectedTableCheckedRefs
export const getShouldRefreshEntityList = (state: RootState) => state.directoryMerchant.shouldRefreshEntityList
export const getHasHarmoniaStatusUpdate = (state: RootState) => state.directoryMerchant.hasHarmoniaStatusUpdate
export default directoryMerchantSlice.reducer
