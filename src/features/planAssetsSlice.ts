import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {RootState} from 'app/store'
import {SelectedPlanAssets, PlanImage} from 'types'

export type PlanAssets = {
  selectedPlanAssets: SelectedPlanAssets,
  selectedPlanAsset: PlanImage,
}

const initialState: PlanAssets = {
  selectedPlanAssets: {dev: [], staging: []},
  selectedPlanAsset: null,
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
  },
})

export const {setSelectedPlanAssets, setSelectedPlanAsset} = planAssetsSlice.actions

export const getSelectedPlanAssets = (state: RootState) => state.planAssets.selectedPlanAssets
export const getSelectedPlanAsset = (state: RootState) => state.planAssets.selectedPlanAsset
export default planAssetsSlice.reducer
