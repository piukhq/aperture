import {createSelector} from '@reduxjs/toolkit'
import {RootState} from 'app/store'

export const selectModal = (state: RootState) => state.modal.modalRequested

export const modalSelector = createSelector(selectModal, state => state)
