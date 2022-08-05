import React from 'react'
import {render, screen} from '@testing-library/react'
import PaymentCardIcon from 'components/DirectorySingleViewModal/components/SingleViewLocation/components/PaymentCardIcon'
import {PaymentSchemeCode} from 'utils/enums'

describe('PaymentCardIcon', () => {
  it('should render the Visa payment card icon with correct alt text', () => {
    render(<PaymentCardIcon paymentSchemeCode={PaymentSchemeCode.VISA} />)
    expect(screen.getByAltText('Visa')).toBeInTheDocument()
  })

  it('should render the Mastercard payment card icon with correct alt text', () => {
    render(<PaymentCardIcon paymentSchemeCode={PaymentSchemeCode.MASTERCARD} />)
    expect(screen.getByAltText('Mastercard')).toBeInTheDocument()
  })

  it('should render the Amex payment card icon with correct alt text', () => {
    render(<PaymentCardIcon paymentSchemeCode={PaymentSchemeCode.AMEX} />)
    expect(screen.getByAltText('Amex')).toBeInTheDocument()
  })
})
