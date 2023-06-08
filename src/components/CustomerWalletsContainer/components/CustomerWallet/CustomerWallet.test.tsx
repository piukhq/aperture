import {render, screen} from '@testing-library/react'
import CustomerWallet from 'components/CustomerWalletsContainer/components/CustomerWallet'
import {Provider} from 'react-redux'
import configureStore from 'redux-mock-store'
import {LoyaltyCard, PaymentCard} from 'types'

jest.mock('components/CustomerWalletsContainer/components/CustomerWallet/components/PaymentCard', () => () => <div data-testid='payment-card'></div>)
jest.mock('components/CustomerWalletsContainer/components/CustomerWallet/components/LoyaltyCard', () => () => <div data-testid='loyalty-card'></div>)
jest.mock('components/CustomerWalletsContainer/components/CustomerWallet/components/ExternalCard', () => () => <div data-testid='external-card'></div>)
jest.mock('components/CustomerWalletsContainer/components/CustomerWallet/components/LinkStatus', () => () => <div data-testid='link-status'></div>)

const mockMatchingId = 12345 // Used to link loyalty cards to payment cards

const mockPaymentCard = {
  id: mockMatchingId,
  membership_cards: [
    {id: mockMatchingId, link_active: true},
  ],
  status: 'mock_status',
} as unknown as PaymentCard

const mockPlan = {
  id: mockMatchingId,
  account: {
    add_fields: [],
    authorise_fields: [],
    category: '',
    company_name: '',
    company_url: '',
    enrol_fields: [],
    fees: [],
    plan_documents: [],
    plan_name: '',
    plan_url: '',
    registration_fields: [],
    tiers: [],
  },
  feature_set: {
    card_type: 1,
  },
  card: {},
  uid: '',
  status: '',
  balances: [],
  images: [],
  slug: '',
}

const mockLoyaltyCard: LoyaltyCard = {
  id: 1,
  membership_plan: mockMatchingId,
  payment_cards: [{
    id: mockMatchingId,
    link_active: true,
  }],
  membership_transactions: [],
  vouchers: [],
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

jest.mock('hooks/useCustomerWallet', () => ({
  useCustomerWallet: jest.fn().mockImplementation(() => ({
    getLoyaltyCardsRefresh: jest.fn(),
    getPaymentCardsRefresh: jest.fn(),
    getPlansRefresh: jest.fn(),
  })),
}))

const mockStoreFn = configureStore([])
const mockCustomerWalletApiState = {
  customerWallet: {
    jwtToken: '',
  },
}
const store = mockStoreFn({...mockCustomerWalletApiState})

const getCustomerWalletComponent = () => (
  <Provider store={store}>
    <CustomerWallet userPlans={[mockPlan]} loyaltyCards={[mockLoyaltyCard]} paymentCards={[mockPaymentCard]} />
  </Provider>
)

describe('CustomerWallet', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should render the correct number of Loyalty Cards', () => {
    render(getCustomerWalletComponent())

    expect(screen.getAllByTestId('loyalty-card')).toHaveLength(1)
  })

  it('should render the correct number of Payment Cards', () => {
    render(getCustomerWalletComponent())

    expect(screen.getAllByTestId('payment-card')).toHaveLength(1)
  })

  it('should render the correct number of External Cards', () => {
    render(getCustomerWalletComponent())

    expect(screen.getAllByTestId('external-card')).toHaveLength(1)
  })

  it('should render the correct number of Link Statuses', () => {
    render(getCustomerWalletComponent())

    expect(screen.getAllByTestId('link-status')).toHaveLength(2)
  })
})
