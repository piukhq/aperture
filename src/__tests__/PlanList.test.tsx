import React from 'react'
import {render} from '@testing-library/react'
import {Provider} from 'react-redux'
import configureStore from 'redux-mock-store'
import PlanList from 'components/PlansList'

jest.mock('components/TextInputGroup', () => () => <div data-testid='search-input' />)
jest.mock('hooks/useGetFormattedPlansListHook', () => ({
  useGetFormattedPlansListHook: jest.fn().mockImplementation(() => ({
    uniquePlansList: [],
    devIsLoading: false,
    stagingIsLoading: false,
  })),
}))

const mockStoreFn = configureStore([])
const store = mockStoreFn({})

const getPlanListComponent = () => (
  <Provider store={store}>
    <PlanList/>
  </Provider>
)

describe('PlanList', () => {
  it('should render the planlist container', () => {
    const {queryByTestId} = render(getPlanListComponent())
    expect(queryByTestId('plan-list-container')).toBeInTheDocument()
  })

  it('should render the search input field and load assets button', () => {
    const {getByLabelText, queryByTestId} = render(getPlanListComponent())
    expect(queryByTestId('search-input')).toBeInTheDocument()
    expect(getByLabelText('Load Assets')).toBeInTheDocument()
  })

  describe('Test Load Asset error message', () => {
    const mockLoadAssetsError = 'mock_load_assets_error'
    beforeEach(() => {
      jest.clearAllMocks()
    })

    it('should render the load assets error message', () => {
      React.useState = jest.fn()
        .mockReturnValue(['', jest.fn()])
        .mockReturnValue([null, jest.fn()])
        .mockReturnValue([mockLoadAssetsError, jest.fn()])

      const {queryByText} = render(getPlanListComponent())
      expect(queryByText(mockLoadAssetsError)).toBeInTheDocument()
    })
  })
})
