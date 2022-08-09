import React from 'react'
import {render, screen} from '@testing-library/react'
import LocationMidsListItem from 'components/DirectorySingleViewModal/components/SingleViewLocation/components/LocationMidsListItem'

jest.mock('components/DirectorySingleViewModal/components/SingleViewLocation/components/PaymentCardIcon', () => () => <div data-testid='payment-card-icon' />)
const mockValue = 'mock_value'
const mockRefValue = 'mock_ref_value'


const mockProps = {
  index: 0,
  paymentSchemeCode: 1,
  value: mockValue,
  refValue: mockRefValue,
  setUnlinkingMidFn: jest.fn(),
  isInUnlinkingConfirmationState: false,
  unlinkFn: jest.fn(),
  isUnlinking: false,
  isUnlinkSuccess: false,
  setShouldRenderNewLinkDropdownMenuFn: jest.fn(),
  isSecondaryMid: false,
}

const getLocationMidsListItemComponent = (passedProps = {}) => (
  <LocationMidsListItem {...mockProps} {...passedProps} />
)

describe('LocationMidsListItem', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should render the payment card icon component', () => {
    render(getLocationMidsListItemComponent())
    expect(screen.getByTestId('payment-card-icon')).toBeInTheDocument()
  }),
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
