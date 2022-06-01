import {
  Action,
  configureStore,
  combineReducers,
  ThunkAction,
} from '@reduxjs/toolkit'
import {setupListeners} from '@reduxjs/toolkit/query'
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist'
import storage from 'redux-persist/lib/storage'

import apiReflectorReducer from 'features/apiReflectorSlice'
import directoryPlanReducer from 'features/directoryPlanSlice'
import directoryMerchantReducer from 'features/directoryMerchantSlice'
import planAssetsReducer from 'features/planAssetsSlice'
import modalReducer from 'features/modalSlice'

import {devVerifyApi, stagingVerifyApi, prodVerifyApi} from 'services/users'
import {devPlansApi, stagingPlansApi, prodPlansApi} from 'services/plans'
import {midManagementPlansApi} from 'services/midManagementPlans'
import {midManagementMerchantsApi} from 'services/midManagementMerchants'

const reducers = combineReducers({
  planAssets: planAssetsReducer,
  modal: modalReducer,
  apiReflector: apiReflectorReducer,
  directoryPlan: directoryPlanReducer,
  directoryMerchant: directoryMerchantReducer,
  // Add the generated reducer as a specific top-level slice
  [devVerifyApi.reducerPath]: devVerifyApi.reducer,
  [stagingVerifyApi.reducerPath]: stagingVerifyApi.reducer,
  [prodVerifyApi.reducerPath]: prodVerifyApi.reducer,
  [devPlansApi.reducerPath]: devPlansApi.reducer,
  [stagingPlansApi.reducerPath]: stagingPlansApi.reducer,
  [prodPlansApi.reducerPath]: prodPlansApi.reducer,
  [midManagementPlansApi.reducerPath]: midManagementPlansApi.reducer,
  [midManagementMerchantsApi.reducerPath]: midManagementMerchantsApi.reducer,
})

// Allows the apiReflector enabled status to be persisted between browser refreshes
const persistConfig = {
  key: 'apiReflectorEnabled',
  storage,
  whitelist: ['apiReflector'],
}

const persistedReducer = persistReducer(persistConfig, reducers)

export const store = configureStore({
  reducer: persistedReducer,
  // Adding the api middleware enables caching, invalidation, polling,
  // and other useful features of `rtk-query`.
  middleware: getDefaultMiddleware => getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    },
  }).concat(
    devVerifyApi.middleware,
    stagingVerifyApi.middleware,
    prodVerifyApi.middleware,
    devPlansApi.middleware,
    stagingPlansApi.middleware,
    prodPlansApi.middleware,
    midManagementPlansApi.middleware,
    midManagementMerchantsApi.middleware,
  ),
})

setupListeners(store.dispatch)

export const persistor = persistStore(store)

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
