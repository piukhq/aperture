import React from 'react'
import {fireEvent, render, screen} from '@testing-library/react'
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

const mockPostMerchantSecondaryMidOnboarding = jest.fn()
const mockPostMerchantSecondaryMidOffboarding = jest.fn()

jest.mock('hooks/useMidManagementSecondaryMids', () => ({
  useMidManagementSecondaryMids: jest.fn().mockImplementation(() => ({
    postMerchantSecondaryMidOnboarding: mockPostMerchantSecondaryMidOnboarding,
    postMerchantSecondaryMidIsLoading: false,
    postMerchantSecondaryMidIsSuccess: false,
    resetPostMerchantSecondaryMidOnboardingResponse: jest.fn(),
    postMerchantSecondaryMidOffboarding: mockPostMerchantSecondaryMidOffboarding,
    postMerchantSecondaryMidOffboardingIsLoading: false,
    postMerchantSecondaryMidOffboardingIsSuccess: false,
    resetPostMerchantSecondaryMidOffboardingResponse: jest.fn(),
  })),
}))

const getSingleViewSecondaryMidDetailsComponent = () => (
  <SingleViewSecondaryMidDetails secondaryMid={mockMerchantSecondaryMid} />
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
    it('should render the Harmonia Status heading', () => {
      render(getSingleViewSecondaryMidDetailsComponent())
      expect(screen.getAllByRole('heading')[2]).toHaveTextContent('HARMONIA STATUS')
    })

    describe('Test Onboarded status', () => {
      it('should render the correct Harmonia Status value', () => {
        mockMerchantSecondaryMid.txm_status = 'onboarded'
        render(getSingleViewSecondaryMidDetailsComponent())
        expect(screen.getByTestId('harmonia-status')).toHaveTextContent('Onboarded')
      })

      it('should render the offboard button', () => {
        render(getSingleViewSecondaryMidDetailsComponent())
        expect(screen.getByRole('button', {name: 'Offboard'})).toBeInTheDocument()
      })

      it('should call the postOffboarding function when clicked', () => {
        render(getSingleViewSecondaryMidDetailsComponent())
        fireEvent.click(screen.getByRole('button', {name: 'Offboard'}))
        expect(mockPostMerchantSecondaryMidOffboarding).toHaveBeenCalled()
      })
    })

    describe('Test Not Onboarded status', () => {
      it('should render the correct Harmonia Status value', () => {
        mockMerchantSecondaryMid.txm_status = 'not_onboarded'
        render(getSingleViewSecondaryMidDetailsComponent())
        expect(screen.getByTestId('harmonia-status')).toHaveTextContent('Not Onboarded')
      })

      it('should render the onboard button', () => {
        render(getSingleViewSecondaryMidDetailsComponent())
        expect(screen.getByRole('button', {name: 'Onboard'})).toBeInTheDocument()
      })

      it('should call the postOnboarding function when clicked', () => {
        render(getSingleViewSecondaryMidDetailsComponent())
        fireEvent.click(screen.getByRole('button', {name: 'Onboard'}))
        expect(mockPostMerchantSecondaryMidOnboarding).toHaveBeenCalled()
      })
    })

    describe('Test Onboarding status', () => {
      it('should render the correct Harmonia Status value', () => {
        mockMerchantSecondaryMid.txm_status = 'onboarding'
        render(getSingleViewSecondaryMidDetailsComponent())
        expect(screen.getByTestId('harmonia-status')).toHaveTextContent('Onboarding')
      })

      it('should render the disabled onboarding button', () => {
        render(getSingleViewSecondaryMidDetailsComponent())
        expect(screen.getByRole('button', {name: 'Onboarding'})).toBeDisabled()
      })
    })

    describe('Test Offboarding status', () => {
      it('should render the correct Harmonia Status value', () => {
        mockMerchantSecondaryMid.txm_status = 'offboarding'
        render(getSingleViewSecondaryMidDetailsComponent())
        expect(screen.getByTestId('harmonia-status')).toHaveTextContent('Offboarding')
      })

      it('should render the disabled offboarding button', () => {
        render(getSingleViewSecondaryMidDetailsComponent())
        expect(screen.getByRole('button', {name: 'Offboarding'})).toBeDisabled()
      })
    })
  })
})
