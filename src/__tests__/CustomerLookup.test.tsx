import React from 'react'
import {fireEvent, render, screen} from '@testing-library/react'
import * as Redux from 'react-redux'
import CustomerLookup from 'components/CustomerLookup'
import {Provider} from 'react-redux'
import configureStore from 'redux-mock-store'
import {setJwtToken} from 'features/customerWalletSlice'

jest.mock('components/Dropdown', () => () => <div data-testid='dropdown' />)
jest.mock('components/TextInputGroup', () => () => <div data-testid='user-identifier' />)

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

const mockServiceRefresh = jest.fn()

jest.mock('hooks/useCustomerWallet', () => ({
  useCustomerWallet: jest.fn().mockImplementation(() => ({
    getLoyaltyCardsRefresh: jest.fn(),
    getPaymentCardsRefresh: jest.fn(),
    getPlansRefresh: jest.fn(),
  })),
}))


jest.mock('hooks/useService', () => ({
  useService: jest.fn().mockImplementation(() => ({
    getServiceRefresh: mockServiceRefresh,
    getServiceResponse: jest.fn(),
  })),
}))

jest.mock('utils/jwtToken', () => ({
  decodeJwtToken: jest.fn().mockImplementation(() => 'mock_jwt_token'),
}))

jest.mock('features/customerWalletSlice', () => ({
  setJwtToken: jest.fn(),
}))

const getCustomerLookupComponent = (passedStore = undefined) => (
  <Provider store={passedStore || store}>
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
    const useDispatchMock = jest.spyOn(Redux, 'useDispatch')

    beforeEach(() => {
      jest.clearAllMocks()
      const dummyDispatch = jest.fn()
      useDispatchMock.mockReturnValue(dummyDispatch)
    })

    it('should not dispatch setJWTToken and refresh service when load user is clicked with invalid values', () => {
      React.useState = jest
        .fn()
        .mockReturnValueOnce(['Not Valid Lookup Value', jest.fn()]) // Invalid LookupTypeValue state value
        .mockReturnValueOnce(['', jest.fn()]) // Invalid lookupValue state value

      render(getCustomerLookupComponent())
      const loadUserButton = screen.getByLabelText('Load User')
      fireEvent.click(loadUserButton)

      expect(setJwtToken).not.toBeCalled()
      expect(mockServiceRefresh).toHaveBeenCalledTimes(0)
    })

    it('should dispatch setJWTToken and refresh service when load user is clicked with valid values', () => {
      React.useState = jest
        .fn()
        .mockReturnValueOnce(['JWT', jest.fn()]) // Valid LookupTypeValue state value
        .mockReturnValueOnce(['mock_token_string', jest.fn()]) // Valid lookupValue state value

      render(getCustomerLookupComponent())
      const loadUserButton = screen.getByLabelText('Load User')
      fireEvent.click(loadUserButton)

      expect(setJwtToken).toBeCalledWith('mock_token_string')
      expect(mockServiceRefresh).toHaveBeenCalledTimes(1)
    })
  })
})

