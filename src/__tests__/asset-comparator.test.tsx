import React from 'react'
import * as Redux from 'react-redux'
import {render, screen} from '@testing-library/react'
import {Provider} from 'react-redux'
import configureStore from 'redux-mock-store'
import AssetComparatorPage from 'pages/asset-comparator'
import * as WindowDimensions from 'utils/windowDimensions'

jest.mock('components/PlansList', () => () => <div data-testid='plan-list' />)
jest.mock('components/AssetGrid', () => () => <div data-testid='asset-grid' />)
jest.mock('hooks/useGetPlans', () => ({
  useGetPlans: jest.fn().mockImplementation(() => ({
    resetDevPlans: jest.fn(),
    resetStagingPlans: jest.fn(),
    resetProdPlans: jest.fn(),
  })),
}))

jest.mock('@auth0/nextjs-auth0', () => ({
  UserProvider: ({children}) => children,
  withPageAuthRequired: (component) => component,
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
    comparator: {
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
          comparator: {},
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
