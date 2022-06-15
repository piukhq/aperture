import {render, screen} from '@testing-library/react'
import LinkStatus from 'components/CustomerWallet/components/LinkStatus'
import {Provider} from 'react-redux'
import configureStore from 'redux-mock-store'

jest.mock('hooks/useCustomerWallet', () => ({
  useCustomerWallet: jest.fn().mockImplementation(() => ({
    getPaymentCardsResponse: [{id: mockId}, {id: mockAnotherId}],
  })),
}))

const mockId = 12345
const mockAnotherId = 54321
const mockCustomerWalletApiState = {}

const mockStoreFn = configureStore([])
const store = mockStoreFn({...mockCustomerWalletApiState})

describe('LinkStatus', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })
  it('should render linked icon when linked', () => {
    render(
      <Provider store={store}>
        <LinkStatus isPllCard loyaltyCardPaymentCardIds={[mockId]} paymentCardIndex={0} />
      </Provider>
    )

    expect(screen.getByAltText('Linked')).toBeInTheDocument()
  })

  it('should render not applicable icon when N/A', () => {
    render(
      <Provider store={store}>
        <LinkStatus isPllCard={false} loyaltyCardPaymentCardIds={[mockId]} paymentCardIndex={1} />
      </Provider>
    )

    expect(screen.getByLabelText('Not applicable')).toBeInTheDocument()
  })

  it('should render the not linked icon when not linked', () => {
    render(
      <Provider store={store}>
        <LinkStatus isPllCard loyaltyCardPaymentCardIds={[mockId]} paymentCardIndex={1} />
      </Provider>
    )

    expect(screen.getByAltText('Not linked')).toBeInTheDocument()
  })

})
