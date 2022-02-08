import {
  Action,
  configureStore,
  ThunkAction,
} from '@reduxjs/toolkit'
import {setupListeners} from '@reduxjs/toolkit/query'

import modalReducer from 'features/modalSlice'

import {devLoginApi, stagingLoginApi} from 'services/verification'

export const store = configureStore({
  reducer: {
    modal: modalReducer,
    // Add the generated reducer as a specific top-level slice
    [devLoginApi.reducerPath]: devLoginApi.reducer,
    [stagingLoginApi.reducerPath]: stagingLoginApi.reducer,
  },
  // Adding the api middleware enables caching, invalidation, polling,
  // and other useful features of `rtk-query`.
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(
    devLoginApi.middleware,
    stagingLoginApi.middleware,
  ),
})

setupListeners(store.dispatch)

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
