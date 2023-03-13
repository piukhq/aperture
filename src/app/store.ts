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
import customerWalletReducer from 'features/customerWalletSlice'
import directoryCommentsReducer from 'features/directoryCommentsSlice'
import directoryHarmoniaReducer from 'features/directoryHarmoniaSlice'
import directoryPlanReducer from 'features/directoryPlanSlice'
import directoryMerchantReducer from 'features/directoryMerchantSlice'
import directoryLocationReducer from 'features/directoryLocationSlice'
import comparatorReducer from 'features/comparatorSlice'
import modalReducer from 'features/modalSlice'

import {devVerifyApi, stagingVerifyApi, prodVerifyApi} from 'services/users'
import {devPlansApi, stagingPlansApi, prodPlansApi} from 'services/plans'
import {midManagementCommentsApi} from 'services/midManagementComments'
import {midManagementPlansApi} from 'services/midManagementPlans'
import {midManagementMerchantsApi} from 'services/midManagementMerchants'
import {midManagementMerchantMidsApi} from 'services/midManagementMerchantMids'
import {midManagementMerchantSecondaryMidsApi} from 'services/midManagementMerchantSecondaryMids'
import {midManagementMerchantLocationsApi} from 'services/midManagementMerchantLocations'
import {midManagementMerchantPsimisApi} from 'services/midManagementMerchantPsimis'
import {customerWalletApi} from 'services/customerWallet'
import {customerWalletLookupHistoryApi} from 'services/customerWalletLookupHistory'

const reducers = combineReducers({
  comparator: comparatorReducer,
  modal: modalReducer,
  apiReflector: apiReflectorReducer,
  customerWallet: customerWalletReducer,
  directoryComments: directoryCommentsReducer,
  directoryHarmonia: directoryHarmoniaReducer,
  directoryPlan: directoryPlanReducer,
  directoryMerchant: directoryMerchantReducer,
  directoryLocation: directoryLocationReducer,

  // Add the generated reducer as a specific top-level slice
  [devVerifyApi.reducerPath]: devVerifyApi.reducer,
  [stagingVerifyApi.reducerPath]: stagingVerifyApi.reducer,
  [prodVerifyApi.reducerPath]: prodVerifyApi.reducer,
  [devPlansApi.reducerPath]: devPlansApi.reducer,
  [stagingPlansApi.reducerPath]: stagingPlansApi.reducer,
  [prodPlansApi.reducerPath]: prodPlansApi.reducer,
  [customerWalletApi.reducerPath]: customerWalletApi.reducer,
  [customerWalletLookupHistoryApi.reducerPath]: customerWalletLookupHistoryApi.reducer,
  [midManagementCommentsApi.reducerPath]: midManagementCommentsApi.reducer,
  [midManagementCommentsApi.reducerPath]: midManagementCommentsApi.reducer,
  [midManagementPlansApi.reducerPath]: midManagementPlansApi.reducer,
  [midManagementMerchantsApi.reducerPath]: midManagementMerchantsApi.reducer,
  [midManagementMerchantMidsApi.reducerPath]: midManagementMerchantMidsApi.reducer,
  [midManagementMerchantSecondaryMidsApi.reducerPath]: midManagementMerchantSecondaryMidsApi.reducer,
  [midManagementMerchantLocationsApi.reducerPath]: midManagementMerchantLocationsApi.reducer,
  [midManagementMerchantPsimisApi.reducerPath]: midManagementMerchantPsimisApi.reducer,
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
    customerWalletApi.middleware,
    customerWalletLookupHistoryApi.middleware,
    midManagementCommentsApi.middleware,
    midManagementPlansApi.middleware,
    midManagementMerchantsApi.middleware,
    midManagementMerchantMidsApi.middleware,
    midManagementMerchantSecondaryMidsApi.middleware,
    midManagementMerchantLocationsApi.middleware,
    midManagementMerchantPsimisApi.middleware,
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
