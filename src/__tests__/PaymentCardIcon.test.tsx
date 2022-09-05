import React from 'react'
import {render, screen} from '@testing-library/react'
import {PaymentCardIcon} from 'components'
import {PaymentSchemeCode} from 'utils/enums'

describe('PaymentCardIcon', () => {
  const mockPaymentSchemeIconStyles = ''
  it('should render the Visa payment card icon with correct alt text', () => {
    render(<PaymentCardIcon paymentSchemeCode={PaymentSchemeCode.VISA} paymentSchemeIconStyles={mockPaymentSchemeIconStyles} />)
    expect(screen.getByAltText('Visa')).toBeInTheDocument()
  })

  it('should render the Mastercard payment card icon with correct alt text', () => {
    render(<PaymentCardIcon paymentSchemeCode={PaymentSchemeCode.MASTERCARD} paymentSchemeIconStyles={mockPaymentSchemeIconStyles} />)
    expect(screen.getByAltText('Mastercard')).toBeInTheDocument()
  })

  it('should render the Amex payment card icon with correct alt text', () => {
    render(<PaymentCardIcon paymentSchemeCode={PaymentSchemeCode.AMEX} paymentSchemeIconStyles={mockPaymentSchemeIconStyles} />)
    expect(screen.getByAltText('Amex')).toBeInTheDocument()
  })
})
