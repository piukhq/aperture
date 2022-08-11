import React from 'react'
import {fireEvent, render, screen} from '@testing-library/react'
import {DirectoryMidDeleteModal} from 'components'
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


const mockMidValue1 = 'mock_mid_value'
const mockMidRefValue1 = 'mock_mid_ref_value'
const mockMid1 = {
  mid_ref: mockMidRefValue1,
  mid_metadata: {
    mid: mockMidValue1,
  },
}

const mockMidValue2 = 'mock_mid_value2'
const mockMidRefValue2 = 'mock_mid_ref_value2'
const mockMid2 = {
  mid_ref: mockMidRefValue2,
  mid_metadata: {
    mid: mockMidValue2,
  },
}

const mockStoreFn = configureStore([])
const store = mockStoreFn({
  directoryMerchant: {
    selectedEntityCheckedSelection: [mockMid1, mockMid2],
  },
})

const getDirectoryMidDeleteModalComponent = (passedStore = undefined) => (
  <Provider store={passedStore || store}>
    <DirectoryMidDeleteModal />
  </Provider>
)

describe('DirectoryMidDeleteModal', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('Test static content', () => {
    it('should render the correct Heading for multiple mids', () => {
      render(getDirectoryMidDeleteModalComponent())
      expect(screen.getByRole('heading', {name: 'Delete MIDs'})).toBeInTheDocument()
    })

    it('should render the correct copy for the modal', () => {
      render(getDirectoryMidDeleteModalComponent())

      expect(screen.getByTestId('paragraph-1')).toHaveTextContent('Are you sure you want to delete the following MIDs:')
      expect(screen.getByText(/MIDs will also be offboarded from Harmonia/)).toBeInTheDocument()
    })

    it('should render the correct mids values', () => {
      render(getDirectoryMidDeleteModalComponent())

      expect(screen.getByText(mockMidValue1)).toBeInTheDocument()
      expect(screen.getByText(mockMidValue2)).toBeInTheDocument()
    })

    it('should render the delete button with correct label', () => {
      render(getDirectoryMidDeleteModalComponent())
      expect(screen.getByRole('button', {name: 'Delete MIDs'})).toBeInTheDocument()
    })

    it('should render singular mid copy when only one mid is present', () => {
      render(getDirectoryMidDeleteModalComponent(
        mockStoreFn({
          directoryMerchant: {
            selectedEntityCheckedSelection: [mockMid1],
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
      render(getDirectoryMidDeleteModalComponent())
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
      render(getDirectoryMidDeleteModalComponent())
      expect(screen.getByText('mock_error')).toBeInTheDocument()
    })

    it('should label the delete button correctly when deletion is in progress', () => {
      render(getDirectoryMidDeleteModalComponent())
      expect(screen.getByRole('button', {name: 'Deleting...'})).toBeInTheDocument()
    })
  })

})
