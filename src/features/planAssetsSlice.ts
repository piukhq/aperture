import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {RootState} from 'app/store'
import {SelectedPlanImages, SelectedAssetGroup, SelectedAssetEnvironment} from 'types'

export type PlanAssets = {
  selectedPlanImages: SelectedPlanImages,
  selectedAssetEnvironment: SelectedAssetEnvironment,
  selectedAssetGroup: SelectedAssetGroup,
}

const initialState: PlanAssets = {
  selectedPlanImages: {dev: [], staging: []}, // All images of a selected plan from the APIs
  selectedAssetEnvironment: null, // The ID of the asset selected in the Asset Grid
  selectedAssetGroup: {dev: null, staging: null}, // All assets matching the selected Asset's type and typeIndex with additional metadata across all available environments
}

export const planAssetsSlice = createSlice({
  name: 'planAssets',
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
  },
})

export const {setSelectedPlanImages, setSelectedAssetEnvironment, setSelectedAssetGroup} = planAssetsSlice.actions

export const getSelectedPlanImages = (state: RootState) => state.planAssets.selectedPlanImages
export const getSelectedAssetEnvironment = (state: RootState) => state.planAssets.selectedAssetEnvironment
export const getSelectedAssetGroup = (state: RootState) => state.planAssets.selectedAssetGroup
export default planAssetsSlice.reducer
