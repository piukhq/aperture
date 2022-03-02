import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {RootState} from 'app/store'
import {PlanAssetsType} from 'types'

export type PlanAssets = {
  selectedPlanAssets: PlanAssetsType
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
