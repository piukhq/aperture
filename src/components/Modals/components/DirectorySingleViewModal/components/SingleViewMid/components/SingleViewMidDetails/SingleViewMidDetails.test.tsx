import React from 'react'
import {render, screen} from '@testing-library/react'
import {Provider} from 'react-redux'
import configureStore from 'redux-mock-store'
import SingleViewMidDetails from 'components/Modals/components/DirectorySingleViewModal/components/SingleViewMid/components/SingleViewMidDetails'
import {PaymentSchemeSlug} from 'utils/enums'

jest.mock('components/Dropdown', () => () => <div data-testid='dropdown' />)
jest.mock('components/Modals/components/DirectorySingleViewModal/components/HarmoniaStatus', () => () => <div data-testid='harmonia-status' />)
jest.mock('components/Modals/components/DirectorySingleViewModal/components/SingleViewEditableField',
  () => () => <div data-testid='SingleViewEditableField' />)

const mockVisaBin = 'mock_visa_bin'
const mockDateAdded = 'mock_date_added'
const mockTxmStatus = 'onboarded' // Must match a value provided by DirectoryTxmStatus enum

type ErrorResponse = {
  data: {
    detail: {
      loc: string[],
    }[],
  },
}

let mockPatchErrorResponse = null as unknown as ErrorResponse
let mockPutErrorResponse = null as unknown as ErrorResponse
let mockDeleteErrorResponse = null as unknown as ErrorResponse
let mockIsFetching = false

const mockMerchantMid = {
  location: {
    link_ref: '',
    location_ref: '',
    location_title: '',
  },
  mid: {
    mid_ref: '',
    date_added: mockDateAdded,
    txm_status: mockTxmStatus,
    mid_metadata: {
      mid: '',
      payment_scheme_slug: PaymentSchemeSlug.VISA,
      visa_bin: mockVisaBin,
      payment_enrolment_status: '',
    },
  },
}

const mockGetLocationsResponse = [
  {
    location_ref: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
    location_metadata: {
      name: 'HARVEY NICHOLS',
      location_id: '0018',
      merchant_internal_id: '1234',
      is_physical_location: true,
      address_line_1: '16 Manesty\'s Lane',
      town_city: 'Liverpool',
      postcode: 'L1 3D',
    },
    location_status: 'status',
    date_added: 'Mar 21, 2019, 3:30pm',
    payment_schemes: [
      {
        label: 'VISA',
        scheme_slug: PaymentSchemeSlug.VISA,
        count: 1,
      },
      {
        label: 'MASTERCARD',
        scheme_slug: PaymentSchemeSlug.MASTERCARD,
        count: 2,
      },
      {
        label: 'AMEX',
        scheme_slug: PaymentSchemeSlug.AMEX,
        count: 1,
      },
    ],
  },
]

jest.mock('hooks/useDirectoryMids', () => ({
  useDirectoryMids: jest.fn().mockImplementation(() => ({
    patchMerchantMid: jest.fn(),
    patchMerchantMidError: mockPatchErrorResponse,
    patchMerchantMidIsLoading: null,
    resetPatchMerchantMidResponse: jest.fn(),
    putMerchantMidLocationError: mockPutErrorResponse,
    deleteMerchantMidLocationError: mockDeleteErrorResponse,
    getMerchantMidIsFetching: mockIsFetching,
  })),
}))

jest.mock('hooks/useDirectoryLocations', () => ({
  useDirectoryLocations: jest.fn().mockImplementation(() => ({
    getMerchantLocationsResponse: mockGetLocationsResponse,
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
  merchantMid: mockMerchantMid,
}

const mockStoreFn = configureStore([])

const store = mockStoreFn({
  directoryMerchant: {
    hasHarmoniaStatusUpdate: false,
  },
})


const getSingleViewMidDetailsComponent = (passedStore = undefined, passedProps = {}) => (
  <Provider store={passedStore || store}>
    <SingleViewMidDetails {...mockProps} {...passedProps} />
  </Provider>
)

describe('SingleViewMidDetails', () => {
  beforeEach(() => {
    jest.clearAllMocks()
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

      render(getSingleViewMidDetailsComponent(undefined, {setError: mockSetError}))
      expect(mockSetError).toBeCalledWith('Failed to update Payment Scheme Status')
    })
  })

  describe('Test Location and BIN', () => {
    it('should render the correct number of SingleViewEditableField components', () => {
      render(getSingleViewMidDetailsComponent())
      expect(screen.queryAllByTestId('SingleViewEditableField')).toHaveLength(2)
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

      render(getSingleViewMidDetailsComponent(undefined, {setError: mockSetError}))
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

      render(getSingleViewMidDetailsComponent(undefined, {setError: mockSetError}))
      expect(mockSetError).toBeCalledWith('Add location failed')
    })

    it('should render the correct DELETE Location error message', () => {
      mockPutErrorResponse = null as unknown as ErrorResponse

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

      render(getSingleViewMidDetailsComponent(undefined, {setError: mockSetError}))
      expect(mockSetError).toBeCalledWith('Delete location failed')
    })
  })

  describe('Test Harmonia Status', () => {
    it('should render the Harmonia Status component', () => {
      render(getSingleViewMidDetailsComponent())
      expect(screen.getByTestId('harmonia-status')).toBeInTheDocument()
    })
  })

  describe('Test refresh button', () => {
    it('should render the "Refresh" button text when not refreshing', () => {
      render(getSingleViewMidDetailsComponent())
      expect(screen.getByTestId('mid-refresh-button')).toHaveTextContent('Refresh')
    })

    it('should render the "Refreshing" button text when not refreshing', () => {
      mockIsFetching = true
      render(getSingleViewMidDetailsComponent())
      expect(screen.getByTestId('mid-refresh-button')).toHaveTextContent('Refreshing')
    })
  })
})


