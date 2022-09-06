import React from 'react'
import {fireEvent, render, screen} from '@testing-library/react'
import SingleViewIdentifierDetails from 'components/Modals/components/DirectorySingleViewModal/components/SingleViewIdentifier/components/SingleViewIdentifierDetails'

jest.mock('components/Dropdown', () => () => <div data-testid='dropdown' />)

const mockIdentifierRef = 'mock_identifier_ref'
const mockValue = 'mock_value'
const mockPaymentSchemeMerchantName = 'mock_payment_scheme_merchant_name'
const mockDateAdded = 'mock_date_added'
const mockIdentifierStatus = 'mock_txm_status'
const mockTxmStatus = 'onboarded' // has to be a value provided by DirectoryTxmStatus enum

const mockMerchantIdentifier = {
  identifier_ref: mockIdentifierRef,
  identifier_metadata: {
    payment_scheme_code: 1,
    value: mockValue,
    payment_scheme_merchant_name: mockPaymentSchemeMerchantName,
  },
  date_added: mockDateAdded,
  identifier_status: mockIdentifierStatus,
  txm_status: mockTxmStatus,
}

const mockPostMerchantIdentifierOnboarding = jest.fn()
const mockPostMerchantIdentifierOffboarding = jest.fn()

jest.mock('hooks/useMidManagementIdentifiers', () => ({
  useMidManagementIdentifiers: jest.fn().mockImplementation(() => ({
    postMerchantIdentifierOnboarding: mockPostMerchantIdentifierOnboarding,
    postMerchantIdentifierIsLoading: false,
    postMerchantIdentifierIsSuccess: false,
    resetPostMerchantIdentifierOnboardingResponse: jest.fn(),
    postMerchantIdentifierOffboarding: mockPostMerchantIdentifierOffboarding,
    postMerchantIdentifierOffboardingIsLoading: false,
    postMerchantIdentifierOffboardingIsSuccess: false,
    resetPostMerchantIdentifierOffboardingResponse: jest.fn(),
  })),
}))

const useRouter = jest.spyOn(require('next/router'), 'useRouter')


const getSingleViewIdentifierDetailsComponent = () => (
  <SingleViewIdentifierDetails identifier={mockMerchantIdentifier} />
)

describe('SingleViewIdentifierDetails', () => {
  beforeEach(() => {
    useRouter.mockImplementation(() => ({
      query: {
        planId: 'mock_plan_id',
        merchantId: 'mock_merchant_id',
        ref: 'mock_identifier_ref',
      },
    }))
  })

  // TODO: Add functionality tests into each section
  describe('Test Date Added', () => {
    it('should render the Date Added heading', () => {
      render(getSingleViewIdentifierDetailsComponent())
      expect(screen.getAllByRole('heading')[0]).toHaveTextContent('DATE ADDED')
    })
    it('should render the Date Added value', () => {
      render(getSingleViewIdentifierDetailsComponent())
      expect(screen.getByText(mockDateAdded)).toBeInTheDocument()
    })
  })

  describe('Test Payment Scheme', () => {
    it('should render the Payment Scheme heading', () => {
      render(getSingleViewIdentifierDetailsComponent())
      expect(screen.getAllByRole('heading')[1]).toHaveTextContent('PAYMENT SCHEME')
    })

    it('should render the correct Payment Scheme value', () => {
      render(getSingleViewIdentifierDetailsComponent())
      expect(screen.getByText('Visa')).toBeInTheDocument()
    })
  })

  describe('Test Harmonia Status', () => {
    it('should render the Harmonia Status heading', () => {
      render(getSingleViewIdentifierDetailsComponent())
      expect(screen.getAllByRole('heading')[2]).toHaveTextContent('HARMONIA STATUS')
    })

    describe('Test Onboarded status', () => {
      it('should render the correct Harmonia Status value', () => {
        render(getSingleViewIdentifierDetailsComponent())
        expect(screen.getByTestId('harmonia-status')).toHaveTextContent('Onboarded')
      })

      it('should render the offboard button', () => {
        render(getSingleViewIdentifierDetailsComponent())
        expect(screen.getByRole('button', {name: 'Offboard'})).toBeInTheDocument()
      })

      it('should call the postOffboarding function when clicked', () => {
        render(getSingleViewIdentifierDetailsComponent())
        fireEvent.click(screen.getByRole('button', {name: 'Offboard'}))
        expect(mockPostMerchantIdentifierOffboarding).toHaveBeenCalled()
      })
    })

    describe('Test Not Onboarded status', () => {
      it('should render the correct Harmonia Status value', () => {
        render(<SingleViewIdentifierDetails identifier={{...mockMerchantIdentifier, txm_status: 'not_onboarded'}} />)
        expect(screen.getByTestId('harmonia-status')).toHaveTextContent('Not Onboarded')
      })

      it('should render the onboard button', () => {
        render(<SingleViewIdentifierDetails identifier={{...mockMerchantIdentifier, txm_status: 'not_onboarded'}} />)
        expect(screen.getByRole('button', {name: 'Onboard'})).toBeInTheDocument()
      })

      it('should call the postOnboarding function when clicked', () => {
        render(<SingleViewIdentifierDetails identifier={{...mockMerchantIdentifier, txm_status: 'not_onboarded'}} />)
        fireEvent.click(screen.getByRole('button', {name: 'Onboard'}))
        expect(mockPostMerchantIdentifierOnboarding).toHaveBeenCalled()
      })
    })

    describe('Test Onboarding status', () => {
      it('should render the correct Harmonia Status value', () => {
        render(<SingleViewIdentifierDetails identifier={{...mockMerchantIdentifier, txm_status: 'onboarding'}} />)
        expect(screen.getByTestId('harmonia-status')).toHaveTextContent('Onboarding')
      })

      it('should render the disabled onboarding button', () => {
        render(<SingleViewIdentifierDetails identifier={{...mockMerchantIdentifier, txm_status: 'onboarding'}} />)
        expect(screen.getByRole('button', {name: 'Onboarding'})).toBeDisabled()
      })
    })

    describe('Test Offboarding status', () => {
      it('should render the correct Harmonia Status value', () => {
        render(<SingleViewIdentifierDetails identifier={{...mockMerchantIdentifier, txm_status: 'offboarding'}} />)
        expect(screen.getByTestId('harmonia-status')).toHaveTextContent('Offboarding')
      })

      it('should render the disabled offboarding button', () => {
        render(<SingleViewIdentifierDetails identifier={{...mockMerchantIdentifier, txm_status: 'offboarding'}} />)
        expect(screen.getByRole('button', {name: 'Offboarding'})).toBeDisabled()
      })
    })
  })
})
