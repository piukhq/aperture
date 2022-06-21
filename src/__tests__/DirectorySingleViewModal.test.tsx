import React from 'react'
import {render, screen} from '@testing-library/react'
import DirectorySingleViewModal from 'components/DirectorySingleViewModal'
import {Provider} from 'react-redux'
import configureStore from 'redux-mock-store'

jest.mock('components/Tag', () => () => <div data-testid='tag'></div>)

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

let mockDeleteMidIsLoading = false

jest.mock('hooks/useMidManagementMids', () => ({
  useMidManagementMids: jest.fn().mockImplementation(() => ({
    deleteMerchantMid: jest.fn(),
    deleteMerchantMidIsSuccess: false,
    deleteMerchantMidIsLoading: mockDeleteMidIsLoading,
    deleteMerchantMidError: null,
    resetDeleteMerchantMidResponse: jest.fn(),
    deleteMerchantSecondaryMid: jest.fn(),
    deleteMerchantSecondaryMidIsSuccess: false,
    deleteMerchantSecondaryMidIsLoading: false,
    deleteMerchantSecondaryMidError: null,
    resetDeleteMerchantSecondaryMidResponse: jest.fn(),
    deleteMerchantLocation: jest.fn(),
    deleteMerchantLocationIsSuccess: false,
    deleteMerchantLocationIsLoading: false,
    deleteMerchantLocationError: null,
    resetDeleteMerchantLocationResponse: jest.fn(),
    deleteMerchantIdentifier: jest.fn(),
    deleteMerchantIdentifierIsSuccess: false,
    deleteMerchantIdentifierIsLoading: false,
    deleteMerchantIdentifierError: null,
    resetDeleteMerchantIdentifierResponse: jest.fn(),
  })),
}))

const mockMidRef = 'mock_mid_ref'
const mockMid = 'mock_mid'
const mockVisaBin = 'mock_visa_bin'
const mockPayrollEnrollmentStatus = 'mock_payroll_enrollment_status'
const mockDateAdded = 'mock_date_added'
const mockTxmStatus = 'mock_txm_status'

const mockMerchantDetailsState = {
  directoryMerchant: {
    selectedEntity: {
      mid_ref: mockMidRef,
      mid_metadata: {
        payment_scheme_code: 1,
        mid: mockMid,
        visa_bin: mockVisaBin,
        payment_enrolment_status: mockPayrollEnrollmentStatus,
      },
      date_added: mockDateAdded,
      txm_status: mockTxmStatus,
    },
  },
}

const useRouter = jest.spyOn(require('next/router'), 'useRouter')

const mockStoreFn = configureStore([])
const store = mockStoreFn({...mockMerchantDetailsState})

const getDirectorySingleViewModalComponent = (passedStore = undefined) => (
  <Provider store={passedStore || store}>
    <DirectorySingleViewModal />
  </Provider>
)

describe('DirectorySingleViewModal', () => {
  beforeEach(() => {
    jest.clearAllMocks()

    useRouter.mockImplementation(() => ({
      query: {
        planId: 'mock_plan_id',
        merchantId: 'mock_merchant_id',
        tab: 'mids',
        ref: mockMidRef,
      },
    }))

    React.useState = jest.fn()
      .mockReturnValueOnce(['Details', jest.fn()]) // setTabSelected
      .mockReturnValueOnce(['', jest.fn()]) // setEntityHeading
      .mockReturnValueOnce([false, jest.fn()]) // setCopyButtonClicked
      .mockReturnValue([null, jest.fn()]) // setErrorMessage
      .mockReturnValue([false, jest.fn()]) // setIsInDeleteConfirmationState
  })

  it('should render the Navigation tabs', () => {
    render(getDirectorySingleViewModalComponent())
    expect(screen.getByText('Details')).toBeInTheDocument()
    expect(screen.getByText('Comments')).toBeInTheDocument()
  })

  it('should render the Copy Link button', () => {
    render(getDirectorySingleViewModalComponent())
    expect(screen.getByRole('button', {name: 'Copy link'})).toBeInTheDocument()
  })

  it('should render the Delete button', () => {
    render(getDirectorySingleViewModalComponent())
    expect(screen.getByRole('button', {name: 'Delete'})).toBeInTheDocument()
  })

  it('should render the error message', () => {
    const mockErrorMessage = 'mock_error_message'

    React.useState = jest.fn()
      .mockReturnValueOnce(['Details', jest.fn()]) // setTabSelected
      .mockReturnValueOnce(['', jest.fn()]) // setEntityHeading
      .mockReturnValueOnce([false, jest.fn()]) // setCopyButtonClicked
      .mockReturnValueOnce([mockErrorMessage, jest.fn()]) // setErrorMessage
      .mockReturnValue([false, jest.fn()]) // setIsInDeleteConfirmationState

    render(getDirectorySingleViewModalComponent())
    expect(screen.getByText(mockErrorMessage)).toBeInTheDocument()
  })

  describe('Test is deleting state', () => {
    it('should display', () => {
      mockDeleteMidIsLoading = true
      render(getDirectorySingleViewModalComponent())
      expect(screen.getByTestId('tag')).toBeInTheDocument()
    })
  })

  describe('Test delete confirmation state', () => {
    beforeEach(() => {
      React.useState = jest.fn()
        .mockReturnValueOnce(['Details', jest.fn()]) // setTabSelected
        .mockReturnValueOnce(['', jest.fn()]) // setEntityHeading
        .mockReturnValueOnce([false, jest.fn()]) // setCopyButtonClicked
        .mockReturnValueOnce([null, jest.fn()]) // setErrorMessage
        .mockReturnValue([true, jest.fn()]) // setIsInDeleteConfirmationState
    })

    it('should display delete confirmation message with correct buttons', () => {
      render(getDirectorySingleViewModalComponent())
      expect(screen.getByText('Are you sure you want to delete this MID?')).toBeInTheDocument()
      expect(screen.getByRole('button', {name: 'Close MID delete'})).toBeInTheDocument()
      expect(screen.getByRole('button', {name: 'Delete MID'})).toBeInTheDocument()
    })
  })
})


