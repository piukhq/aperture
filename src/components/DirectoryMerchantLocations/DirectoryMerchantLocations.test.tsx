import React from 'react'
import {render, screen} from '@testing-library/react'
import {Provider} from 'react-redux'
import configureStore from 'redux-mock-store'
import {DirectoryMerchantLocations} from 'components'
import {PaymentSchemeSlug} from 'utils/enums'

const mockGetMerchantLocationsResponse = [
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
        slug: PaymentSchemeSlug.VISA,
        count: 1,
      },
      {
        label: 'MASTERCARD',
        slug: PaymentSchemeSlug.MASTERCARD,
        count: 2,
      },
      {
        label: 'AMEX',
        slug: PaymentSchemeSlug.AMEX,
        count: 1,
      },
    ],
  },
]

const mockLocationLabel = 'mock_location_label'

jest.mock('components/DirectoryMerchantDetailsTable', () => () => <div data-testid='merchant-details-table' />)
jest.mock('components/DirectoryMerchantPaginationButton', () => () => <div data-testid='pagination-button' />)
jest.mock('components/DirectoryMerchantTableFilter', () => () => <div data-testid='directory-merchant-table-filter' />)

jest.mock('hooks/useDirectoryLocations', () => ({
  useDirectoryLocations: jest.fn().mockImplementation(() => ({
    getMerchantLocationsResponse: mockGetMerchantLocationsResponse,
  })),
}))

const mockStoreFn = configureStore([])
const store = mockStoreFn({
  directoryMerchant: {
    selectedTableCheckedRefs: ['mock_id'],
  },
})

const getDirectoryMerchantLocationsComponent = (passedStore = undefined) => (
  <Provider store={passedStore || store}>
    <DirectoryMerchantLocations locationLabel={mockLocationLabel} />
  </Provider>
)

describe('DirectoryMerchantLocations', () => {
  const useRouter = jest.spyOn(require('next/router'), 'useRouter')

  beforeEach(() => {
    useRouter.mockImplementation(() => ({
      query: {
        planId: 'mock_plan_id',
        merchantId: 'mock_merchant_id',
        tab: 'locations',
      },
    }))
  })

  it('should render the correct bulk action buttons', () => {
    render(getDirectoryMerchantLocationsComponent())

    expect(screen.getByRole('button', {name: 'Add Comments'})).toBeInTheDocument()
    expect(screen.getByRole('button', {name: 'Delete'})).toBeInTheDocument()
  })

  it('should render the add store button', () => {
    render(getDirectoryMerchantLocationsComponent())
    const addStoreButton = screen.getByRole('button', {
      name: `Add ${mockLocationLabel}`,
    })

    expect(addStoreButton).toBeInTheDocument()
  })

  it('should render the Filter button', () => {
    render(getDirectoryMerchantLocationsComponent())
    expect(screen.getByRole('button', {name: 'Show filters'})).toBeInTheDocument()
  })

  it('should render the DirectorMerchantTableFilter component', () => {
    render(getDirectoryMerchantLocationsComponent())
    expect(screen.getByTestId('directory-merchant-table-filter')).toBeInTheDocument()
  })

  it('should render the DirectoryMerchantDetailsTable component', () => {
    render(getDirectoryMerchantLocationsComponent())
    expect(screen.getByTestId('merchant-details-table')).toBeInTheDocument()
  })


})
