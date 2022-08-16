import React from 'react'
import {fireEvent, render, screen} from '@testing-library/react'
import LocationMidsListItem from 'components/DirectorySingleViewModal/components/SingleViewLocation/components/LocationMidsListItem'

jest.mock('components/DirectorySingleViewModal/components/SingleViewLocation/components/PaymentCardIcon', () => () => <div data-testid='payment-card-icon' />)
const mockValue = 'mock_value'
const mockRefValue = 'mock_ref_value'


const mockProps = {
  index: 0,
  paymentSchemeCode: 1,
  value: mockValue,
  refValue: mockRefValue,
  setSelectedUnlinkMidIndexFn: jest.fn(),
  isInUnlinkingConfirmationState: false,
  unlinkFn: jest.fn(),
  isUnlinking: false,
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

  it('should call the setUnlinkingMidFn with correct index when the unlink button is clicked', () => {
    render(getLocationMidsListItemComponent())
    fireEvent.click(screen.getByLabelText(`Unlink ${mockRefValue}`))
    expect(mockProps.setSelectedUnlinkMidIndexFn).toHaveBeenCalledWith(mockProps.index)
  })

  describe('Test unlinking confirmation state', () => {
    const getUnlinkingConfirmingStateComponent = getLocationMidsListItemComponent({
      isInUnlinkingConfirmationState: true,
    })

    it('should render the unlink confirmation button', () => {
      render(getUnlinkingConfirmingStateComponent)
      expect(screen.getByRole('button', {name: 'Confirm unlink'})).toBeInTheDocument()
    })

    it('should render the cancel button', () => {
      render(getUnlinkingConfirmingStateComponent)
      expect(screen.getByRole('button', {name: 'Cancel'})).toBeInTheDocument()
    })

    it('should render the primary MID confirmation message', () => {
      render(getUnlinkingConfirmingStateComponent)
      expect(screen.getByText('Are you sure you want to unlink this MID?')).toBeInTheDocument()
    })

    it('should render the Secondary MID confirmation message', () => {
      render(getLocationMidsListItemComponent({
        isSecondaryMid: true,
        isInUnlinkingConfirmationState: true,
      }))

      expect(screen.getByText('Are you sure you want to unlink this Secondary MID?')).toBeInTheDocument()
    })

    it('should call the unlink function when the unlink confirmation button is clicked', () => {
      render(getUnlinkingConfirmingStateComponent)
      fireEvent.click(screen.getByRole('button', {name: 'Confirm unlink'}))

      expect(mockProps.unlinkFn).toHaveBeenCalled()
    })

    it('should call the setUnlinkingMidFn function with null when the cancel button is clicked', () => {
      render(getUnlinkingConfirmingStateComponent)
      fireEvent.click(screen.getByRole('button', {name: 'Cancel'}))

      expect(mockProps.setSelectedUnlinkMidIndexFn).toHaveBeenCalledWith(null)
    })
  })
})
