import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {RootState} from 'app/store'
import {SelectedPlanImages, SelectedAssetGroup, SelectedAssetEnvironment, SelectedPlans} from 'types'

export type PlanAssets = {
  selectedPlanImages: SelectedPlanImages,
  selectedAssetEnvironment: SelectedAssetEnvironment,
  selectedAssetGroup: SelectedAssetGroup,
  selectedPlans: SelectedPlans,
}

const initialState: PlanAssets = {
  selectedPlanImages: {dev: [], staging: []}, // All images of a selected plan from the APIs
  selectedAssetEnvironment: null, // The ID of the asset selected in the Asset Grid
  selectedAssetGroup: {dev: null, staging: null}, // All assets matching the selected Asset's type and typeIndex with additional metadata across all available environments
  selectedPlans: {dev: null, staging: null, prod: null},
}

export const comparatorSlice = createSlice({
  name: 'comparator',
  initialState,
  reducers: {
    setSelectedPlanImages: (state, action: PayloadAction<SelectedPlanImages>) => {
      state.selectedPlanImages = action.payload
    },
    setSelectedAssetEnvironment: (state, action: PayloadAction<SelectedAssetEnvironment>) => {
      state.selectedAssetEnvironment = action.payload
    },
    setSelectedAssetGroup: (state, action: PayloadAction<SelectedAssetGroup>) => {
      state.selectedAssetGroup = action.payload
    },
    setSelectedPlans: (state, action: PayloadAction<SelectedPlans>) => {
      state.selectedPlans = action.payload
    },
  },
})

export const {setSelectedPlanImages, setSelectedAssetEnvironment, setSelectedAssetGroup, setSelectedPlans} = comparatorSlice.actions

export const getSelectedPlanImages = (state: RootState) => state.comparator.selectedPlanImages
export const getSelectedAssetEnvironment = (state: RootState) => state.comparator.selectedAssetEnvironment
export const getSelectedAssetGroup = (state: RootState) => state.comparator.selectedAssetGroup
export const getSelectedPlans = (state: RootState) => state.comparator.selectedPlans
export default comparatorSlice.reducer
