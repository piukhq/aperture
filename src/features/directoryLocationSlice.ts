import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {RootState} from 'app/store'

type DirectoryLocationState = {
  locationLabel: string
}

const initialState: DirectoryLocationState = {
  locationLabel: '',
}

export const directoryLocationSlice = createSlice({
  name: 'directoryLocation',
  initialState,
  reducers: {
    setLocationLabel: (state, action: PayloadAction<string>) => {
      state.locationLabel = action.payload
    },
    reset: () => initialState,
  },
})

export const {setLocationLabel, reset} = directoryLocationSlice.actions
export const getLocationLabel = (state: RootState) => state.directoryLocation.locationLabel
export default directoryLocationSlice.reducer
