import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {RootState} from 'app/store'
import {ModalType} from 'utils/enums'

export type ModalState = {
  modalRequested: ModalType
  isModalHidden: boolean
  shouldCloseHidableModal: boolean
}

const initialState: ModalState = {modalRequested: ModalType.NO_MODAL, isModalHidden: false, shouldCloseHidableModal: false}

export const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    requestModal: (state, action: PayloadAction<ModalType>) => {
      state.isModalHidden = false
      state.modalRequested = action.payload
    },
    isModalHidden: (state, action: PayloadAction<boolean>) => {
      state.isModalHidden = action.payload
    },
    shouldCloseHidableModal: (state, action: PayloadAction<boolean>) => {
      state.shouldCloseHidableModal = action.payload
    },
    reset: () => initialState,
  },

})

export const {requestModal, isModalHidden, shouldCloseHidableModal, reset} = modalSlice.actions
export const selectModal = (state: RootState) => state.modal.modalRequested
export const selectIsModalHidden = (state: RootState) => state.modal.isModalHidden
export const selectShouldCloseHidableModal = (state: RootState) => state.modal.shouldCloseHidableModal
export default modalSlice.reducer
