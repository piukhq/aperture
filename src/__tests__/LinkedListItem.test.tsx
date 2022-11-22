import React from 'react'
import {fireEvent, render, screen} from '@testing-library/react'
import LinkedListItem from 'components/Modals/components/DirectorySingleViewModal/components/LinkedListItem'
import {LinkableEntities, PaymentSchemeSlug} from 'utils/enums'

jest.mock('components/PaymentCardIcon', () => () => <div data-testid='payment-card-icon' />)
const mockValue = 'mock_value'
const mockRefValue = 'mock_ref_value'
const mockLink = 'mock_link'

const mockEntityType = LinkableEntities.MID

const mockIsUnlinking = false

const mockProps = {
  paymentSchemeSlug: PaymentSchemeSlug.VISA,
  value: mockValue,
  link: mockLink,
  refValue: mockRefValue,
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
    expect(screen.getByLabelText(`Unlink ${mockRefValue}`)).toBeInTheDocument()
  })

  it('should render the unlink confirmation section when the unlink button is clicked', () => {
    render(getLinkedListItemComponent())
    fireEvent.click(screen.getByLabelText(`Unlink ${mockRefValue}`))
    expect(screen.getByTestId('unlink-confirmation-section')).toBeInTheDocument()
  })

  describe('Test unlinking confirmation state', () => {
    const mockSetIsInUnlinkingConfirmationState = jest.fn()
    beforeEach(() => {
      React.useState = jest.fn().mockReturnValueOnce([true, mockSetIsInUnlinkingConfirmationState]) // isInUnlinkingConfirmationState
    })

    it('should render the unlink confirmation button', () => {
      render(getLinkedListItemComponent())
      expect(screen.getByRole('button', {name: 'Yes, unlink'})).toBeInTheDocument()
    })

    it('should render the cancel button', () => {
      render(getLinkedListItemComponent())
      expect(screen.getByRole('button', {name: 'Cancel'})).toBeInTheDocument()
    })

    it('should render the unlink confirmation message', () => {
      render(getLinkedListItemComponent())
      expect(screen.getByText(`Are you sure you want to unlink this ${mockEntityType}?`)).toBeInTheDocument()
    })

    it('should call the unlink function when the unlink confirmation button is clicked', () => {
      render(getLinkedListItemComponent())
      fireEvent.click(screen.getByRole('button', {name: 'Yes, unlink'}))

      expect(mockProps.unlinkFn).toHaveBeenCalled()
    })

    it('should set state to not render the unlink confirmation section when the cancel button is clicked', () => {
      render(getLinkedListItemComponent())
      fireEvent.click(screen.getByRole('button', {name: 'Cancel'}))

      expect(mockSetIsInUnlinkingConfirmationState).toBeCalledWith(false)
    })

    describe('Test unlinking state', () => {
      it('should render the disabled unlinking button ', () => {
        render(getLinkedListItemComponent({isUnlinking: true}))
        const unlinkingButton = screen.getByRole('button', {name: 'Unlinking...'})

        expect(unlinkingButton).toBeInTheDocument()
        expect(unlinkingButton).toBeDisabled()
      })
    })
  })
})
