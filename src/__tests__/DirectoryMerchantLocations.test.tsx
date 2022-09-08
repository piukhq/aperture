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

jest.mock('hooks/useMidManagementLocations', () => ({
  useMidManagementLocations: jest.fn().mockImplementation(() => ({
    getMerchantLocationsResponse: mockGetMerchantLocationsResponse,
  })),
}))

const mockStoreFn = configureStore([])
const store = mockStoreFn({
  directoryMerchant: {
    selectedTableCheckedRows: [],
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
    React.useState = jest.fn().mockReturnValue([Array(1), jest.fn]) // checkedRefArray
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

  it('should have the correct number of table headers', () => {
    render(getDirectoryMerchantLocationsComponent())
    const headings = screen.getAllByTestId('table-header')

    expect(headings).toHaveLength(10)
  })

  it('should have the correct table header labels', () => {
    render(getDirectoryMerchantLocationsComponent())
    const headings = screen.getAllByTestId('table-header')

    expect(headings[1]).toHaveTextContent('NAME')
    expect(headings[2]).toHaveTextContent('DATE ADDED')
    expect(headings[3]).toHaveTextContent('PHYSICAL')
    expect(headings[4]).toHaveTextContent('ADDRESS')
    expect(headings[5]).toHaveTextContent('TOWN')
    expect(headings[6]).toHaveTextContent('POSTCODE')
    expect(headings[7]).toHaveTextContent('LOCATION ID')
    expect(headings[8]).toHaveTextContent('INTERNAL ID')
  })
})
