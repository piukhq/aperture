import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {RootState} from 'app/store'

export type ModalState = {
  modalRequested: string
}

const initialState: ModalState = {modalRequested: 'NO_MODAL'}

export const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    requestModal: (state, action: PayloadAction<string>) => {
      state.modalRequested = action.payload
    },
  },
})

export const {requestModal} = modalSlice.actions
export const selectModal = (state: RootState) => state.modal.modalRequested
export default modalSlice.reducer
