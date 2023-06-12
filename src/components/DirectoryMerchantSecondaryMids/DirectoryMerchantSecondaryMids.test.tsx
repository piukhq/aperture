import React from 'react'
import {render, screen} from '@testing-library/react'
import {Provider} from 'react-redux'
import configureStore from 'redux-mock-store'
import {DirectoryMerchantSecondaryMids} from 'components'
import {PaymentSchemeSlug} from 'utils/enums'

const mockGetMerchantSecondaryMidsResponse = [
  {
    secondary_mid_ref: 'SMID13fa85f64-5717-4562-b3fc-2c963f66afa6',
    secondary_mid_metadata: {
      payment_scheme_slug: PaymentSchemeSlug.VISA,
      secondary_mid: '446720350',
      payment_enrolment_status: 'payroll_enrollment_status',
      payment_scheme_store_name: 'Mock Merchant 1',
    },
    date_added: 'Mar 21, 2020, 3:30pm',
    txm_status: 'txm_status 1',
  },
  {
    secondary_mid_ref: 'SMID23fa85f64-5717-4562-b3fc-2c963f66afa6',
    secondary_mid_metadata: {
      payment_scheme_slug: PaymentSchemeSlug.MASTERCARD,
      secondary_mid: '222425984',
      payment_enrolment_status: 'payroll_enrollment_status',
      payment_scheme_store_name: 'Mock Merchant 2',
    },
    date_added: 'Feb 21, 2020, 2:11pm',
    txm_status: 'txm_status 2',
  },
]

jest.mock('components/DirectoryMerchantDetailsTable', () => () => <div data-testid='merchant-details-table' />)
jest.mock('components/DirectoryMerchantPaginationButton', () => () => <div data-testid='pagination-button' />)

jest.mock('utils/windowDimensions', () => {
  return {
    useIsMobileViewportDimensions: jest.fn().mockImplementation(() => false),
  }
})

jest.mock('hooks/useDirectorySecondaryMids', () => ({
  useDirectorySecondaryMids: jest.fn().mockImplementation(() => ({
    getMerchantSecondaryMidsResponse: mockGetMerchantSecondaryMidsResponse,
  })),
}))

const mockStoreFn = configureStore([])
const store = mockStoreFn({
  directoryMerchant: {
    selectedTableCheckedRefs: ['mock_id'],
  },
})

const getDirectoryMerchantSecondaryMidsComponent = (passedStore = undefined) => (
  <Provider store={passedStore || store}>
    <DirectoryMerchantSecondaryMids />
  </Provider>
)

describe('DirectoryMerchantSecondaryMids', () => {
  const useRouter = jest.spyOn(require('next/router'), 'useRouter')

  beforeEach(() => {
    useRouter.mockImplementation(() => ({
      query: {
        planId: 'mock_plan_id',
        merchantId: 'mock_merchant_id',
        tab: 'secondary_mids',
      },
    }))
  })

  it('should render the correct checked item buttons', () => {
    React.useState = jest.fn().mockReturnValue([Array(1), jest.fn]) // checkedRefArray
    render(getDirectoryMerchantSecondaryMidsComponent())

    expect(screen.getByRole('button', {name: 'Onboard to Harmonia'})).toBeInTheDocument()
    expect(screen.getByRole('button', {name: 'Offboard from Harmonia'})).toBeInTheDocument()
    expect(screen.getByRole('button', {name: 'Update to Harmonia'})).toBeInTheDocument()
    expect(screen.getByRole('button', {name: 'Comments'})).toBeInTheDocument()
    expect(screen.getByRole('button', {name: 'Delete'})).toBeInTheDocument()
  })

  it('should render the add Secondary Mid buttons', () => {
    render(getDirectoryMerchantSecondaryMidsComponent())
    const visaButton = screen.getByRole('button', {
      name: 'Add Visa Secondary MID',
    })
    const mastercardButton = screen.getByRole('button', {
      name: 'Add Mastercard Secondary MID',
    })

    expect(visaButton).toBeInTheDocument()
    expect(mastercardButton).toBeInTheDocument()
  })

  it('should render the DirectoryMerchantDetailsTable component', () => {
    render(getDirectoryMerchantSecondaryMidsComponent())
    expect(screen.getByTestId('merchant-details-table')).toBeInTheDocument()
  })
})
