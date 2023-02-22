import React from 'react'
import {render, screen} from '@testing-library/react'
import CustomerTransactions from './CustomerTransactions'
import {ImageTypes} from 'utils/enums'

jest.mock('./components/TransactionsTableBody', () => () => <div data-testid='transactions-table-body' />)
jest.mock('components/Dropdown', () => () => <div data-testid='dropdown' />)

const mockMatchingId = 12345

const mockPlan = {
  account: {
    plan_name: 'mock_plan_name',
    add_fields: [],
    authorise_fields: [],
    category: 'mock_category',
    company_name: 'mock_company_name',
    company_url: 'mock_company_url',
    enrol_fields: [],
    fees: [],
    plan_documents: [],
    plan_url: 'mock_plan_url',
    registration_fields: [],
    tiers: [],
  },
  id: mockMatchingId,
  balances: [],
  feature_set: {
    card_type: 'mock-card_type',
  },
  card: {},
  uid: 'mock_uid',
  status: 'mock_uid',
  images: [
    {
      type: ImageTypes.HERO,
      url: 'https://mock-hero-url',
      id: 1,
      encoding: '',
      description: '',
    },
  ],
  slug: 'mock-slug',
}


const mockLoyaltyCardTransaction = {
  id: mockMatchingId,
  status: 'mock_status',
  amounts: [{
    currency: 'mock_currency',
    suffix: 'mock_suffix',
    value: 12345,
  }],
}


const mockLoyaltyCard = {
  id: 'mock_loyalty_card_id',
  membership_plan: mockMatchingId,
  payment_cards: [{
    id: mockMatchingId,
    link_active: true,
  }],
  membership_transactions: [mockLoyaltyCardTransaction],
  status: {
    state: 'mock_status',
    reason_codes: ['mock_reason_code'],
  },
  card: {
    membership_id: 'mock_membership_id',
    colour: 'mock_colour',
  },
  account: {
    tier: 1,
  },
}

let mockGetPlansResponse = [mockPlan]
let mockGetLoyaltyCardsResponse = [mockLoyaltyCard]

jest.mock('hooks/useCustomerWallet', () => ({
  useCustomerWallet: jest.fn().mockImplementation(() => ({
    getLoyaltyCardsResponse: mockGetLoyaltyCardsResponse,
    getPlansResponse: mockGetPlansResponse,
  })),
}))

const mockUserPlans = [mockPlan]

const getCustomerTransactionsComponent = (passedProps = {}) => (
  <CustomerTransactions userPlans={mockUserPlans} {...passedProps} />
)

describe('Test CustomerTransactions', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    React.useState = jest.fn()
      .mockImplementation(() => [true, jest.fn()])

  })
  it('should render the CustomerTransactions component initial structure if there is plans and loyalty cards', () => {
    render(getCustomerTransactionsComponent({userPlans: mockUserPlans}))

    expect(screen.getByText('Transactions')).toBeInTheDocument()
    expect(screen.getByTestId('dropdown')).toBeInTheDocument()
  })

  it('should render the table headers', () => {
    render(getCustomerTransactionsComponent())

    expect(screen.getByText('REWARD')).toBeInTheDocument()
    expect(screen.getByText('DATE')).toBeInTheDocument()
    expect(screen.getByText('DETAILS')).toBeInTheDocument()
    expect(screen.getByText('AMOUNT')).toBeInTheDocument()
    expect(screen.getByText('CHANGE')).toBeInTheDocument()
  })

  it('should render Select Plan copy if there is no selected plan', () => {
    render(getCustomerTransactionsComponent())
    expect(screen.getByText('Select a plan above to see transactions')).toBeInTheDocument()
  })

  // TODO: Tricky to work around useEffect setting SelectedPlan to null to test other non-table copy

  describe('Test unhappy paths', () => {
    it('should not render the CustomerTransactions dropdown if there is no plans response', () => {
      mockGetPlansResponse = null
      render(getCustomerTransactionsComponent())

      expect(screen.queryByText('Transactions')).toBeInTheDocument()
      expect(screen.queryByTestId('dropdown')).not.toBeInTheDocument()
    })

    it('should not render the CustomerTransactions dropdown if there is no loyalty cards response', () => {
      mockGetLoyaltyCardsResponse = null
      render(getCustomerTransactionsComponent())

      expect(screen.queryByText('Transactions')).toBeInTheDocument()
      expect(screen.queryByTestId('dropdown')).not.toBeInTheDocument()
    })
  })
})
