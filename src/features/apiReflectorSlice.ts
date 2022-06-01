import {createSlice} from '@reduxjs/toolkit'
import {RootState} from 'app/store'

export const apiReflectorSlice = createSlice({
  name: 'apiReflector',
  initialState: {
    useApiReflector: false,
  },
  reducers: {
    toggleUseApiReflector: (state) => {
      state.useApiReflector = !state.useApiReflector
    },
  },
})

export const {toggleUseApiReflector} = apiReflectorSlice.actions

export const getUseApiReflector = (state: RootState) => state.apiReflector.useApiReflector
export default apiReflectorSlice.reducer
