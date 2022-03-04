import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {RootState} from 'app/store'
import {SelectedPlanImages, SelectedAssetGroup, SelectedAssetId} from 'types'

export type PlanAssets = {
  selectedPlanImages: SelectedPlanImages,
  selectedAssetId: SelectedAssetId,
  selectedAssetGroup: SelectedAssetGroup,
}

const initialState: PlanAssets = {
  selectedPlanImages: {dev: [], staging: []}, // All images of a selected plan from the APIs
  selectedAssetId: null, // The ID of the asset selected in the Asset Grid
  selectedAssetGroup: {dev: null, staging: null}, // All assets matching the selected Asset's type and typeIndex with additional metadata across all available environments
}

export const planAssetsSlice = createSlice({
  name: 'planAssets',
  initialState,
  reducers: {
    setSelectedPlanImages: (state, action: PayloadAction<SelectedPlanImages>) => {
      state.selectedPlanImages = action.payload
    },
    setSelectedAssetId: (state, action: PayloadAction<SelectedAssetId>) => {
      state.selectedAssetId = action.payload
    },
    setSelectedAssetGroup: (state, action: PayloadAction<SelectedAssetGroup>) => {
      state.selectedAssetGroup = action.payload
    },
  },
})

export const {setSelectedPlanImages, setSelectedAssetId, setSelectedAssetGroup} = planAssetsSlice.actions

export const getSelectedPlanImages = (state: RootState) => state.planAssets.selectedPlanImages
export const getSelectedAssetId = (state: RootState) => state.planAssets.selectedAssetId
export const getSelectedAssetGroup = (state: RootState) => state.planAssets.selectedAssetGroup
export default planAssetsSlice.reducer
