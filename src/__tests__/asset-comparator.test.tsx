import React from 'react'
import * as Redux from 'react-redux'
import {render, screen} from '@testing-library/react'
import {Provider} from 'react-redux'
import configureStore from 'redux-mock-store'
import AssetComparatorPage from 'pages/asset-comparator'
import * as WindowDimensions from 'utils/windowDimensions'
// test commit change
jest.mock('components/AssetModal', () => () => <div data-testid='asset-comparator-modal' />)
jest.mock('components/CredentialsModal', () => () => <div data-testid='credentials-modal' />)
jest.mock('components/PlansList', () => () => <div data-testid='plan-list' />)
jest.mock('components/AssetGrid', () => () => <div data-testid='asset-grid' />)
jest.mock('hooks/useGetPlansHook', () => ({
  useGetPlansHook: jest.fn(),
}))

describe('AssetComparatorPage', () => {
  const mockStoreFn = configureStore([])
  const useDispatchMock = jest.spyOn(Redux, 'useDispatch')
  const isDesktopViewportDimensionsMock = jest.spyOn(WindowDimensions, 'useIsDesktopViewportDimensions')

  let store
  const initialState = {
    modal: {
      modalRequested: 'MODAL',
    },
    planAssets: {
      selectedPlanImages: [],
    },
  }

  beforeEach(() => {
    jest.clearAllMocks()
    store = mockStoreFn({...initialState})
    const dummyDispatch = jest.fn()
    useDispatchMock.mockReturnValue(dummyDispatch)
    isDesktopViewportDimensionsMock.mockReturnValue(true)

    // isVerified state value
    React.useState = jest.fn().mockReturnValue([false, jest.fn()])
  })

  const getAssetComparatorComponent = (passedStore = undefined) => (
    <Provider store={passedStore || store}>
      <AssetComparatorPage />
    </Provider>
  )

  describe('Test Credentials Modal', () => {
    it('should not render Credentials Modal', () => {
      const {queryByTestId} = render(getAssetComparatorComponent())
      expect(queryByTestId('credentials-modal')).not.toBeInTheDocument()
    })

    it('should render Credentials Modal', () => {
      const store = mockStoreFn({
        ...initialState,
        modal: {
          modalRequested: 'ASSET_COMPARATOR_CREDENTIALS',
        },
      })
      const {queryByTestId} = render(getAssetComparatorComponent(store))
      expect(queryByTestId('credentials-modal')).toBeInTheDocument()
    })
  })

  describe('Test Asset Modal', () => {
    it('should not render Asset Modal', () => {
      const {queryByTestId} = render(getAssetComparatorComponent())
      expect(queryByTestId('asset-comparator-modal')).not.toBeInTheDocument()
    })

    it('should render Asset Modal', () => {
      const store = mockStoreFn({
        ...initialState,
        modal: {
          modalRequested: 'ASSET_COMPARATOR_ASSET',
        },
      })
      const {queryByTestId} = render(getAssetComparatorComponent(store))
      expect(queryByTestId('asset-comparator-modal')).toBeInTheDocument()
    })
  })

  describe('Test headings', () => {
    it('should render the header container', () => {
      const {queryByTestId} = render(getAssetComparatorComponent())
      expect(queryByTestId('header')).toBeInTheDocument()
    })

    it('should render the Plan List', () => {
      React.useState = jest.fn().mockReturnValue([true, jest.fn()])
      const {queryByTestId} = render(
        <Provider store={store}>
          <AssetComparatorPage />
        </Provider>
      )

      expect(queryByTestId('plan-list')).toBeInTheDocument()
    })

    it('should render Credentials button', () => {
      const {getByRole} = render(getAssetComparatorComponent())
      expect(getByRole('button', {name: /Credentials/i})).toBeInTheDocument()
    })
  })

  describe('Test copy variations', () => {
    it('should render small viewport copy', () => {
      isDesktopViewportDimensionsMock.mockReturnValue(false)
      const {getByText, queryByTestId} = render(getAssetComparatorComponent())

      expect(queryByTestId('small-viewport-copy')).toBeInTheDocument()
      expect(getByText('Viewport too small')).toBeInTheDocument()
      expect(getByText('To use the asset comparator your browser window must be a minimum width of 1000px.')).toBeInTheDocument()
      expect(getByText('Increase the size of your browser window to continue')).toBeInTheDocument()
      expect(queryByTestId('unverified-landing-copy')).not.toBeInTheDocument()
    })

    it('should render unverified landing copy', () => {
      const {getByText, queryByTestId} = render(getAssetComparatorComponent())

      expect(queryByTestId('unverified-landing-copy')).toBeInTheDocument()
      expect(getByText('Welcome to the Bink Asset Comparator')).toBeInTheDocument()
      expect(getByText('Enter credentials above to compare assets across different environments')).toBeInTheDocument()
      expect(queryByTestId('small-viewport-copy')).not.toBeInTheDocument()
    })

    describe('Test verified landing', () => {
      beforeEach(() => {
        React.useState = jest.fn().mockReturnValue([true, jest.fn()])
      })

      it('should render the environment headers', () => {
        render(getAssetComparatorComponent())

        const devHeading = screen.getByRole('heading', {
          name: 'DEVELOPMENT',
        })

        const stagingHeading = screen.getByRole('heading', {
          name: 'STAGING',
        })

        const sandboxHeading = screen.getByRole('heading', {
          name: 'SANDBOX',
        })

        const prodHeading = screen.getByRole('heading', {
          name: 'PRODUCTION',
        })

        expect(devHeading).toBeInTheDocument()
        expect(stagingHeading).toBeInTheDocument()
        expect(sandboxHeading).toBeInTheDocument()
        expect(prodHeading).toBeInTheDocument()
      })

      it('should render verified landing copy', () => {
        const store = mockStoreFn({
          ...initialState,
          planAssets: {},
        })
        const {getByText} = render(getAssetComparatorComponent(store))
        expect(getByText('Select a plan above to compare assets')).toBeInTheDocument()
      })

      it('should render Asset Grid', () => {
        const {queryByTestId} = render(getAssetComparatorComponent())
        expect(queryByTestId('asset-grid')).toBeInTheDocument()
      })
    })

  })
})
