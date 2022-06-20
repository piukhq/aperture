import React from 'react'
import {render, screen} from '@testing-library/react'
import SingleViewMidDetails from 'components/DirectorySingleViewModal/components/SingleViewMidDetails'

jest.mock('components/Dropdown', () => () => <div data-testid='dropdown' />)
jest.mock('components/DirectorySingleViewModal/components/SingleViewMidDetails/components/SingleViewMidEditableField', () => () => <div data-testid='SingleViewMidEditableField' />)

const mockVisaBin = 'mock_visa_bin'
const mockDateAdded = 'mock_date_added'
const mockTxmStatus = 'mock_txm_status'

let mockPatchErrorResponse = null
let mockPutErrorResponse = null
let mockDeleteErrorResponse = null

const mockGetMidResponse = {
  location: {
    location_ref: '',
    location_title: '',
  },
  mid: {
    date_added: mockDateAdded,
    txm_status: mockTxmStatus,
    mid_metadata: {
      payment_scheme_code: 1,
      visa_bin: mockVisaBin,
      payment_enrolment_status: '',
    },
  },
}

jest.mock('hooks/useMidManagementMids', () => ({
  useMidManagementMids: jest.fn().mockImplementation(() => ({
    getMerchantMidResponse: mockGetMidResponse,
    patchMerchantMid: jest.fn(),
    patchMerchantMidError: mockPatchErrorResponse,
    patchMerchantMidIsLoading: null,
    resetPatchMerchantMidResponse: jest.fn(),
    putMerchantMidLocationError: mockPutErrorResponse,
    deleteMerchantMidLocationError: mockDeleteErrorResponse,
  })),
}))

const useRouter = jest.spyOn(require('next/router'), 'useRouter')
useRouter.mockImplementation(() => ({
  query: {
    planId: 'mock_plan_id',
    merchantId: 'mock_merchant_id',
    ref: 'mock_ref',
  },
}))

const mockSetError = jest.fn()

const mockProps = {
  resetError: jest.fn(),
  setError: mockSetError,
}

const getSingleViewMidDetailsComponent = (passedProps = {}) => (
  <SingleViewMidDetails {...mockProps} {...passedProps} />
)

describe('SingleViewMidDetails', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    // displayValue state value
    React.useState = jest.fn().mockReturnValue(['', jest.fn()])
  })

  // TODO: Add functionality tests into each section
  describe('Test Date Added', () => {
    it('should render the Date Added heading', () => {
      render(getSingleViewMidDetailsComponent())
      expect(screen.getAllByRole('heading')[0]).toHaveTextContent('DATE ADDED')
    })
    it('should render the Date Added value', () => {
      render(getSingleViewMidDetailsComponent())
      expect(screen.getByText(mockDateAdded)).toBeInTheDocument()
    })
  })

  describe('Test Payment Scheme', () => {
    it('should render the Payment Scheme heading', () => {
      render(getSingleViewMidDetailsComponent())
      expect(screen.getAllByRole('heading')[1]).toHaveTextContent('PAYMENT SCHEME')
    })
    it('should render the correct Payment Scheme value', () => {
      render(getSingleViewMidDetailsComponent())
      expect(screen.getByText('Visa')).toBeInTheDocument()
    })
  })

  describe('Test Payment Scheme Status', () => {
    it('should render the Payment Scheme Status heading', () => {
      render(getSingleViewMidDetailsComponent())
      expect(screen.getByText('PAYMENT SCHEME STATUS')).toBeInTheDocument()
    })
    it('should render the Dropdown component', () => {
      render(getSingleViewMidDetailsComponent())
      expect(screen.queryByTestId('dropdown')).toBeInTheDocument()
    })

    it('should render the correct error message', () => {
      mockPatchErrorResponse = {
        data: {
          detail: [
            {
              loc: [
                'body',
                'payment_enrolment_status',
              ],
            },
          ],
        },
      }

      render(getSingleViewMidDetailsComponent({setError: mockSetError}))
      expect(mockSetError).toBeCalledWith('Failed to update Payment Scheme Status')
    })
  })

  describe('Test Location and BIN', () => {
    it('should render the correct number of SingleViewMidEditableField components', () => {
      render(getSingleViewMidDetailsComponent())
      expect(screen.queryAllByTestId('SingleViewMidEditableField')).toHaveLength(2)
    })

    it('should render the correct BIN error message', () => {
      mockPatchErrorResponse = {
        data: {
          detail: [
            {
              loc: [
                'body',
                'visa_bin',
              ],
            },
          ],
        },
      }

      render(getSingleViewMidDetailsComponent({setError: mockSetError}))
      expect(mockSetError).toBeCalledWith('Failed to update BIN association')
    })

    it('should render the correct PUT Location error message', () => {
      mockPutErrorResponse = {
        data: {
          detail: [
            {
              loc: [
                'body',
                'location',
              ],
            },
          ],
        },
      }

      render(getSingleViewMidDetailsComponent({setError: mockSetError}))
      expect(mockSetError).toBeCalledWith('Add location failed')
    })

    it('should render the correct DELETE Location error message', () => {
      mockPutErrorResponse = null

      mockDeleteErrorResponse = {
        data: {
          detail: [
            {
              loc: [
                'body',
                'location',
              ],
            },
          ],
        },
      }

      render(getSingleViewMidDetailsComponent({setError: mockSetError}))
      expect(mockSetError).toBeCalledWith('Delete location failed')
    })
  })

  describe('Test Harmonia Status', () => {
    it('should render the Harmonia Status heading', () => {
      render(getSingleViewMidDetailsComponent())
      expect(screen.getByText('HARMONIA STATUS')).toBeInTheDocument()
    })
    it('should render the Edit button', () => {
      render(getSingleViewMidDetailsComponent())
      expect(screen.getByRole('button', {name: 'Edit'})).toBeInTheDocument()
    })
  })
})


