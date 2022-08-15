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

const useRouter = jest.spyOn(require('next/router'), 'useRouter')
useRouter.mockImplementation(() => ({
  query: {
    planId: 'mock_plan_id',
    merchantId: 'mock_merchant_id',
    tab: 'mids', // This must match once of the enum values in DirectorySingleViewEntities
  },
}))

const mockDeleteMerchantMid = jest.fn()
let mockDeleteMerchantMidIsLoading = false
jest.mock('hooks/useMidManagementMids', () => ({
  useMidManagementMids: jest.fn().mockImplementation(() => ({
    deleteMerchantMid: mockDeleteMerchantMid,
    deleteMerchantMidIsLoading: mockDeleteMerchantMidIsLoading,
  })),
}))

const mockEntityValue1 = 'mock_entity_value_1'
const mockEntityValue2 = 'mock_entity_value_2'

const mockStoreFn = configureStore([])
const store = mockStoreFn({
  directoryMerchant: {
    selectedEntityCheckedSelection: [
      {entityRef: mockEntityValue1, entityValue: mockEntityValue1},
      {entityRef: mockEntityValue2, entityValue: mockEntityValue2}],
  },
})

const getDirectoryMerchantEntityDeleteModalComponent = (passedStore = undefined) => (
  <Provider store={passedStore || store}>
    <DirectoryMerchantEntityDeleteModal />
  </Provider>
)

describe('DirectoryMerchantEntityDeleteModal', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('Test static content', () => {
    it('should render the correct Heading for multiple entities', () => {
      render(getDirectoryMerchantEntityDeleteModalComponent())
      expect(screen.getByRole('heading', {name: 'Delete MIDs'})).toBeInTheDocument()
    })

    it('should render the correct copy for the modal', () => {
      render(getDirectoryMerchantEntityDeleteModalComponent())

      expect(screen.getByTestId('paragraph-1')).toHaveTextContent('Are you sure you want to delete the following MIDs:')
      expect(screen.getByText(/MIDs will also be offboarded from Harmonia/)).toBeInTheDocument()
    })

    it('should render the correct entity values', () => {
      render(getDirectoryMerchantEntityDeleteModalComponent())

      expect(screen.getByText(mockEntityValue1)).toBeInTheDocument()
      expect(screen.getByText(mockEntityValue2)).toBeInTheDocument()
    })

    it('should render the delete button with correct label', () => {
      render(getDirectoryMerchantEntityDeleteModalComponent())
      expect(screen.getByRole('button', {name: 'Delete MIDs'})).toBeInTheDocument()
    })

    it('should render singular mid copy when only one entity is present', () => {
      render(getDirectoryMerchantEntityDeleteModalComponent(
        mockStoreFn({
          directoryMerchant: {
            selectedEntityCheckedSelection: [{entityRef: mockEntityValue1, entityValue: mockEntityValue1}],
          },
        })
      ))

      expect(screen.getByRole('heading', {name: 'Delete MID'})).toBeInTheDocument()
      expect(screen.getByTestId('paragraph-1')).toHaveTextContent('Are you sure you want to delete the following MID:')
      expect(screen.getByText(/MID will also be offboarded from Harmonia/)).toBeInTheDocument()
      expect(screen.getByRole('button', {name: 'Delete MID'})).toBeInTheDocument()
    })
  })

  describe('Test happy path functionality', () => {
    it('should call the deleteMerchantMid function when the delete button is clicked', () => {
      render(getDirectoryMerchantEntityDeleteModalComponent())
      fireEvent.click(screen.getByRole('button', {name: 'Delete MIDs'}))

      expect(mockDeleteMerchantMid).toHaveBeenCalledTimes(1)
    })
  })

  describe('Test non-happy path functionality', () => {
    beforeEach(() => {
      jest.clearAllMocks()
      mockDeleteMerchantMidIsLoading = true
      React.useState = jest.fn()
        .mockReturnValueOnce(['mock_error'])
    })

    it('should render an error message if present', () => {
      render(getDirectoryMerchantEntityDeleteModalComponent())
      expect(screen.getByText('mock_error')).toBeInTheDocument()
    })

    it('should label the delete button correctly when deletion is in progress', () => {
      render(getDirectoryMerchantEntityDeleteModalComponent())
      expect(screen.getByRole('button', {name: 'Deleting...'})).toBeInTheDocument()
    })
  })
})
