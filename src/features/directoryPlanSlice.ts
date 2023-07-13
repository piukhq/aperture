import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {RootState} from 'app/store'
import {DirectoryPlan} from 'types'

const initialState: DirectoryPlan = {
  plan_metadata: {
    name: '',
    icon_url: '',
    slug: '',
    plan_id: null,
  },
  plan_ref: '',
  plan_counts: null,
  total_mid_count: null,
}

export const directoryPlanSlice = createSlice({
  name: 'directoryPlan',
  initialState,
  reducers: {
    setSelectedDirectoryPlan: (state, action: PayloadAction<DirectoryPlan>) => {
      const {plan_ref, plan_metadata, plan_counts, total_mid_count} = action.payload
      state.plan_ref = plan_ref
      state.plan_metadata = plan_metadata
      state.plan_counts = plan_counts
      state.total_mid_count = total_mid_count
    },
    reset: () => initialState,
  },
})

export const {setSelectedDirectoryPlan, reset} = directoryPlanSlice.actions

export const getSelectedDirectoryPlan = (state: RootState) => state.directoryPlan
export default directoryPlanSlice.reducer
