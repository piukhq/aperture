import React from 'react'
import {render, screen} from '@testing-library/react'
import {PaymentSchemeSlug} from 'utils/enums'
import {Provider} from 'react-redux'
import configureStore from 'redux-mock-store'
import SingleViewSecondaryMidDetails from 'components/Modals/components/DirectorySingleViewModal/components/SingleViewSecondaryMid/components/SingleViewSecondaryMidDetails'


jest.mock('components/Dropdown', () => () => <div data-testid='dropdown' />)
jest.mock('components/Modals/components/DirectorySingleViewModal/components/HarmoniaStatus', () => () => <div data-testid='harmonia-status' />)

const mockSecondaryMidRef = 'mock_secondary_mid_ref'
const mockSecondaryMid = 'mock_secondary_mid'
const mockPayrollEnrollmentStatus = 'mock_payroll_enrollment_status'
const mockPaymentSchemeStoreName = 'mock_payment_scheme_store_name'
const mockDateAdded = 'mock_date_added'
const mockTxmStatus = 'mock_txm_status'

const mockMerchantSecondaryMid = {
  secondary_mid_ref: mockSecondaryMidRef,
  secondary_mid_metadata: {
    payment_scheme_slug: PaymentSchemeSlug.VISA,
    secondary_mid: mockSecondaryMid,
    payment_enrolment_status: mockPayrollEnrollmentStatus,
    payment_scheme_store_name: mockPaymentSchemeStoreName,
  },
  date_added: mockDateAdded,
  txm_status: mockTxmStatus,
}

let mockIsFetching = false

jest.mock('hooks/useDirectorySecondaryMids', () => ({
  useDirectorySecondaryMids: jest.fn().mockImplementation(() => ({
    postMerchantSecondaryMidsOnboarding: jest.fn(),
    postMerchantSecondaryMidsOffboarding: jest.fn(),
    getMerchantSecondaryMidIsFetching: mockIsFetching,
  })),
}))

const mockStoreFn = configureStore([])

const store = mockStoreFn({
  directoryMerchant: {
    hasHarmoniaStatusUpdate: false,
  },
})

const getSingleViewSecondaryMidDetailsComponent = (passedStore = undefined) => (
  <Provider store={passedStore || store}>
    <SingleViewSecondaryMidDetails secondaryMid={mockMerchantSecondaryMid} />
  </Provider>
)

const useRouter = jest.spyOn(require('next/router'), 'useRouter')
useRouter.mockImplementation(() => ({
  query: {
    planId: 'mock_plan_id',
    merchantId: 'mock_merchant_id',
    ref: 'mock_ref',
  },
}))

describe('SingleViewSecondaryMidDetails', () => {
  // TODO: Add functionality tests into each section
  describe('Test Date Added', () => {
    it('should render the Date Added heading', () => {
      render(getSingleViewSecondaryMidDetailsComponent())
      expect(screen.getAllByRole('heading')[0]).toHaveTextContent('DATE ADDED')
    })
    it('should render the Date Added value', () => {
      render(getSingleViewSecondaryMidDetailsComponent())
      expect(screen.getByText(mockDateAdded)).toBeInTheDocument()
    })
  })

  describe('Test Payment Scheme', () => {
    it('should render the Payment Scheme heading', () => {
      render(getSingleViewSecondaryMidDetailsComponent())
      expect(screen.getAllByRole('heading')[1]).toHaveTextContent('PAYMENT SCHEME')
    })
    it('should render the correct Payment Scheme value', () => {
      render(getSingleViewSecondaryMidDetailsComponent())
      expect(screen.getByText('Visa')).toBeInTheDocument()
    })
  })

  describe('Test Payment Scheme Status', () => {
    it('should render the Payment Scheme Status heading', () => {
      render(getSingleViewSecondaryMidDetailsComponent())
      expect(screen.getByText('PAYMENT SCHEME STATUS')).toBeInTheDocument()
    })
    it('should render the Dropdown component', () => {
      render(getSingleViewSecondaryMidDetailsComponent())
      expect(screen.queryByTestId('dropdown')).toBeInTheDocument()
    })
  })

  describe('Test Harmonia Status', () => {
    it('should render the Harmonia Status component', () => {
      render(getSingleViewSecondaryMidDetailsComponent())
      expect(screen.getByTestId('harmonia-status')).toBeInTheDocument()
    })
  })

  describe('Test refresh button', () => {
    it('should render the "Refresh" button text when not refreshing', () => {
      render(getSingleViewSecondaryMidDetailsComponent())
      expect(screen.getByTestId('secondary-mid-refresh-button')).toHaveTextContent('Refresh')
    })

    it('should render the "Refreshing" button text when not refreshing', () => {
      mockIsFetching = true
      render(getSingleViewSecondaryMidDetailsComponent())
      expect(screen.getByTestId('secondary-mid-refresh-button')).toHaveTextContent('Refreshing')
    })
  })
})
