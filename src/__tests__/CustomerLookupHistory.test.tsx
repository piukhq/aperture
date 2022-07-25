import React from 'react'
import * as Redux from 'react-redux'
import {render, screen, fireEvent} from '@testing-library/react'
import CustomerLookupHistory from 'components/CustomerLookupHistory'
import {setJwtToken} from 'features/customerWalletSlice'

jest.mock('components/Dropdown', () => () => <div data-testid='dropdown' />)
jest.mock('components/TextInputGroup', () => () => <div data-testid='user-identifier' />)
jest.mock('components/Button', () => () => <div data-testid='load-user-button' />)

const mockServiceRefresh = jest.fn()

jest.mock('hooks/useService', () => ({
  useService: jest.fn().mockImplementation(() => ({
    getServiceRefresh: mockServiceRefresh,
  })),
}))

jest.mock('hooks/useCustomerLookup', () => ({
  useCustomerLookup: jest.fn().mockImplementation(() => ({
    jwtCustomerLookup: jest.fn(),
  })),
}))

jest.mock('features/customerWalletSlice', () => ({
  setJwtToken: jest.fn(),
}))

const mockDisplayText = 'mock_display_text'

const mockLookupHistory = [
  {
    lookup: {
      type: 'JWT',
      criteria: 'mock_criteria',
      datetime: 'mock_date_time',
    },
    user: {
      user_id: 1234,
      channel: 'mock_channel',
      display_text: mockDisplayText,
    },
  },
  {
    lookup: {
      type: 'JWT',
      criteria: 'mock_criteria',
      datetime: 'mock_date_time',
    },
    user: {
      user_id: 5678,
      channel: 'mock_channel',
      display_text: 'mock_display_text_2',
    },
  },
]

const getCustomerLookupHistoryComponent = () => (
  <CustomerLookupHistory lookupHistory={mockLookupHistory} />
)

describe('CustomerLookupHistory', () => {
  const useDispatchMock = jest.spyOn(Redux, 'useDispatch')

  beforeEach(() => {
    jest.clearAllMocks()
    const dummyDispatch = jest.fn()
    useDispatchMock.mockReturnValue(dummyDispatch)
  })

  describe('Test component renders', () => {
    it('should render the correct number of bundle icons', () => {
      render(getCustomerLookupHistoryComponent())
      const bundleIcons = screen.queryAllByTestId('bundle-icon')
      expect(bundleIcons).toHaveLength(2)
    })

    it('should render the correct display text', () => {
      render(getCustomerLookupHistoryComponent())
      expect(screen.getByText(mockDisplayText)).toBeInTheDocument()
    })

    it('should render the correct number of date strings', () => {
      render(getCustomerLookupHistoryComponent())
      const dateStrings = screen.queryAllByTestId('date-string')
      expect(dateStrings).toHaveLength(2)
    })
  })

  // TODO: Make tests to cover other entity types, below assumes JWT
  describe('Test past history entities clicks', () => {

    it('should call appropriate functions when clicked', () => {
      render(getCustomerLookupHistoryComponent())

      fireEvent.click(screen.getByRole('button'))
      expect(setJwtToken).toHaveBeenCalledWith('mock_criteria')
      expect(mockServiceRefresh).toHaveBeenCalledTimes(1)
    })
  })
})
