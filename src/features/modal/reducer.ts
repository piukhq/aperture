import {createReducer} from '@reduxjs/toolkit'
import {
  requestModal,
} from './actions'

type ModalState = {
  modalRequested: string;
};

const initialState:ModalState = {modalRequested: 'NO_MODAL'}

export const modalReducer = createReducer(initialState, builder => {
  builder
    .addCase(requestModal, (state, action) => {
      console.log(action)
      state.modalRequested = action.payload
    })
})
