import React from 'react'
import {render, screen} from '@testing-library/react'
import {Provider} from 'react-redux'
import configureStore from 'redux-mock-store'
import {DirectoryMerchantLocations} from 'components'

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
        scheme_code: 1,
        count: 1,
      },
      {
        label: 'MASTERCARD',
        scheme_code: 2,
        count: 2,
      },
      {
        label: 'AMEX',
        scheme_code: 3,
        count: 1,
      },
    ],
  },
]

jest.mock('components/DirectoryMerchantDetailsTable', () => () => <div data-testid='merchant-details-table' />)

jest.mock('hooks/useMidManagementLocations', () => ({
  useMidManagementLocations: jest.fn().mockImplementation(() => ({
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
    <DirectoryMerchantLocations />
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

  it('should render the correct checked item buttons', () => {
    render(getDirectoryMerchantLocationsComponent())

    expect(screen.getByRole('button', {name: 'Comments'})).toBeInTheDocument()
    expect(screen.getByRole('button', {name: 'Delete'})).toBeInTheDocument()
  })

  it('should render the add store button', () => {
    render(getDirectoryMerchantLocationsComponent())
    const addStoreButton = screen.getByRole('button', {
      name: 'Add Store',
    })

    expect(addStoreButton).toBeInTheDocument()
  })

  it('should render the DirectoryMerchantDetailsTable component', () => {
    render(getDirectoryMerchantLocationsComponent())
    expect(screen.getByTestId('merchant-details-table')).toBeInTheDocument()
  })
})
