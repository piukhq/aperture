import {render, screen} from '@testing-library/react'
import PaymentCard from 'components/CustomerWallet/components/PaymentCard'

const mockId = 12345
const mockStatus = 'mock_status'
const mockAccountNumber = 123

const mockIconImage = {
  type: 3,
  id: 1,
  description: 'mock-description',
  encoding: 'mock-encoding',
  cta_url: 'mock-cta-url',
  url: 'https://mock-url/mock-path/mock-image.jpg',
}

const mockCard = {
  last_four_digits: 'mock_last_four_digits',
  provider: 'Visa',
  first_six_digits: 'mock_first_six_digits',
  month: 11,
  year: 1066,
  country: 'mock_country',
  currency_code: 'mock_currency_code',
  name_on_card: 'mock_name_on_card',
  issuer_name: 'mock_issuer_name',
  type: 'mock_type',
}

const mockPaymentCard = {
  id: mockId,
  membership_cards: [
    {
      id: mockId,
      link_active: true,
    },
  ],
  status: mockStatus,
  card: mockCard,
  images: [mockIconImage],
  account: {
    status: mockAccountNumber,
    verification_in_progress: false,
    consents: [
      {
        type: mockAccountNumber,
        latitude: mockAccountNumber,
        longitude: mockAccountNumber,
        timestamp: mockAccountNumber,
      },
    ],
  },

}

const getPaymentCardComponent = () => (
  <PaymentCard paymentCard={mockPaymentCard} getStatusFn={jest.fn()} />
)

describe('PaymentCard', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })
  it('should render the last four digits with preceding ellipses', () => {
    render(getPaymentCardComponent())

    expect(screen.getByText(/....mock_last_four_digits/)).toBeInTheDocument()
  })

  it('should render the payment card id', () => {
    render(getPaymentCardComponent())

    expect(screen.getByText(mockId)).toBeInTheDocument()
  })

  it('should render a payment scheme icon', () => {
    render(getPaymentCardComponent())

    expect(screen.getByAltText('Visa')).toBeInTheDocument()
  })
})
