import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {RootState} from 'app/store'

export type PlanAssetsType = any // TODO: Fix this

export type PlanAssets = {
  selectedPlanAssets: Array<Record<string, unknown>>
}

const initialState: PlanAssets = {selectedPlanAssets: null}

export const planAssetsSlice = createSlice({
  name: 'planAssets',
  initialState,
  reducers: {
    setSelectedPlanAssets: (state, action: PayloadAction<PlanAssetsType>) => {
      state.selectedPlanAssets = action.payload
    },
  },
})

export const {setSelectedPlanAssets} = planAssetsSlice.actions
export const getSelectedPlanAssets = (state: RootState) => state.planAssets.selectedPlanAssets
export default planAssetsSlice.reducer
