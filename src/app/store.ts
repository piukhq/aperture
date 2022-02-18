import {
  Action,
  configureStore,
  ThunkAction,
} from '@reduxjs/toolkit'
import {setupListeners} from '@reduxjs/toolkit/query'

import modalReducer from 'features/modalSlice'

import {devVerifyApi, stagingVerifyApi} from 'services/users'
import {devPlansApi, stagingPlansApi} from 'services/plans'

export const store = configureStore({
  reducer: {
    modal: modalReducer,
    // Add the generated reducer as a specific top-level slice
    [devVerifyApi.reducerPath]: devVerifyApi.reducer,
    [stagingVerifyApi.reducerPath]: stagingVerifyApi.reducer,
    [devPlansApi.reducerPath]: devPlansApi.reducer,
    [stagingPlansApi.reducerPath]: stagingPlansApi.reducer,
  },
  // Adding the api middleware enables caching, invalidation, polling,
  // and other useful features of `rtk-query`.
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(
    devVerifyApi.middleware,
    stagingVerifyApi.middleware,
    devPlansApi.middleware,
    stagingPlansApi.middleware,
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
