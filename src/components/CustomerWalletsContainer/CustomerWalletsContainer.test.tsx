import React from 'react'
import {render, screen} from '@testing-library/react'
import CustomerWalletsContainer from './CustomerWalletsContainer'
import {ImageTypes} from 'utils/enums'
import {PaymentCard} from 'types'

jest.mock('components/Dropdown', () => () => <div data-testid='dropdown' />)
jest.mock('components/CustomerWalletsContainer/components/CustomerTableContainer', () => () => <div data-testid='customer-table-container' />)
jest.mock('components/CustomerWalletsContainer/components/CustomerWallet', () => () => <div data-testid='customer-wallet' />)

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

const mockPaymentCard = {
  id: mockMatchingId,
  membership_cards: [
    {id: mockMatchingId, link_active: true},
  ],
  status: 'mock_status',
} as unknown as PaymentCard


let mockLoyaltyCardResponse = [mockLoyaltyCard]
jest.mock('hooks/useCustomerWallet', () => ({
  useCustomerWallet: jest.fn().mockImplementation(() => ({
    getLoyaltyCardsResponse: mockLoyaltyCardResponse,
    getPlansResponse: [mockPlan],
    getPaymentCardsResponse: [mockPaymentCard],
  })),
}))

jest.mock('hooks/useCustomerWalletUserPlans', () => ({
  useCustomerWalletUserPlans: jest.fn().mockImplementation(() => ({
    userPlans: [mockPlan],
  })),
}))


describe('Test CustomerWalletsContainer', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  React.useState = jest.fn()
    .mockImplementationOnce(() => [null, jest.fn()])
    .mockImplementationOnce(() => [null, jest.fn()])

  describe('Test happy path with all responses available', () => {
    it('should render the CustomerWalletComponent', () => {
      render(<CustomerWalletsContainer />)

      expect(screen.getByTestId('customer-wallet')).toBeInTheDocument()
    })

    it('should render the CustomerWalletsContainer dropdown', () => {
      render(<CustomerWalletsContainer />)

      expect(screen.getByTestId('dropdown')).toBeInTheDocument()
    })

    it('should render the CustomerTableContainer twice for Vouchers and Transactions', () => {
      render(<CustomerWalletsContainer />)

      expect(screen.getAllByTestId('customer-table-container')).toHaveLength(2)
    })

    it('should render the headings for each section', () => {
      render(<CustomerWalletsContainer />)
      expect(screen.getByRole('heading', {name: 'Wallet'})).toBeInTheDocument()
      expect(screen.getByRole('heading', {name: 'Transactions'})).toBeInTheDocument()
      expect(screen.getByRole('heading', {name: 'Vouchers'})).toBeInTheDocument()
    })
  })


  describe('Test CustomerWalletsContainer unhappy paths', () => {
    beforeAll(() => {
      jest.clearAllMocks()
    })

    it('should not render any elements if there is no loyalty cards', () => { // seems overkill to repeat this test for each response
      mockLoyaltyCardResponse = []
      render(<CustomerWalletsContainer />)

      expect(screen.queryByTestId('customer-wallet')).not.toBeInTheDocument()
      expect(screen.queryByTestId('dropdown')).not.toBeInTheDocument()
      expect(screen.queryByTestId('customer-table-container')).not.toBeInTheDocument()
      expect(screen.queryByRole('heading', {name: 'Wallet'})).not.toBeInTheDocument()
      expect(screen.queryByRole('heading', {name: 'Transactions'})).not.toBeInTheDocument()
      expect(screen.queryByRole('heading', {name: 'Vouchers'})).not.toBeInTheDocument()
    })
  })
})
