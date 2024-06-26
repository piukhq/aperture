import React from 'react'
import {render, screen} from '@testing-library/react'
import {Provider} from 'react-redux'
import configureStore from 'redux-mock-store'
import {DirectoryMerchantMids} from 'components'
import {PaymentSchemeSlug} from 'utils/enums'

const mockGetMerchantMidsResponse = [
  {
    mid_ref: 'MID13fa85f64-5717-4562-b3fc-2c963f66afa6',
    mid_metadata: {
      payment_scheme_slug: PaymentSchemeSlug.AMEX,
      mid: '1114259847329',
      visa_bin: '',
      payment_enrolment_status: 'Enrolled',
    },
    date_added: 'Mar 21, 2020, 3:30pm',
    txm_status: 'txm_status 1',
  },
  {
    mid_ref: 'MID23fa85f64-5717-4562-b3fc-2c963f66afa6',
    mid_metadata: {
      payment_scheme_slug: PaymentSchemeSlug.AMEX,
      mid: '2224259847329',
      visa_bin: '',
      payment_enrolment_status: 'Enrolled',
    },
    date_added: 'Feb 21, 2020, 2:11pm',
    txm_status: 'txm_status 2',
  },
]

jest.mock('components/DirectoryMerchantDetailsTable', () => () => <div data-testid='merchant-details-table' />)
jest.mock('components/DirectoryMerchantTableFilter', () => () => <div data-testid='directory-merchant-table-filter' />)
jest.mock('components/DirectoryMerchantPaginationButton', () => () => <div data-testid='pagination-button' />)

jest.mock('hooks/useDirectoryMids', () => ({
  useDirectoryMids: jest.fn().mockImplementation(() => ({
    getMerchantMidsResponse: mockGetMerchantMidsResponse,
  })),
}))


const mockStoreFn = configureStore([])
const store = mockStoreFn({
  directoryMerchant: {
    selectedTableCheckedRefs: ['mock_id'],
  },
})

const getDirectoryMerchantMidsComponent = (passedStore = undefined) => (
  <Provider store={passedStore || store}>
    <DirectoryMerchantMids />
  </Provider>
)

describe('DirectoryMerchantMids', () => {
  const useRouter = jest.spyOn(require('next/router'), 'useRouter')

  beforeEach(() => {
    useRouter.mockImplementation(() => ({
      query: {
        planId: 'mock_plan_id',
        merchantId: 'mock_merchant_id',
        tab: 'mids',
      },
    }))
  })

  it('should render the add Mid buttons', () => {
    render(getDirectoryMerchantMidsComponent())
    const visaButton = screen.getByRole('button', {
      name: 'Add Visa MID',
    })
    const mastercardButton = screen.getByRole('button', {
      name: 'Add Mastercard MID',
    })
    const amexButton = screen.getByRole('button', {
      name: 'Add AMEX MID',
    })

    expect(visaButton).toBeInTheDocument()
    expect(mastercardButton).toBeInTheDocument()
    expect(amexButton).toBeInTheDocument()
  })

  it('should render the correct bulk action buttons', () => {
    render(getDirectoryMerchantMidsComponent())

    expect(screen.getByRole('button', {name: 'Onboard'})).toBeInTheDocument()
    expect(screen.getByRole('button', {name: 'Offboard'})).toBeInTheDocument()
    expect(screen.getByRole('button', {name: 'Scheme Status'})).toBeInTheDocument()
    expect(screen.getByRole('button', {name: 'Update'})).toBeInTheDocument()
    expect(screen.getByRole('button', {name: 'Add Comments'})).toBeInTheDocument()
    expect(screen.getByRole('button', {name: 'Delete'})).toBeInTheDocument()
  })

  it('should render the Filter button', () => {
    render(getDirectoryMerchantMidsComponent())
    expect(screen.getByRole('button', {name: 'Show filters'})).toBeInTheDocument()
  })

  it('should render the DirectorMerchantTableFilter component', () => {
    render(getDirectoryMerchantMidsComponent())
    expect(screen.getByTestId('directory-merchant-table-filter')).toBeInTheDocument()
  })

  it('should render the DirectoryMerchantDetailsTable component', () => {
    render(getDirectoryMerchantMidsComponent())
    expect(screen.getByTestId('merchant-details-table')).toBeInTheDocument()
  })

  it('should not render the Show All button when there is less than 350 records', () => {
    render(getDirectoryMerchantMidsComponent())
    expect(screen.queryByRole('button', {name: 'Show All'})).not.toBeInTheDocument()
  })

  // TODO: Consider performance impact of mocking 350 records to prove the show all button can appear in that circumstance
})
