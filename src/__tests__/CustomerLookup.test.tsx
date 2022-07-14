import React from 'react'
import {render, screen} from '@testing-library/react'
import CustomerLookup from 'components/CustomerLookup'
import {Provider} from 'react-redux'
import configureStore from 'redux-mock-store'

jest.mock('components/Dropdown', () => () => <div data-testid='dropdown' />)
jest.mock('components/TextInputGroup', () => () => <div data-testid='user-identifier' />)
jest.mock('components/Button', () => () => <div data-testid='load-user-button' />)

jest.mock('hooks/useGetCustomerWalletLookupHistory', () => ({
  useGetCustomerWalletLookupHistory: jest.fn().mockImplementation(() => ({
    putLookHistoryEntry: jest.fn(),
  })),
}))

const mockStoreFn = configureStore([])
const store = mockStoreFn({customerWallet: {
  jwtToken: 'mock_jwt_token',
  decodedJwtToken: 'mock_decoded_jwt_token',
},
})

jest.mock('hooks/useCustomerWallet', () => ({
  useCustomerWallet: jest.fn().mockImplementation(() => ({
    getLoyaltyCardsRefresh: jest.fn(),
    getPaymentCardsRefresh: jest.fn(),
    getPlansRefresh: jest.fn(),
  })),
}))

const getCustomerLookupComponent = (passedStore = undefined) => (
  <Provider store={passedStore || store}>
    <CustomerLookup />
  </Provider>
)

describe('CustomerLookup', () => {
  beforeEach(() => {
    jest.clearAllMocks()

    // displayValue state value
    React.useState = jest.fn().mockReturnValue(['', jest.fn()])
  })

  describe('Test component renders', () => {
    it('should render the Dropdown component', () => {
      render(getCustomerLookupComponent())
      expect(screen.queryByTestId('dropdown')).toBeInTheDocument()
    })

    it('should render the user identifier input field', () => {
      render(getCustomerLookupComponent())
      expect(screen.queryByTestId('user-identifier')).toBeInTheDocument()
    })

    it('should render the Load User button', () => {
      render(getCustomerLookupComponent())
      expect(screen.queryByTestId('load-user-button')).toBeInTheDocument()
    })
  })
})
