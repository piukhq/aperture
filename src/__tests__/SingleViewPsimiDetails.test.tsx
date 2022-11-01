import React from 'react'
import {render, screen} from '@testing-library/react'
import SingleViewPsimiDetails from 'components/Modals/components/DirectorySingleViewModal/components/SingleViewPsimi/components/SingleViewPsimiDetails'
import {PaymentSchemeSlug} from 'utils/enums'

jest.mock('components/Dropdown', () => () => <div data-testid='dropdown' />)
jest.mock('components/Modals/components/DirectorySingleViewModal/components/HarmoniaStatus', () => () => <div data-testid='harmonia-status' />)

const mockPsimiRef = 'mock_psimi_ref'
const mockValue = 'mock_value'
const mockPaymentSchemeMerchantName = 'mock_payment_scheme_merchant_name'
const mockDateAdded = 'mock_date_added'
const mockPsimiStatus = 'mock_psimi_status'
const mockTxmStatus = 'mock_txm_status'

const mockMerchantPsimi = {
  psimi_ref: mockPsimiRef,
  psimi_metadata: {
    payment_scheme_slug: PaymentSchemeSlug.VISA,
    value: mockValue,
    payment_scheme_merchant_name: mockPaymentSchemeMerchantName,
  },
  date_added: mockDateAdded,
  psimi_status: mockPsimiStatus,
  txm_status: mockTxmStatus,
}

let mockIsFetching = false

jest.mock('hooks/useMidManagementPsimis', () => ({
  useMidManagementPsimis: jest.fn().mockImplementation(() => ({ // Placeholder for future functionality
    postMerchantPsimiOnboarding: jest.fn(),
    postMerchantPsimiOffboarding: jest.fn(),
    getMerchantPsimiIsFetching: mockIsFetching,
  })),
}))

const useRouter = jest.spyOn(require('next/router'), 'useRouter')

const getSingleViewPsimiDetailsComponent = () => (
  <SingleViewPsimiDetails psimi={mockMerchantPsimi} />
)

describe('SingleViewPsimiDetails', () => {
  beforeEach(() => {
    useRouter.mockImplementation(() => ({
      query: {
        planId: 'mock_plan_id',
        merchantId: 'mock_merchant_id',
        ref: 'mock_psimi_ref',
      },
    }))
  })

  // TODO: Add functionality tests into each section
  describe('Test Date Added', () => {
    it('should render the Date Added heading', () => {
      render(getSingleViewPsimiDetailsComponent())
      expect(screen.getAllByRole('heading')[0]).toHaveTextContent('DATE ADDED')
    })
    it('should render the Date Added value', () => {
      render(getSingleViewPsimiDetailsComponent())
      expect(screen.getByText(mockDateAdded)).toBeInTheDocument()
    })
  })

  describe('Test Payment Scheme', () => {
    it('should render the Payment Scheme heading', () => {
      render(getSingleViewPsimiDetailsComponent())
      expect(screen.getAllByRole('heading')[1]).toHaveTextContent('PAYMENT SCHEME')
    })

    it('should render the correct Payment Scheme value', () => {
      render(getSingleViewPsimiDetailsComponent())
      expect(screen.getByText('Visa')).toBeInTheDocument()
    })
  })

  describe('Test Harmonia Status', () => {
    it('should render the Harmonia Status component', () => {
      render(getSingleViewPsimiDetailsComponent())
      expect(screen.getByTestId('harmonia-status')).toBeInTheDocument()
    })
  })

  describe('Test refresh button', () => {
    it('should render the "Refresh" button text when not refreshing', () => {
      render(getSingleViewPsimiDetailsComponent())
      expect(screen.getByTestId('psimi-refresh-button')).toHaveTextContent('Refresh')
    })

    it('should render the "Refreshing" button text when not refreshing', () => {
      mockIsFetching = true
      render(getSingleViewPsimiDetailsComponent())
      expect(screen.getByTestId('psimi-refresh-button')).toHaveTextContent('Refreshing')
    })
  })
})
