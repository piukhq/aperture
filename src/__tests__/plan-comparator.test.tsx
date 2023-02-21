import React from 'react'
import * as Redux from 'react-redux'
import {render} from '@testing-library/react'
import {Provider} from 'react-redux'
import configureStore from 'redux-mock-store'
import PlanComparatorPage from 'pages/plan-comparator'

jest.mock('components/PlansList', () => () => <div data-testid='plan-list' />)
jest.mock('components/PlanComparator', () => () => <div data-testid='plan-comparator' />)
jest.mock('hooks/useGetPlans', () => ({
  useGetPlans: jest.fn().mockImplementation(() => ({
    resetDevPlans: jest.fn(),
    resetStagingPlans: jest.fn(),
    resetProdPlans: jest.fn(),
  })),
}))

describe('AssetComparatorPage', () => {
  const mockStoreFn = configureStore([])
  const useDispatchMock = jest.spyOn(Redux, 'useDispatch')

  let store
  const initialState = {
    modal: {
      modalRequested: 'MODAL',
    },
    comparator: {
      selectedPlans: {
        dev: null,
        staging: null,
        prod: null,
      },
    },
  }

  beforeEach(() => {
    jest.clearAllMocks()
    store = mockStoreFn({...initialState})
    const dummyDispatch = jest.fn()
    useDispatchMock.mockReturnValue(dummyDispatch)

    // isVerified state value
    React.useState = jest.fn().mockReturnValue([false, jest.fn()])
  })

  const getPlanComparatorComponent = (passedStore = undefined) => (
    <Provider store={passedStore || store}>
      <PlanComparatorPage />
    </Provider>
  )

  describe('Test headings', () => {
    it('should render the header container', () => {
      const {queryByTestId} = render(getPlanComparatorComponent())
      expect(queryByTestId('header')).toBeInTheDocument()
    })

    it('should render the Plan List', () => {
      React.useState = jest.fn().mockReturnValue([true, jest.fn()])
      const {queryByTestId} = render(
        <Provider store={store}>
          <PlanComparatorPage />
        </Provider>
      )

      expect(queryByTestId('plan-list')).toBeInTheDocument()
    })

    it('should render Credentials button', () => {
      const {getByRole} = render(getPlanComparatorComponent())
      expect(getByRole('button', {name: /Credentials/i})).toBeInTheDocument()
    })
  })

  describe('Test copy variations', () => {
    it('should render unverified landing copy', () => {
      const {getByText, queryByTestId} = render(getPlanComparatorComponent())

      expect(queryByTestId('unverified-landing-copy')).toBeInTheDocument()
      expect(getByText('Welcome to the Bink Plan Comparator')).toBeInTheDocument()
      expect(getByText('Enter credentials above to log in to multiple environments to compare plans')).toBeInTheDocument()
    })

    describe('Test verified landing', () => {
      beforeEach(() => {
        React.useState = jest.fn().mockReturnValue([true, jest.fn()])
      })

      it('should render verified landing copy', () => {
        const {getByText} = render(getPlanComparatorComponent())
        expect(getByText('Select a plan above to compare')).toBeInTheDocument()
      })

      it('should render the Plan Comparator Component', () => {
        const store = mockStoreFn({
          ...initialState,
          comparator: {
            selectedPlans: {
              dev: true,
              staging: true,
              prod: true,
            },
          },
        })
        const {queryByTestId} = render(getPlanComparatorComponent(store))
        expect(queryByTestId('plan-comparator')).toBeInTheDocument()
      })
    })

  })
})
