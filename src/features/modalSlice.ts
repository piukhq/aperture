import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {RootState} from 'app/store'

export type ModalType = 'NO_MODAL' | 'ASSET_COMPARATOR_CREDENTIALS' | 'ASSET_COMPARATOR_ASSET' | 'MID_MANAGEMENT_NEW_MERCHANT' | 'MID_MANAGEMENT_NEW_PLAN'

export type ModalState = {
  modalRequested: ModalType
}

const initialState: ModalState = {modalRequested: 'NO_MODAL'}

export const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    requestModal: (state, action: PayloadAction<ModalType>) => {
      state.modalRequested = action.payload
    },
  },
})

export const {requestModal} = modalSlice.actions
export const selectModal = (state: RootState) => state.modal.modalRequested
export default modalSlice.reducer
