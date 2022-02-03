import {
  Action,
  configureStore,
  ThunkAction,
} from '@reduxjs/toolkit'
import {setupListeners} from '@reduxjs/toolkit/query'

import {modalReducer} from 'features/modal'
import {counterReducer} from '../features/counter'
import {kanyeReducer} from '../features/kanye'

import {jokeApi} from '../services/jokes'

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    kanyeQuote: kanyeReducer,
    modal: modalReducer,
    // Add the generated reducer as a specific top-level slice
    [jokeApi.reducerPath]: jokeApi.reducer,
  },
  // Adding the api middleware enables caching, invalidation, polling,
  // and other useful features of `rtk-query`.
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(jokeApi.middleware),
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
