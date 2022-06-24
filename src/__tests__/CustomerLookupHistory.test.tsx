import React from 'react'
import * as Redux from 'react-redux'
import {render, screen} from '@testing-library/react'
import CustomerLookupHistory from 'components/CustomerLookupHistory'

jest.mock('components/Dropdown', () => () => <div data-testid='dropdown' />)
jest.mock('components/TextInputGroup', () => () => <div data-testid='user-identifier' />)
jest.mock('components/Button', () => () => <div data-testid='load-user-button' />)

jest.mock('hooks/useGetCustomerWalletLookupHistory', () => ({
  useGetCustomerWalletLookupHistory: jest.fn().mockImplementation(() => ({
    putLookHistoryEntry: jest.fn(),
  })),
}))

const mockDisplayText = 'mock_display_text'

const mockLookupHistory = [
  {
    lookup: {
      type: 'mock_type',
      criteria: 'mock_criteria',
      datetime: 'mock_date_time',
    },
    user: {
      user_id: 1234,
      channel: 'mock_channel',
      display_text: mockDisplayText,
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
    it('should render the bundle icon', () => {
      render(getCustomerLookupHistoryComponent())
      expect(screen.queryByTestId('bundle-icon')).toBeInTheDocument()
    })

    it('should render the correct display text', () => {
      render(getCustomerLookupHistoryComponent())
      expect(screen.getByText(mockDisplayText)).toBeInTheDocument()
    })

    it('should render the date string', () => {
      render(getCustomerLookupHistoryComponent())
      expect(screen.queryByTestId('date-string')).toBeInTheDocument()
    })
  })
})
