import React from 'react'
import {render, screen} from '@testing-library/react'
import {PaymentSchemeCode} from 'utils/enums'
import LocationMidsListItem from 'components/DirectorySingleViewModal/components/SingleViewLocation/components/LocationMidsListItem'

const mockValue = 'mock_value'
const mockRefValue = 'mock_ref_value'

const mockProps = {
  index: 0,
  paymentSchemeCode: 1,
  value: mockValue,
  refValue: mockRefValue,
}

const getLocationMidsListItemComponent = (passedProps = {}) => (
  <LocationMidsListItem {...mockProps} {...passedProps} />
)

describe('LocationMidsListItem', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('Test payment scheme icon render', () => {
    it('should render the visa payment scheme icon', () => {
      render(getLocationMidsListItemComponent({paymentSchemeCode: PaymentSchemeCode.VISA}))
      expect(screen.getByTestId('visa-icon')).toBeInTheDocument()
    })

    it('should render the mastercard payment scheme icon', () => {
      render(getLocationMidsListItemComponent({paymentSchemeCode: PaymentSchemeCode.MASTERCARD}))
      expect(screen.getByTestId('mastercard-icon')).toBeInTheDocument()
    })

    it('should render the amex payment scheme icon', () => {
      render(getLocationMidsListItemComponent({paymentSchemeCode: PaymentSchemeCode.AMEX}))
      expect(screen.getByTestId('amex-icon')).toBeInTheDocument()
    })

    it('should not render any payment scheme icon', () => {
      render(getLocationMidsListItemComponent({paymentSchemeCode: null}))
      expect(screen.queryByTestId('visa-icon')).not.toBeInTheDocument()
      expect(screen.queryByTestId('mastercard-icon')).not.toBeInTheDocument()
      expect(screen.queryByTestId('amex-icon')).not.toBeInTheDocument()
    })
  })

  it('should render the value', () => {
    render(getLocationMidsListItemComponent())
    expect(screen.getByText(mockValue)).toBeInTheDocument()
  })

  it('should render the correct buttons', () => {
    render(getLocationMidsListItemComponent())
    expect(screen.getByLabelText(`View ${mockRefValue}`)).toBeInTheDocument()
    expect(screen.getByLabelText(`Unlink ${mockRefValue}`)).toBeInTheDocument()
  })
})
