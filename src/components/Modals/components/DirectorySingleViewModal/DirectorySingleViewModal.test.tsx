import React from 'react'
import {render, screen} from '@testing-library/react'
import DirectorySingleViewModal from 'components/Modals/components/DirectorySingleViewModal'
import {Provider} from 'react-redux'
import configureStore from 'redux-mock-store'
import {PaymentSchemeSlug} from 'utils/enums'

jest.mock('components/Tag', () => () => <div data-testid='deleting-tag'></div>)

jest.mock('components/Modal', () => ({
  __esModule: true,
  default ({modalHeader, children}: Record<string, React.ReactNode>) {
    return (
      <div>
        <h1>{modalHeader}</h1>
        {children}
      </div>
    )
  },
}))

jest.mock('components/Modals/components/DirectorySingleViewModal/components/SingleViewMid',
  () => () => <div data-testid='SingleViewMid' />)

jest.mock('components/Modals/components/DirectorySingleViewModal/components/SingleViewLocation',
  () => () => <div data-testid='SingleViewLocation' />)

jest.mock('components/Modals/components/DirectorySingleViewModal/components/SingleViewSecondaryMid',
  () => () => <div data-testid='SingleViewSecondaryMid' />)

jest.mock('components/Modals/components/DirectorySingleViewModal/components/SingleViewPsimi',
  () => () => <div data-testid='SingleViewPsimi' />)

jest.mock('components/Modals/components/DirectorySingleViewModal/components/SingleViewComments',
  () => () => <div data-testid='SingleViewComments' />)

let mockDeleteMidIsLoading = false

jest.mock('hooks/useDirectoryMids', () => ({
  useDirectoryMids: jest.fn().mockImplementation(() => ({
    deleteMerchantMid: jest.fn(),
    deleteMerchantMidIsSuccess: false,
    deleteMerchantMidIsLoading: mockDeleteMidIsLoading,
    deleteMerchantMidError: null,
    resetDeleteMerchantMidResponse: jest.fn(),
  })),
}))

jest.mock('hooks/useDirectorySecondaryMids', () => ({
  useDirectorySecondaryMids: jest.fn().mockImplementation(() => ({
    deleteMerchantSecondaryMid: jest.fn(),
    deleteMerchantSecondaryMidIsSuccess: false,
    deleteMerchantSecondaryMidIsLoading: false,
    deleteMerchantSecondaryMidError: null,
    resetDeleteMerchantSecondaryMidResponse: jest.fn(),
  })),
}))

jest.mock('hooks/useDirectoryPsimis', () => ({
  useDirectoryPsimis: jest.fn().mockImplementation(() => ({
    deleteMerchantPsimi: jest.fn(),
    deleteMerchantPsimiIsSuccess: false,
    deleteMerchantPsimiIsLoading: false,
    deleteMerchantPsimiError: null,
    resetDeleteMerchantPsimiResponse: jest.fn(),
  })),
}))

jest.mock('hooks/useDirectoryLocations', () => ({
  useDirectoryLocations: jest.fn().mockImplementation(() => ({
    deleteMerchantLocation: jest.fn(),
    deleteMerchantLocationIsSuccess: false,
    deleteMerchantLocationIsLoading: false,
    deleteMerchantLocationError: null,
    resetDeleteMerchantLocationResponse: jest.fn(),
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
        payment_scheme_slug: PaymentSchemeSlug.VISA,
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
      .mockReturnValueOnce(['', jest.fn()]) // setEntityHeading
      .mockReturnValueOnce([false, jest.fn()]) // setCopyButtonClicked
      .mockReturnValue([null, jest.fn()]) // setErrorMessage
      .mockReturnValue([false, jest.fn()]) // setIsInDeleteConfirmationState
      .mockReturnValue([false, jest.fn()]) // setIsInLocationEditState
      .mockReturnValue([false, jest.fn()]) // isEntityFound
      .mockReturnValue([false, jest.fn()]) // shouldDisplayFooterEditButton
      .mockReturnValue(['', jest.fn()]) // entity Ref
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
      .mockReturnValueOnce(['', jest.fn()]) // setEntityHeading
      .mockReturnValueOnce([false, jest.fn()]) // setCopyButtonClicked
      .mockReturnValueOnce([mockErrorMessage, jest.fn()]) // setErrorMessage
      .mockReturnValue([false, jest.fn()]) // setIsInDeleteConfirmationState
      .mockReturnValue([false, jest.fn()]) // setIsInLocationEditState
      .mockReturnValue([false, jest.fn()]) // isEntityFound
      .mockReturnValue([false, jest.fn()]) // shouldDisplayFooterEditButton
      .mockReturnValue(['', jest.fn()]) // entity Ref

    render(getDirectorySingleViewModalComponent())
    expect(screen.getByText(mockErrorMessage)).toBeInTheDocument()
  })

  it('should render the location Edit button', () => {
    useRouter.mockImplementation(() => ({
      query: {
        planId: 'mock_plan_id',
        merchantId: 'mock_merchant_id',
        tab: 'locations',
        ref: mockMidRef,
      },
    }))

    React.useState = jest.fn()
      .mockReturnValueOnce(['', jest.fn()]) // setEntityHeading
      .mockReturnValueOnce([false, jest.fn()]) // setCopyButtonClicked
      .mockReturnValueOnce([null, jest.fn()]) // setErrorMessage
      .mockReturnValueOnce([false, jest.fn()]) // setIsInDeleteConfirmationState
      .mockReturnValueOnce([false, jest.fn()]) // isInLocationEditState
      .mockReturnValueOnce([true, jest.fn()]) // isEntityFound
      .mockReturnValueOnce([true, jest.fn()]) // shouldDisplayEditButton
      .mockReturnValue([false, jest.fn()]) // shouldDisplayFooterEditButton
      .mockReturnValue(['', jest.fn()]) // entity Ref

    render(getDirectorySingleViewModalComponent())
    expect(screen.getByRole('button', {name: 'Edit'})).toBeInTheDocument()
  })

  it('should disable render the location Edit button when entity is not loaded', () => {
    useRouter.mockImplementation(() => ({
      query: {
        planId: 'mock_plan_id',
        merchantId: 'mock_merchant_id',
        tab: 'locations',
        ref: mockMidRef,
      },
    }))

    React.useState = jest.fn()
      .mockReturnValueOnce(['', jest.fn()]) // setEntityHeading
      .mockReturnValueOnce([false, jest.fn()]) // setCopyButtonClicked
      .mockReturnValueOnce([null, jest.fn()]) // setErrorMessage
      .mockReturnValueOnce([false, jest.fn()]) // setIsInDeleteConfirmationState
      .mockReturnValueOnce([false, jest.fn()]) // isInLocationEditState
      .mockReturnValueOnce([false, jest.fn()]) // isEntityFound
      .mockReturnValueOnce([true, jest.fn()]) // shouldDisplayEditButton
      .mockReturnValue([false, jest.fn()]) // shouldDisplayFooterEditButton
      .mockReturnValue(['', jest.fn()]) // entity Ref

    render(getDirectorySingleViewModalComponent())
    expect(screen.getByRole('button', {name: 'Edit'})).toBeDisabled()
  })

  describe('Test delete confirmation state', () => {
    beforeEach(() => {
      jest.clearAllMocks()
      React.useState = jest.fn()
        .mockReturnValueOnce(['', jest.fn()]) // setEntityHeading
        .mockReturnValueOnce([false, jest.fn()]) // setCopyButtonClicked
        .mockReturnValueOnce([null, jest.fn()]) // setErrorMessage
        .mockReturnValueOnce([true, jest.fn()]) // setIsInDeleteConfirmationState
        .mockReturnValueOnce([false, jest.fn()]) // isInLocationEditState
        .mockReturnValueOnce([false, jest.fn()]) // isEntityFound
        .mockReturnValueOnce([true, jest.fn()]) // shouldDisplayEditButton
        .mockReturnValue([false, jest.fn()]) // shouldDisplayFooterEditButton
        .mockReturnValue(['', jest.fn()]) // entity Ref

    })

    it('should display delete confirmation message with correct buttons', () => {
      mockDeleteMidIsLoading = false
      render(getDirectorySingleViewModalComponent())


      expect(screen.getByText('Are you sure you want to delete this MID?')).toBeInTheDocument()
      expect(screen.getByRole('button', {name: 'Close MID delete'})).toBeInTheDocument()
      expect(screen.getByRole('button', {name: 'Delete MID'})).toBeInTheDocument()
    })
  })

  describe('Test is deleting state', () => {
    it('should render a disabled deleting button', () => {
      mockDeleteMidIsLoading = true
      render(getDirectorySingleViewModalComponent())
      const deletingButton = screen.getByRole('button', {name: 'Deleting'})
      expect(deletingButton).toBeInTheDocument()
      expect(deletingButton).toBeDisabled()
    })
  })
})
