import React from 'react'
import {render, screen} from '@testing-library/react'
import SingleViewSecondaryMidDetails from 'components/Modals/components/DirectorySingleViewModal/components/SingleViewSecondaryMid/components/SingleViewSecondaryMidDetails'

jest.mock('components/Dropdown', () => () => <div data-testid='dropdown' />)

const mockSecondaryMidRef = 'mock_secondary_mid_ref'
const mockSecondaryMid = 'mock_secondary_mid'
const mockPayrollEnrollmentStatus = 'mock_payroll_enrollment_status'
const mockPaymentSchemeStoreName = 'mock_payment_scheme_store_name'
const mockDateAdded = 'mock_date_added'
const mockTxmStatus = 'mock_txm_status'

const mockMerchantSecondaryMid = {
  secondary_mid_ref: mockSecondaryMidRef,
  secondary_mid_metadata: {
    payment_scheme_code: 1,
    secondary_mid: mockSecondaryMid,
    payment_enrolment_status: mockPayrollEnrollmentStatus,
    payment_scheme_store_name: mockPaymentSchemeStoreName,
  },
  date_added: mockDateAdded,
  txm_status: mockTxmStatus,
}

const getSingleViewSecondaryMidDetailsComponent = () => (
  <SingleViewSecondaryMidDetails secondaryMid={mockMerchantSecondaryMid} />
)

describe('SingleViewSecondaryMidDetails', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    // displayValue state value
    React.useState = jest.fn().mockReturnValue(['', jest.fn()])
  })

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
    it('should render the Harmonia Status heading', () => {
      render(getSingleViewSecondaryMidDetailsComponent())
      expect(screen.getAllByRole('heading')[2]).toHaveTextContent('HARMONIA STATUS')
    })
    it('should render the Edit button', () => {
      render(getSingleViewSecondaryMidDetailsComponent())
      expect(screen.getByRole('button', {name: 'Edit'})).toBeInTheDocument()
    })
  })
})
