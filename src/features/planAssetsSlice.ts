import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {RootState} from 'app/store'
import {SelectedPlanAssets} from 'types'

export type PlanAssets = {
  selectedPlanAssets: SelectedPlanAssets
}

const initialState: PlanAssets = {selectedPlanAssets: {dev: [], staging: []}}

export const planAssetsSlice = createSlice({
  name: 'planAssets',
  initialState,
  reducers: {
    setSelectedPlanAssets: (state, action: PayloadAction<SelectedPlanAssets>) => {
      state.selectedPlanAssets = action.payload
    },
  },
})

export const {setSelectedPlanAssets} = planAssetsSlice.actions
export const getSelectedPlanAssets = (state: RootState) => state.planAssets.selectedPlanAssets
export default planAssetsSlice.reducer
