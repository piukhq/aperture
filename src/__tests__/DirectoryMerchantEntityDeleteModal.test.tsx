import React from 'react'
import {fireEvent, render, screen} from '@testing-library/react'
import {DirectoryMerchantEntityDeleteModal} from 'components'
import {Provider} from 'react-redux'
import configureStore from 'redux-mock-store'

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
let mockEntitiesToBeDeleted = [{entityRef: mockEntityValue2, entityValue: mockEntityValue2}]

let mockIsDeleteLoading = false
const mockIsDeleteSuccess = false
let mockIsHarmoniaEntity = true
const mockResetDeleteResponseFn = jest.fn()

const mockStoreFn = configureStore([])
const store = mockStoreFn({
  modalRequested: null,
})

const getDirectoryMerchantEntityDeleteModalContentComponent = (passedStore = undefined) => (
  <Provider store={passedStore || store}>
    <DirectoryMerchantEntityDeleteModal
      entitiesToBeDeleted={mockEntitiesToBeDeleted}
      deleteButtonClickFn={mockDeleteButtonClickFn}
      deleteError={mockError}
      isDeleteLoading={mockIsDeleteLoading}
      isDeleteSuccess={mockIsDeleteSuccess}
      isHarmoniaEntity={mockIsHarmoniaEntity}
      resetDeleteResponseFn={mockResetDeleteResponseFn}
    />
  </Provider>
)

describe('DirectoryMerchantEntityDeleteModal', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    React.useState = jest
      .fn()
      .mockReturnValueOnce(['', jest.fn()]) // ErrorMessage
  })

  it('should render the correct modal header for a singular entity', () => {
    render(getDirectoryMerchantEntityDeleteModalContentComponent())

    expect(screen.getByRole('heading', {name: 'Delete Location'})).toBeInTheDocument()
  })

  it('should render the correct modal header for a plural entity', () => {
    mockEntitiesToBeDeleted = [
      {entityRef: mockEntityValue1, entityValue: mockEntityValue1},
      {entityRef: mockEntityValue2, entityValue: mockEntityValue2},
    ]
    render(getDirectoryMerchantEntityDeleteModalContentComponent())
    expect(screen.getByRole('heading', {name: 'Delete Locations'})).toBeInTheDocument()
  })

  it('should render the correct first paragraph for the entity', () => {
    render(getDirectoryMerchantEntityDeleteModalContentComponent())

    expect(screen.getByTestId('paragraph-1')).toHaveTextContent('Are you sure you want to delete the following Locations:')
  })

  it('should render the harmonia paragraph', () => {
    render(getDirectoryMerchantEntityDeleteModalContentComponent())
    expect(screen.getByText('Locations will also be offboarded from Harmonia')).toBeInTheDocument()
  })

  it('should not render the harmonia paragraph', () => {
    mockIsHarmoniaEntity = false
    render(getDirectoryMerchantEntityDeleteModalContentComponent())
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
      render(getDirectoryMerchantEntityDeleteModalContentComponent())
      fireEvent.click(screen.getByRole('button', {name: 'Delete Locations'}))

      expect(mockDeleteButtonClickFn).toHaveBeenCalledTimes(1)
    })
  })

  describe('Test non-happy path functionality', () => {
    beforeEach(() => {
      jest.clearAllMocks()
      mockIsDeleteLoading = true
      React.useState = jest.fn()
        .mockReturnValueOnce(['mock_error', jest.fn])
    })

    it('should render an error message if present', () => {
      render(getDirectoryMerchantEntityDeleteModalContentComponent())
      expect(screen.getByText('mock_error')).toBeInTheDocument()
    })

    it('should render a tag with correct label when deletion is in progress', () => {
      render(getDirectoryMerchantEntityDeleteModalContentComponent())
      expect(screen.getByTestId('tag-label')).toHaveTextContent('Deleting...')
    })
  })
})