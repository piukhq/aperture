import React from 'react'
import {fireEvent, render, screen} from '@testing-library/react'
import {DirectoryMerchantEntityDeleteModal} from 'components'
import {Provider} from 'react-redux'
import configureStore from 'redux-mock-store'
import {PaymentSchemeSlug} from 'utils/enums'

jest.mock('components/Modal', () => ({
  __esModule: true,
  default ({modalHeader, children}: Record<string, unknown>) {
    return (
      <div>
        <h1>{modalHeader}</h1>
        {children}
      </div>
    )
  },
}))

jest.mock('components/PaymentCardIcon', () => () => <div data-testid='payment-card-icon' />)

const mockTab = 'locations' // This must match once of the enum values in DirectorySingleViewEntities so is not a mock
const useRouter = jest.spyOn(require('next/router'), 'useRouter')
useRouter.mockImplementation(() => ({
  query: {
    tab: mockTab,
  },
}))

const mockEntityValue1 = 'mock_entity_value_1'
const mockEntityValue2 = 'mock_entity_value_2'

const mockError = {
  status: 'mock_error_status',
  data: {
    detail: [{loc: 'mock_loc', msg: 'mock_msg', type: 'mock_type'}],
  },
}
const mockDeleteButtonClickFn = jest.fn()
const mockEntitiesToBeDeleted = [
  {entityRef: 'mock_ref_1', entityValue: mockEntityValue1},
  {entityRef: 'mock_ref_2', entityValue: mockEntityValue2, paymentSchemeSlug: PaymentSchemeSlug.VISA},
]

const mockResetDeleteResponseFn = jest.fn()

const mockStoreFn = configureStore([])
const store = mockStoreFn({
  modalRequested: null,
})

const mockProps = {
  entitiesToBeDeleted: mockEntitiesToBeDeleted,
  deleteButtonClickFn: mockDeleteButtonClickFn,
  deleteError: mockError,
  isDeleteLoading: false,
  isDeleteSuccess: false,
  isHarmoniaEntity: true,
  resetDeleteResponseFn: mockResetDeleteResponseFn,
}

const getDirectoryMerchantEntityDeleteModalContentComponent = (passedProps = {}) => (
  <Provider store={store}>
    <DirectoryMerchantEntityDeleteModal {...mockProps} {...passedProps} />
  </Provider>
)

describe('DirectoryMerchantEntityDeleteModal', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    React.useState = jest
      .fn()
      .mockReturnValueOnce(['', jest.fn()]) // reasonValue
      .mockReturnValueOnce([null, jest.fn()]) // reasonValidationError
      .mockReturnValueOnce(['', jest.fn()]) // ErrorMessage
  })

  it('should render the correct modal header for a singular entity', () => {
    render(getDirectoryMerchantEntityDeleteModalContentComponent({
      entitiesToBeDeleted: [{entityRef: 'mock_ref_1', entityValue: mockEntityValue1}],
    }))

    expect(screen.getByRole('heading', {name: 'Delete Location'})).toBeInTheDocument()
  })

  it('should render the PaymentCardIcon', () => {
    render(getDirectoryMerchantEntityDeleteModalContentComponent())
    expect(screen.getByTestId('payment-card-icon')).toBeInTheDocument()
  })

  it('should render the correct modal header for a plural entity', () => {
    render(getDirectoryMerchantEntityDeleteModalContentComponent())
    expect(screen.getByRole('heading', {name: 'Delete Locations'})).toBeInTheDocument()
  })

  it('should render the correct first paragraph for the entity', () => {
    render(getDirectoryMerchantEntityDeleteModalContentComponent())

    expect(screen.getByTestId('paragraph-1')).toHaveTextContent('Are you sure you want to delete the following Locations:')
  })

  it('should render a reason input for multiple entities', () => {
    render(getDirectoryMerchantEntityDeleteModalContentComponent())
    expect(screen.getByLabelText('Reason for deletion')).toBeInTheDocument()
  })

  it('should not render a reason input for a single entity', () => {
    render(getDirectoryMerchantEntityDeleteModalContentComponent({
      entitiesToBeDeleted: [{entityRef: 'mock_ref_1', entityValue: mockEntityValue1}],
    }))
    expect(screen.queryByLabelText('Reason for deletion')).not.toBeInTheDocument()
  })

  it('should render the harmonia paragraph', () => {
    render(getDirectoryMerchantEntityDeleteModalContentComponent())
    expect(screen.getByText('Locations will also be offboarded from Harmonia')).toBeInTheDocument()
  })

  it('should not render the harmonia paragraph', () => {
    render(getDirectoryMerchantEntityDeleteModalContentComponent({isHarmoniaEntity: false}))
    expect(screen.queryByText('Locations will also be offboarded from Harmonia')).not.toBeInTheDocument()
  })

  it('should render the correct entity values', () => {
    render(getDirectoryMerchantEntityDeleteModalContentComponent())

    expect(screen.getByText(mockEntityValue1)).toBeInTheDocument()
    expect(screen.getByText(mockEntityValue2)).toBeInTheDocument()
  })

  it('should render the delete button with correct label', () => {
    render(getDirectoryMerchantEntityDeleteModalContentComponent())
    expect(screen.getByRole('button', {name: 'Delete Locations'})).toBeInTheDocument()
  })


  describe('Test happy path functionality', () => {
    beforeEach(() => {
      jest.clearAllMocks()
    })

    it('should call the deleteButtonClick function when the delete button is clicked', () => {
      React.useState = jest
        .fn()
        .mockReturnValueOnce(['mock_reason', jest.fn()]) // reasonValue
        .mockReturnValueOnce([null, jest.fn()]) // reasonValidationError
        .mockReturnValueOnce([null, jest.fn()]) // ErrorMessage

      render(getDirectoryMerchantEntityDeleteModalContentComponent())
      fireEvent.click(screen.getByRole('button', {name: 'Delete Locations'}))
      expect(mockDeleteButtonClickFn).toHaveBeenCalledTimes(1)
    })

    it('should not disable the delete button when there is only a single entity with no reason provided', () => {
      React.useState = jest
        .fn()
        .mockReturnValueOnce(['', jest.fn()]) // reasonValue
        .mockReturnValueOnce([null, jest.fn()]) // reasonValidationError
        .mockReturnValueOnce([null, jest.fn()]) // ErrorMessage
      render(getDirectoryMerchantEntityDeleteModalContentComponent({
        entitiesToBeDeleted: [{entityRef: 'mock_ref_1', entityValue: mockEntityValue1}],
      }))
      const deletingButton = screen.getByRole('button', {name: 'Delete Location'})

      expect(deletingButton).toBeInTheDocument()
      expect(deletingButton).not.toBeDisabled()
    })
  })

  describe('Test non-happy path functionality', () => {
    beforeEach(() => {
      jest.clearAllMocks()
      React.useState = jest
        .fn()
        .mockReturnValueOnce(['', jest.fn()]) // reasonValue
        .mockReturnValueOnce([null, jest.fn()]) // reasonValidationError
        .mockReturnValueOnce(['mock_error', jest.fn()]) // ErrorMessage
    })

    it('should render an error message if present', () => {
      render(getDirectoryMerchantEntityDeleteModalContentComponent())
      expect(screen.getByText('mock_error')).toBeInTheDocument()
    })

    it('should render a disabled button with correct label when reason is not provided', () => {
      render(getDirectoryMerchantEntityDeleteModalContentComponent())
      const deletingButton = screen.getByRole('button', {name: 'Delete Locations'})

      expect(deletingButton).toBeInTheDocument()
      expect(deletingButton).toBeDisabled()
    })

    it('should render a disabled button with correct label when deletion is in progress', () => {
      render(getDirectoryMerchantEntityDeleteModalContentComponent({isDeleteLoading: true}))
      const deletingButton = screen.getByRole('button', {name: 'Deleting Locations...'})

      React.useState = jest
        .fn()
        .mockReturnValueOnce(['mock_reason', jest.fn()]) // reasonValue
        .mockReturnValueOnce([null, jest.fn()]) // reasonValidationError
        .mockReturnValueOnce(['mock_error', jest.fn()]) // ErrorMessage

      expect(deletingButton).toBeInTheDocument()
      expect(deletingButton).toBeDisabled()
    })


  })
})
