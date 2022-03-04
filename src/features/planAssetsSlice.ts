import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {RootState} from 'app/store'
import {SelectedPlanAssets, SelectedAssetGroup, SelectedAssetId} from 'types'

export type PlanAssets = {
  selectedPlanAssets: SelectedPlanAssets,
  selectedAssetId: SelectedAssetId,
  selectedAssetGroup: SelectedAssetGroup,
}

const initialState: PlanAssets = {
  selectedPlanAssets: {dev: [], staging: []}, // All images of a selected plan from the APIs
  selectedAssetId: null, // The ID of the asset selected in the Asset Grid
  selectedAssetGroup: {dev: null, staging: null}, // All assets matching the selected Asset's type and typeIndex with additional metadata across all available environments
}

export const planAssetsSlice = createSlice({
  name: 'planAssets',
  initialState,
  reducers: {
    setSelectedPlanAssets: (state, action: PayloadAction<SelectedPlanAssets>) => {
      state.selectedPlanAssets = action.payload
    },
    setSelectedAssetId: (state, action: PayloadAction<SelectedAssetId>) => {
      state.selectedAssetId = action.payload
    },
    setSelectedAssetGroup: (state, action: PayloadAction<SelectedAssetGroup>) => {
      state.selectedAssetGroup = action.payload
    },
  },
})

export const {setSelectedPlanAssets, setSelectedAssetId, setSelectedAssetGroup} = planAssetsSlice.actions

export const getSelectedPlanAssets = (state: RootState) => state.planAssets.selectedPlanAssets
export const getSelectedAssetId = (state: RootState) => state.planAssets.selectedAssetId
export const getSelectedAssetGroup = (state: RootState) => state.planAssets.selectedAssetGroup
export default planAssetsSlice.reducer
