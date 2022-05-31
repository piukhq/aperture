import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {RootState} from 'app/store'
import {ModalType} from 'utils/enums'

export type ModalState = {
  modalRequested: ModalType
}

const initialState: ModalState = {modalRequested: ModalType.NO_MODAL}

export const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    requestModal: (state, action: PayloadAction<ModalType>) => {
      state.modalRequested = action.payload
    },
    reset: () => initialState,
  },
})

export const {requestModal, reset} = modalSlice.actions
export const selectModal = (state: RootState) => state.modal.modalRequested
export default modalSlice.reducer
