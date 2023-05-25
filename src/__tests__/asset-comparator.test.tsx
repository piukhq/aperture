import React from 'react'
import {render, screen} from '@testing-library/react'
import {Provider} from 'react-redux'
import configureStore from 'redux-mock-store'
import AssetComparatorPage from 'pages/asset-comparator'

jest.mock('components/PlansList', () => () => <div data-testid='plan-list' />)
jest.mock('components/AssetGrid', () => () => <div data-testid='asset-grid' />)
jest.mock('hooks/useGetPlans', () => ({
  useGetPlans: jest.fn().mockImplementation(() => ({
    resetDevPlans: jest.fn(),
    resetStagingPlans: jest.fn(),
    resetProdPlans: jest.fn(),
  })),
}))

describe('AssetComparatorPage', () => {
  const mockStoreFn = configureStore([])
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

        const prodHeading = screen.getByRole('heading', {
          name: 'PRODUCTION',
        })

        expect(devHeading).toBeInTheDocument()
        expect(stagingHeading).toBeInTheDocument()
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
