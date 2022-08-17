import React from 'react'
import {Provider} from 'react-redux'
import configureStore from 'redux-mock-store'
import {fireEvent, render, screen} from '@testing-library/react'
import CustomerLookup from 'components/CustomerLookup'

jest.mock('components/Dropdown', () => () => <div data-testid='dropdown' />)
jest.mock('components/TextInputGroup', () => () => <div data-testid='user-identifier' />)

jest.mock('hooks/useGetCustomerWalletLookupHistory', () => ({
  useGetCustomerWalletLookupHistory: jest.fn().mockImplementation(() => ({
    putLookHistoryEntry: jest.fn(),
  })),
}))

const mockJwtCustomerLookup = jest.fn()

jest.mock('hooks/useCustomerLookup', () => ({
  useCustomerLookup: jest.fn().mockImplementation(() => ({
    jwtCustomerLookup: mockJwtCustomerLookup,
  })),
}))

const mockStoreFn = configureStore([])
const mockStore = mockStoreFn({
  customerWallet: {
    jwtToken: 'mock_jwt_token',
  },
})

const getCustomerLookupComponent = () => (
  <Provider store={mockStore}>
    <CustomerLookup />
  </Provider>
)

describe('CustomerLookup', () => {
  describe('Test component rendering', () => {
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
      expect(screen.getByLabelText('Load User')).toBeInTheDocument()
    })
  })

  describe('Test load user button functionality', () => {
    beforeEach(() => {
      jest.clearAllMocks()
    })

    it('should not call jwtCustomerLookup when load user is clicked with invalid values', () => {
      React.useState = jest
        .fn()
        .mockReturnValueOnce(['Not Valid Lookup Value', jest.fn()]) // Invalid LookupTypeValue state value
        .mockReturnValueOnce(['', jest.fn()]) // Invalid lookupValue state value

      render(getCustomerLookupComponent())
      const loadUserButton = screen.getByLabelText('Load User')
      fireEvent.click(loadUserButton)

      expect(mockJwtCustomerLookup).not.toBeCalled()
    })

    it('should call jwtCustomerLookup when load user is clicked with valid values', () => {
      React.useState = jest
        .fn()
        .mockReturnValueOnce(['JWT', jest.fn()]) // Valid LookupTypeValue state value
        .mockReturnValueOnce(['mock_token_string', jest.fn()]) // Valid lookupValue state value

      render(getCustomerLookupComponent())
      const loadUserButton = screen.getByLabelText('Load User')
      fireEvent.click(loadUserButton)

      expect(mockJwtCustomerLookup).toBeCalledWith('mock_token_string', 'JWT')
    })
  })
})

