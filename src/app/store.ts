import {
  Action,
  configureStore,
  ThunkAction,
} from '@reduxjs/toolkit'
import {setupListeners} from '@reduxjs/toolkit/query'

import directoryPlanReducer from 'features/directoryPlanSlice'
import directoryMerchantReducer from 'features/directoryMerchantSlice'
import directoryMidReducer from 'features/directoryMidSlice'
import planAssetsReducer from 'features/planAssetsSlice'
import modalReducer from 'features/modalSlice'

import {devVerifyApi, stagingVerifyApi, prodVerifyApi} from 'services/users'
import {devPlansApi, stagingPlansApi, prodPlansApi} from 'services/plans'
import {postPlanApi} from 'services/midManagementPlans'

export const store = configureStore({
  reducer: {
    planAssets: planAssetsReducer,
    modal: modalReducer,
    directoryPlan: directoryPlanReducer,
    directoryMerchant: directoryMerchantReducer,
    directoryMid: directoryMidReducer,
    // Add the generated reducer as a specific top-level slice
    [devVerifyApi.reducerPath]: devVerifyApi.reducer,
    [stagingVerifyApi.reducerPath]: stagingVerifyApi.reducer,
    [prodVerifyApi.reducerPath]: prodVerifyApi.reducer,
    [devPlansApi.reducerPath]: devPlansApi.reducer,
    [stagingPlansApi.reducerPath]: stagingPlansApi.reducer,
    [prodPlansApi.reducerPath]: prodPlansApi.reducer,
    [postPlanApi.reducerPath]: postPlanApi.reducer,
  },
  // Adding the api middleware enables caching, invalidation, polling,
  // and other useful features of `rtk-query`.
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(
    devVerifyApi.middleware,
    stagingVerifyApi.middleware,
    prodVerifyApi.middleware,
    devPlansApi.middleware,
    stagingPlansApi.middleware,
    prodPlansApi.middleware,
    postPlanApi.middleware,
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
