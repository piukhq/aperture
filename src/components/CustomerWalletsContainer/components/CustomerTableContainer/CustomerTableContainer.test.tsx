import React from 'react'
import {render, screen} from '@testing-library/react'
import CustomerTableContainer from './CustomerTableContainer'
import {ImageTypes} from 'utils/enums'

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

const getCustomerTableContainerTransactionsComponent = (passedProps = {}) => (
  <CustomerTableContainer userPlans={mockUserPlans} entity={'transactions'} tableHeaders={['REWARD', 'DATE', 'DETAILS', 'AMOUNT', 'CHANGE']} {...passedProps} />
)
const getCustomerTableContainerVouchersComponent = (passedProps = {}) => (
  <CustomerTableContainer userPlans={mockUserPlans} entity={'vouchers'} tableHeaders={['TYPE', 'CODE', 'ISSUED', 'EXPIRES', 'STATE']} {...passedProps} />
)

describe('Test CustomerTableContainer', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    React.useState = jest.fn()
      .mockImplementation(() => [true, jest.fn()])
  })


  describe('Test CustomerTableContainer with transactions', () => {
    it('should render the CustomerTableContainer component initial structure if there is plans and loyalty cards', () => {
      render(getCustomerTableContainerTransactionsComponent({userPlans: mockUserPlans}))

      expect(screen.getByRole('heading', {name: 'Transactions'})).toBeInTheDocument()
      expect(screen.getByTestId('dropdown')).toBeInTheDocument()
    })

    it('should render the table headers', () => {
      render(getCustomerTableContainerTransactionsComponent())

      expect(screen.getByText('REWARD')).toBeInTheDocument()
      expect(screen.getByText('DATE')).toBeInTheDocument()
      expect(screen.getByText('DETAILS')).toBeInTheDocument()
      expect(screen.getByText('AMOUNT')).toBeInTheDocument()
      expect(screen.getByText('CHANGE')).toBeInTheDocument()
    })
  })

  describe('Test CustomerTableContainer with vouchers', () => {
    it('should render the CustomerTableContainer component initial structure if there is plans and loyalty cards', () => {
      render(getCustomerTableContainerVouchersComponent({userPlans: mockUserPlans}))

      expect(screen.getByRole('heading', {name: 'Vouchers'})).toBeInTheDocument()
      expect(screen.getByTestId('dropdown')).toBeInTheDocument()
    })

    it('should render the table headers', () => {
      render(getCustomerTableContainerVouchersComponent())

      expect(screen.getByText('TYPE')).toBeInTheDocument()
      expect(screen.getByText('CODE')).toBeInTheDocument()
      expect(screen.getByText('ISSUED')).toBeInTheDocument()
      expect(screen.getByText('EXPIRES')).toBeInTheDocument()
      expect(screen.getByText('STATE')).toBeInTheDocument()
    })
  })

  describe('Test CustomerTableContainer unhappy paths', () => {
    it('should not render the CustomerTableContainer dropdown if there is no plans response', () => {
      mockGetPlansResponse = null
      render(getCustomerTableContainerTransactionsComponent())

      expect(screen.queryByText('Transactions')).toBeInTheDocument()
      expect(screen.queryByTestId('dropdown')).not.toBeInTheDocument()
    })

    it('should not render the CustomerTableContainer dropdown if there is no loyalty cards response', () => {
      mockGetLoyaltyCardsResponse = []
      render(getCustomerTableContainerTransactionsComponent())

      expect(screen.queryByText('Transactions')).toBeInTheDocument()
      expect(screen.queryByTestId('dropdown')).not.toBeInTheDocument()
    })

    it('should render Select Plan copy if there is no selected plan', () => {
      mockGetLoyaltyCardsResponse = [mockLoyaltyCard]
      mockGetPlansResponse = [mockPlan]
      render(getCustomerTableContainerTransactionsComponent())

      expect(screen.getByText('Select a plan above to see transactions')).toBeInTheDocument()
    })
  })
})
