import {render, screen} from '@testing-library/react'
import LoyaltyCard from 'components/CustomerWalletsContainer/components/CustomerWallet/components/LoyaltyCard'

const mockId = 12345
const mockStatus = 'mock_status'
const mockPlanNumber = 123

const mockPlanSlug = 'mock_plan_slug'
const mockCardType = 1 // non-pll card, 2 is pll card

const mockLoyaltyBalance = {
  value: 12345,
  prefix: 'mock_prefix',
  suffix: 'mock_suffix',
  currency: 'mock_currency',
  updated_at: 1234567890,
}


const mockIconImage = {
  type: 3,
  id: 1,
  description: 'mock-description',
  encoding: 'mock-encoding',
  cta_url: 'mock-cta-url',
  url: 'https://mock-url/mock-path/mock-image.jpg',
}

const mockLoyaltyCardTransaction = {
  id: 12345,
  status: mockStatus,
  amounts: [{
    currency: 'mock_currency',
    suffix: 'mock_suffix',
    value: 12345,
  }],
}

const mockLoyaltyCardVoucher = {
  burn: {
    type: 'mock_type',
    prefix: 'mock_prefix',
    suffix: 'mock_suffix',
  },
  payment_cards: [
    {
      id: mockId,
      link_active: true,
    },
  ],
  code: 'mock_code',
  earn: {
    type: 'mock_type',
    value: 12345,
    prefix: 'mock_prefix',
    suffix: 'mock_suffix',
    target_value: 12345,
  },
  state: 'inprogress',
  headline: 'mock_headline',
  date_issued: 1234567890,
  expiry_date: 1234567890,
  barcode_type: 1234567890,
}

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
  id: 1234,
  isDev: false,
  isStaging: false,
  isProd: false,
  devImages: [],
  stagingImages: [],
  prodImages: [],
  balances: [],
  feature_set: {
    card_type: mockCardType,
  },
  card: {},
  uid: 'mock_uid',
  status: 'mock_uid',
  images: [],
  slug: mockPlanSlug,
}

const mockLoyaltyCard = {
  id: mockId,
  membership_plan: mockPlanNumber,
  payment_cards: [{
    id: mockId,
    link_active: true,
  }],
  membership_transactions: [mockLoyaltyCardTransaction],
  status: {
    state: mockStatus,
    reason_codes: ['mock_reason_code'],
  },
  card: {
    membership_id: 'mock_membership_id',
    colour: 'mock_colour',
  },
  images: [mockIconImage],
  account: {
    tier: 1,
  },
  balances: [mockLoyaltyBalance],
  vouchers: [mockLoyaltyCardVoucher],
}

const getLoyaltyCardComponent = () => (
  <LoyaltyCard card={mockLoyaltyCard} getStatusFn={jest.fn()} plan={mockPlan} />
)

describe('LoyaltyCard', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should render as a link to the relevant Django page', () => {
    const mockDjangoUrl = `${process.env.NEXT_PUBLIC_LOYALTY_API_URL}/admin/scheme/schemeaccount/${mockId}/change/`
    render(getLoyaltyCardComponent())
    const loyaltyCardLink = screen.getByRole('link')

    expect(loyaltyCardLink).toBeInTheDocument()
    expect(loyaltyCardLink).toHaveAttribute('href', mockDjangoUrl)
  })

  it('should render the plan name', () => {
    render(getLoyaltyCardComponent())

    expect(screen.getByText('mock_plan_name')).toBeInTheDocument()
  })

  it('should render the loyalty card id', () => {
    render(getLoyaltyCardComponent())

    expect(screen.getByText(mockId)).toBeInTheDocument()
  })

  it('should render a loyalty card plan logo', () => {
    render(getLoyaltyCardComponent())

    expect(screen.getByAltText('Plan icon')).toBeInTheDocument()
  })

  it('should render N/A for non-pll loyalty cards', () => {
    render(getLoyaltyCardComponent())

    expect(screen.getByText('N/A')).toBeInTheDocument()
  })

  it('should render N/A for unauthorised PLL loyalty cards', () => {
    const mockPllPlan = {...mockPlan, feature_set: {card_type: 2}, slug: 'iceland-bonus-card'} // Otherwise valid PLL plan
    const mockUnauthorisedLoyaltyCard = {
      ...mockLoyaltyCard,
      status: {
        state: 'Not authorised',
        reason_codes: ['mock_reason_code'],
      },
    }
    render(<LoyaltyCard card={mockUnauthorisedLoyaltyCard} getStatusFn={jest.fn()} plan={mockPllPlan} />)

    expect(screen.getByText('N/A')).toBeInTheDocument()
  })

  describe('Test authorised PLL balance strings', () => {
    beforeAll(() => {
      mockLoyaltyCard.status.state = 'authorised'
    })

    it('should render correct balance string for Iceland cards', () => {
      const mockIcelandPlan = {...mockPlan, feature_set: {card_type: 2}, slug: 'iceland-bonus-card'}
      render(<LoyaltyCard card={mockLoyaltyCard} getStatusFn={jest.fn()} plan={mockIcelandPlan} />)

      expect(screen.getByText(`${mockLoyaltyBalance.prefix}${mockLoyaltyBalance.value} spent`)).toBeInTheDocument()
    })

    it('should render correct balance string for points cards', () => {
      const mockPointsPlan = {...mockPlan, feature_set: {card_type: 2, has_points: true}}
      render(<LoyaltyCard card={mockLoyaltyCard} getStatusFn={jest.fn()} plan={mockPointsPlan} />)

      expect(screen.getByText(`${mockLoyaltyBalance.value} ${mockLoyaltyBalance.suffix}`)).toBeInTheDocument()
    })

    it('should render correct balance string for stamp vouchers', () => {
      const mockPllPlan = {...mockPlan, feature_set: {card_type: 2}}
      const mockStampLoyaltyCard = {
        ...mockLoyaltyCard,
        vouchers: [
          {
            ...mockLoyaltyCardVoucher,
            earn: {
              type: 'stamps',
              value: 12345,
              target_value: 54321,
              suffix: 'mock_suffix',
            },
          }],
      }
      render(<LoyaltyCard card={mockStampLoyaltyCard} getStatusFn={jest.fn()} plan={mockPllPlan} />)

      expect(screen.getByText(`${mockLoyaltyBalance.value} ${mockLoyaltyBalance.suffix}`)).toBeInTheDocument()
    })

    it('should render correct balance string for accumulator vouchers', () => {
      const mockPllPlan = {...mockPlan, feature_set: {card_type: 2}}
      const mockAccumulatorLoyaltyCard = {
        ...mockLoyaltyCard,
        vouchers: [
          {
            ...mockLoyaltyCardVoucher,
            earn: {
              type: 'accumulator',
              value: 5,
              target_value: 100,
              suffix: 'mock_suffix',
              prefix: 'mock_prefix',
            },
          }],
      }
      const {value, prefix, target_value: targetValue} = mockAccumulatorLoyaltyCard.vouchers[0].earn
      render(<LoyaltyCard card={mockAccumulatorLoyaltyCard} getStatusFn={jest.fn()} plan={mockPllPlan} />)

      expect(screen.getByText(`${prefix}${value} / ${prefix}${targetValue} spent`)).toBeInTheDocument()
    })
  })
})
