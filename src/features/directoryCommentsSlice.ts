import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {RootState} from 'app/store'

type DirectoryCommentsState = {
  commentsModalHeader: string
  commentsRef: string
}

const initialState: DirectoryCommentsState = {
  commentsModalHeader: null,
  commentsRef: null,
}

export const directoryCommentsSlice = createSlice({
  name: 'directoryComments',
  initialState,
  reducers: {
    setModalHeader: (state, action: PayloadAction<string>) => {
      state.commentsModalHeader = action.payload
    },
    setCommentsRef: (state, action: PayloadAction<string>) => {
      state.commentsRef = action.payload
    },
    reset: () => initialState,
  },
})

export const {setModalHeader, setCommentsRef, reset} = directoryCommentsSlice.actions
export const getCommentsModalHeader = (state: RootState) => state.directoryComments.commentsModalHeader
export const getCommentsRef = (state: RootState) => state.directoryComments.commentsRef
export default directoryCommentsSlice.reducer
