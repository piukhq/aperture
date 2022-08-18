import React from 'react'
import {Provider} from 'react-redux'
import configureStore from 'redux-mock-store'
import {render, screen, fireEvent} from '@testing-library/react'
import CustomerLookupHistory from 'components/CustomerLookupHistory'

jest.mock('components/Dropdown', () => () => <div data-testid='dropdown' />)
jest.mock('components/TextInputGroup', () => () => <div data-testid='user-identifier' />)
jest.mock('components/Button', () => () => <div data-testid='load-user-button' />)

const mockJwtCustomerLookup = jest.fn()

const mockDisplayText = 'mock_display_text'
const mockActiveUserId = 'mock_active_user_id'
const mockLookupHistory = [
  {
    lookup: {
      type: 'JWT',
      criteria: 'mock_criteria',
      datetime: 'mock_date_time',
    },
    user: {
      user_id: mockActiveUserId,
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

const mockStoreFn = configureStore([])
const mockStore = mockStoreFn({
  customerWallet: {
    jwtToken: 'mock_jwt_token',
    activeUserId: mockActiveUserId,
  },
})

const getCustomerLookupHistoryComponent = () => (
  <Provider store={mockStore}>
    <CustomerLookupHistory lookupHistory={mockLookupHistory} jwtCustomerLookup={mockJwtCustomerLookup} />
  </Provider>
)

describe('CustomerLookupHistory', () => {
  beforeEach(() => {
    jest.clearAllMocks()
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
    it('should call jwtTokenLookup when clicked', () => {
      render(getCustomerLookupHistoryComponent())

      fireEvent.click(screen.getByRole('button'))
      expect(mockJwtCustomerLookup).toHaveBeenCalledWith('mock_criteria', 'JWT')
    })
  })
})
