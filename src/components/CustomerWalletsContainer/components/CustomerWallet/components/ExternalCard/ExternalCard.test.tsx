import {render, screen} from '@testing-library/react'
import ExternalCard from 'components/CustomerWalletsContainer/components/CustomerWallet/components/ExternalCard'

const mockId = 12345

const getExternalPaymentCardComponent = () => (
  <ExternalCard id={mockId} isPaymentCard={true} />
)

describe('ExternalCard', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })
  it('should render the Linked elsewhere label', () => {
    render(getExternalPaymentCardComponent())

    expect(screen.getByText('Linked elsewhere')).toBeInTheDocument()
  })

  it('should render the Id', () => {
    render(getExternalPaymentCardComponent())

    expect(screen.getByText(mockId)).toBeInTheDocument()
  })

  it('should have the correct dimensions for a payment card', () => {
    render(getExternalPaymentCardComponent())
    const card = screen.getByTestId('card-container')

    expect(card.classList.contains('h-[52px]')).toBeTruthy()
    expect(card.classList.contains('w-[200px]')).toBeTruthy()
  })

  it('should have the correct dimensions for a loyalty card', () => {
    render(<ExternalCard id={mockId} isPaymentCard={false} />)
    const card = screen.getByTestId('card-container')

    expect(card.classList.contains('h-[43px]')).toBeTruthy()
    expect(card.classList.contains('w-[180px]')).toBeTruthy()
  })
})
