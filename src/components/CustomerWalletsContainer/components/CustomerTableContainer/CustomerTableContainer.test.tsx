import React from 'react'
import {render, screen} from '@testing-library/react'
import CustomerTableContainer from './CustomerTableContainer'
import {ImageTypes} from 'utils/enums'
import {LoyaltyCard, LoyaltyTransaction, LoyaltyVoucher} from 'types'

const mockMatchingId = 12345

jest.mock('./components/VoucherTableRow', () => ({
  __esModule: true,
  default: () => <div data-testid='voucher-table-row'>VoucherTableRow</div>,
}))

jest.mock('./components/TransactionTableRow', () => ({
  __esModule: true,
  default: () => <div data-testId='transaction-table-row'>TransactionTableRow</div>,
}))


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

const mockLoyaltyCardTransaction: LoyaltyTransaction = {
  id: mockMatchingId,
  timestamp: 12345,
  description: 'mock_description',
  status: 'mock_status',
  amounts: [{
    currency: 'mock_currency',
    suffix: 'mock_suffix',
    value: 12345,
  }],
}
const mockVoucher: LoyaltyVoucher = {
  code: 'mock_code',
  state: 'mock_state',
  headline: 'mock_headline',
  date_issued: 1686058201, // 06/06/2023
  expiry_date: 1687098203, // 18/06/2023
  burn: {
    prefix: 'mock_prefix',
    suffix: 'mock_suffix',
    type: 'mock_type',
  },
  earn: {
    prefix: 'mock_prefix',
    suffix: 'mock_suffix',
    type: 'mock_type',
    value: 100,
    target_value: 200,
  },
  barcode_type: 1,
}

const mockLoyaltyCard: LoyaltyCard = {
  id: 1,
  membership_plan: mockMatchingId,
  payment_cards: [{
    id: mockMatchingId,
    link_active: true,
  }],
  membership_transactions: [mockLoyaltyCardTransaction],
  vouchers: [mockVoucher],
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
  images: [],
  balances: [],
}

const getCustomerTableContainerTransactionsComponent = (passedProps = {}) => (
  <CustomerTableContainer selectedPlan={mockPlan} loyaltyCard={mockLoyaltyCard} entity={'transactions'} tableHeaders={['REWARD', 'DATE', 'DETAILS', 'AMOUNT', 'CHANGE']} {...passedProps} />
)
const getCustomerTableContainerVouchersComponent = (passedProps = {}) => (
  <CustomerTableContainer selectedPlan={mockPlan} loyaltyCard={mockLoyaltyCard} entity={'vouchers'} tableHeaders={['TYPE', 'CODE', 'ISSUED', 'EXPIRES', 'STATE']} {...passedProps} />
)

describe('Test CustomerTableContainer', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    React.useState = jest.fn()
      .mockImplementation(() => [true, jest.fn()])
  })


  describe('Test CustomerTableContainer with transactions', () => {

    it('should render the table headers', () => {
      render(getCustomerTableContainerTransactionsComponent())

      expect(screen.getByText('REWARD')).toBeInTheDocument()
      expect(screen.getByText('DATE')).toBeInTheDocument()
      expect(screen.getByText('DETAILS')).toBeInTheDocument()
      expect(screen.getByText('AMOUNT')).toBeInTheDocument()
      expect(screen.getByText('CHANGE')).toBeInTheDocument()
    })

    it('should render the transaction table row', () => {
      render(getCustomerTableContainerTransactionsComponent())

      expect(screen.getByTestId('transaction-table-row')).toBeInTheDocument()
    })
  })

  describe('Test CustomerTableContainer with vouchers', () => {
    it('should render the table headers', () => {
      render(getCustomerTableContainerVouchersComponent())

      expect(screen.getByText('TYPE')).toBeInTheDocument()
      expect(screen.getByText('CODE')).toBeInTheDocument()
      expect(screen.getByText('ISSUED')).toBeInTheDocument()
      expect(screen.getByText('EXPIRES')).toBeInTheDocument()
      expect(screen.getByText('STATE')).toBeInTheDocument()
    })

    it('should render the voucher table row', () => {
      render(getCustomerTableContainerVouchersComponent())

      expect(screen.getByTestId('voucher-table-row')).toBeInTheDocument()
    })
  })
})
