import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {RootState} from 'app/store'
import {SelectedPlanAssets, SelectedPlanAssetGroup, PlanImage} from 'types'

export type PlanAssets = {
  selectedPlanAssets: SelectedPlanAssets,
  selectedPlanAsset: PlanImage,
  selectedPlanAssetGroup: Array<Record<string, unknown>>,
}

const initialState: PlanAssets = {
  selectedPlanAssets: {dev: [], staging: []},
  selectedPlanAsset: null,
  selectedPlanAssetGroup: [],
}

export const planAssetsSlice = createSlice({
  name: 'planAssets',
  initialState,
  reducers: {
    setSelectedPlanAssets: (state, action: PayloadAction<SelectedPlanAssets>) => {
      state.selectedPlanAssets = action.payload
    },
    setSelectedPlanAsset: (state, action: PayloadAction<PlanImage>) => {
      state.selectedPlanAsset = action.payload
    },
    setSelectedPlanAssetGroup: (state, action: PayloadAction<SelectedPlanAssetGroup>) => {
      state.selectedPlanAssetGroup = action.payload
    },
  },
})

export const {setSelectedPlanAssets, setSelectedPlanAsset, setSelectedPlanAssetGroup} = planAssetsSlice.actions

export const getSelectedPlanAssets = (state: RootState) => state.planAssets.selectedPlanAssets
export const getSelectedPlanAsset = (state: RootState) => state.planAssets.selectedPlanAsset
export const getSelectedPlanAssetGroup = (state: RootState) => state.planAssets.selectedPlanAssetGroup
export default planAssetsSlice.reducer
