import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {RootState} from 'app/store'
import {CommentsSubjectTypes} from 'utils/enums'

type DirectoryCommentsState = {
  commentsModalHeader: string
  commentsRef: string
  commentsSubjectType: CommentsSubjectTypes | null
}

const initialState: DirectoryCommentsState = {
  commentsModalHeader: null,
  commentsRef: null,
  commentsSubjectType: null,
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
    setCommentsSubjectType: (state, action: PayloadAction<CommentsSubjectTypes>) => {
      state.commentsSubjectType = action.payload
    },
    reset: () => initialState,
  },
})

export const {setModalHeader, setCommentsRef, setCommentsSubjectType, reset} = directoryCommentsSlice.actions
export const getCommentsModalHeader = (state: RootState) => state.directoryComments.commentsModalHeader
export const getCommentsRef = (state: RootState) => state.directoryComments.commentsRef
export const getCommentsSubjectType = (state: RootState) => state.directoryComments.commentsSubjectType
export default directoryCommentsSlice.reducer
