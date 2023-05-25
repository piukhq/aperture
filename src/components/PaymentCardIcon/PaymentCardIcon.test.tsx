import React from 'react'
import {render, screen} from '@testing-library/react'
import {PaymentCardIcon} from 'components'
import {PaymentSchemeSlug} from 'utils/enums'

describe('PaymentCardIcon', () => {
  const mockPaymentSchemeIconStyles = ''
  it('should render the Visa payment card container', () => {
    render(<PaymentCardIcon paymentSchemeSlug={PaymentSchemeSlug.VISA} paymentSchemeIconStyles={mockPaymentSchemeIconStyles} />)
    expect(screen.getByTestId('visa-container')).toBeInTheDocument()
  })

  it('should render the Mastercard payment card container', () => {
    render(<PaymentCardIcon paymentSchemeSlug={PaymentSchemeSlug.MASTERCARD} paymentSchemeIconStyles={mockPaymentSchemeIconStyles} />)
    expect(screen.getByTestId('mastercard-container')).toBeInTheDocument()
  })

  it('should render the Amex payment card container', () => {
    render(<PaymentCardIcon paymentSchemeSlug={PaymentSchemeSlug.AMEX} paymentSchemeIconStyles={mockPaymentSchemeIconStyles} />)
    expect(screen.getByTestId('amex-container')).toBeInTheDocument()
  })
})
