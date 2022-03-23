import React from 'react'
import * as Redux from 'react-redux'
import {render} from '@testing-library/react'
import AssetComparatorPage from 'pages/asset-comparator'
import {Provider} from 'react-redux'
import configureStore from 'redux-mock-store'

jest.mock('components/AssetModal', () => () => null)
jest.mock('components/CredentialsModal', () => () => null)
const mockStoreFn = configureStore([])

jest.mock('hooks/useGetPlansHook', () => ({
  useGetPlansHook: jest.fn(),
}))

describe('AssetComparatorPage', () => {
  const useDispatchMock = jest.spyOn(Redux, 'useDispatch')

  let store
  const initialState = {
    modal: {
      modalRequested: 'MODAL',
    },
    planAssets: {
      selectedPlanImages: {},
    },
  }

  beforeEach(() => {
    jest.clearAllMocks()
    store = mockStoreFn({...initialState})
    const dummyDispatch = jest.fn()
    useDispatchMock.mockReturnValue(dummyDispatch)
  })

  describe('Test Credentials Modal', () => {
    it('should not render Credentials Modal', () => {
      const {queryByTestId} = render(
        <Provider store={store}>
          <AssetComparatorPage />
        </Provider>
      )

      expect(queryByTestId('credentials-modal')).not.toBeInTheDocument()
    })

    it('should render Credentials Modal', () => {
      store = mockStoreFn({
        ...initialState,
        modal: {
          modalRequested: 'ASSET_COMPARATOR_CREDENTIALS',
        },
      })
      const {queryByTestId} = render(
        <Provider store={store}>
          <AssetComparatorPage />
        </Provider>
      )

      expect(queryByTestId('credentials-modal')).toBeInTheDocument()
    })
  })

  describe('Test Asset Comparator Modal', () => {
    it('should not render Asset Comparator Modal', () => {
      const {queryByTestId} = render(
        <Provider store={store}>
          <AssetComparatorPage />
        </Provider>
      )

      expect(queryByTestId('asset-comparator-modal')).not.toBeInTheDocument()
    })

    it('should render Asset Comparator Modal', () => {
      store = mockStoreFn({
        ...initialState,
        modal: {
          modalRequested: 'ASSET_COMPARATOR_ASSET',
        },
      })
      const {queryByTestId} = render(
        <Provider store={store}>
          <AssetComparatorPage />
        </Provider>
      )

      expect(queryByTestId('asset-comparator-modal')).toBeInTheDocument()
    })
  })

  describe('Test headings', () => {
    it('should render correct headings', () => {
      const {queryByTestId} = render(
        <Provider store={store}>
          <AssetComparatorPage />
        </Provider>
      )

      expect(queryByTestId('header')).toBeInTheDocument()
    })
  })
})
