import React from 'react'
import {fireEvent, render, screen} from '@testing-library/react'
import LinkedListItem from 'components/Modals/components/DirectorySingleViewModal/components/LinkedListItem'
import {LinkableEntities} from 'utils/enums'

jest.mock('components/Modals/components/DirectorySingleViewModal/components/SingleViewLocation/components/PaymentCardIcon', () => () => <div data-testid='payment-card-icon' />)
const mockValue = 'mock_value'
const mockRefValue = 'mock_ref_value'

const mockEntityType = LinkableEntities.MID

const mockIsUnlinking = false

const mockProps = {
  index: 0,
  paymentSchemeCode: 1,
  value: mockValue,
  refValue: mockRefValue,
  setSelectedUnlinkIndexFn: jest.fn(),
  isInUnlinkingConfirmationState: false,
  unlinkFn: jest.fn(),
  isUnlinking: mockIsUnlinking,
  setShouldRenderNewLinkDropdownMenuFn: jest.fn(),
  setNewLinkNotificationFn: jest.fn(),
  entityType: mockEntityType,
}

const getLinkedListItemComponent = (passedProps = {}) => (
  <LinkedListItem {...mockProps} {...passedProps} />
)

describe('LinkedListItem', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should render the payment card icon component', () => {
    render(getLinkedListItemComponent())
    expect(screen.getByTestId('payment-card-icon')).toBeInTheDocument()
  }),

  it('should render the value', () => {
    render(getLinkedListItemComponent())
    expect(screen.getByText(mockValue)).toBeInTheDocument()
  })

  it('should render the correct buttons', () => {
    render(getLinkedListItemComponent())
    expect(screen.getByLabelText(`View ${mockRefValue}`)).toBeInTheDocument()
    expect(screen.getByLabelText(`Unlink ${mockRefValue}`)).toBeInTheDocument()
  })

  it('should call the setUnlinkingMidFn with correct index when the unlink button is clicked', () => {
    render(getLinkedListItemComponent())
    fireEvent.click(screen.getByLabelText(`Unlink ${mockRefValue}`))
    expect(mockProps.setSelectedUnlinkIndexFn).toHaveBeenCalledWith(mockProps.index)
  })

  describe('Test unlinking confirmation state', () => {
    const getUnlinkingConfirmingStateComponent = getLinkedListItemComponent({
      isInUnlinkingConfirmationState: true,
    })

    it('should render the unlink confirmation button', () => {
      render(getUnlinkingConfirmingStateComponent)
      expect(screen.getByRole('button', {name: 'Yes, unlink'})).toBeInTheDocument()
    })


    it('should render the cancel button', () => {
      render(getUnlinkingConfirmingStateComponent)
      expect(screen.getByRole('button', {name: 'Cancel'})).toBeInTheDocument()
    })

    it('should render the unlink confirmation message', () => {
      render(getUnlinkingConfirmingStateComponent)
      expect(screen.getByText(`Are you sure you want to unlink this ${mockEntityType}?`)).toBeInTheDocument()
    })

    it('should call the unlink function when the unlink confirmation button is clicked', () => {
      render(getUnlinkingConfirmingStateComponent)
      fireEvent.click(screen.getByRole('button', {name: 'Yes, unlink'}))

      expect(mockProps.unlinkFn).toHaveBeenCalled()
    })

    it('should call the setUnlinkingMidFn function with null when the cancel button is clicked', () => {
      render(getUnlinkingConfirmingStateComponent)
      fireEvent.click(screen.getByRole('button', {name: 'Cancel'}))

      expect(mockProps.setSelectedUnlinkIndexFn).toHaveBeenCalledWith(null)
    })

    describe('Test unlinking state', () => {
      const getUnlinkingStateComponent = getLinkedListItemComponent({
        isUnlinking: true,
        isInUnlinkingConfirmationState: true,
      })

      it('should render the disabled unlinking button ', () => {
        render(getUnlinkingStateComponent)
        const unlinkingButton = screen.getByRole('button', {name: 'Unlinking...'})

        expect(unlinkingButton).toBeInTheDocument()
        expect(unlinkingButton).toBeDisabled()
      })
    })
  })
})
