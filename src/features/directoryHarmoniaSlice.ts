import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {RootState} from 'app/store'
import {HarmoniaActionTypes} from 'utils/enums'

type DirectoryHarmoniaState = {
  harmoniaActionType: HarmoniaActionTypes
}

const initialState: DirectoryHarmoniaState = {
  harmoniaActionType: null,

}

export const directoryHarmoniaSlice = createSlice({
  name: 'directoryHarmonia',
  initialState,
  reducers: {
    setHarmoniaActionType: (state, action: PayloadAction<HarmoniaActionTypes>) => {
      state.harmoniaActionType = action.payload
    },
    reset: () => initialState,
  },
})

export const {setHarmoniaActionType, reset} = directoryHarmoniaSlice.actions

export const getHarmoniaActionType = (state: RootState) => state.directoryHarmonia.harmoniaActionType
export default directoryHarmoniaSlice.reducer
