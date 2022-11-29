import React from 'react'
import {render, screen} from '@testing-library/react'
import SingleViewLocationSubLocations from 'components/Modals/components/DirectorySingleViewModal/components/SingleViewLocation/components/SingleViewLocationSubLocations'
import {PaymentSchemeSlug} from 'utils/enums'

jest.mock('components/Modals/components/DirectorySingleViewModal/components/LinkedListItem', () => () => <div data-testid='linked-list-item' />)

const mockName = 'mock_name'
const mockAddressLine1 = 'mock_address_line_1'
const mockPostcode = 'mock_postcode'

const mockLocation = {
  location_ref: 'mock_location_ref',
  location_metadata: {
    name: mockName,
    location_id: 'mock_location_id',
    merchant_internal_id: 'mock_merchant_internal_id',
    is_physical_location: true,
    address_line_1: mockAddressLine1,
    address_line_2: 'mock_address_line_2',
    town_city: 'mock_town_city',
    county: 'mock_county',
    country: 'mock_country',
    postcode: mockPostcode,
  },
  date_added: 'mock_date_added',
  location_status: 'status',
  payment_schemes: [
    {
      label: 'VISA',
      scheme_slug: PaymentSchemeSlug.VISA,
      count: 1,
    },
  ],
}

let mockgetMerchantLocationSubLocationsResponse = [mockLocation]

jest.mock('hooks/useMidManagementLocationSubLocations', () => ({
  useMidManagementLocationSubLocations: jest.fn().mockImplementation(() => ({
    getMerchantLocationSubLocationsResponse: mockgetMerchantLocationSubLocationsResponse,
    getMerchantLocationSubLocationsIsLoading: false,
  })),
}))

const useRouter = jest.spyOn(require('next/router'), 'useRouter')

describe('SingleViewLocationSubLocations', () => {
  beforeEach(() => {
    jest.clearAllMocks()

    useRouter.mockImplementation(() => ({
      query: {
        planId: 'mock_plan_id',
        merchantId: 'mock_merchant_id',
        ref: 'mock_secondary_mid_ref',
      },
    }))
  })

  it('should render New Sub-location button', () => {
    render(<SingleViewLocationSubLocations />)
    expect(screen.getByRole('button', {name: 'New Sub-location'})).toBeInTheDocument()
  })

  it('should render the correct section heading', () => {
    render(<SingleViewLocationSubLocations />)
    expect(screen.getByRole('heading')).toHaveTextContent('SUB-LOCATIONS')
  })

  it('should render the LinkedListItem', () => {
    render(<SingleViewLocationSubLocations />)
    const locationListItems = screen.queryAllByTestId('linked-list-item')
    expect(locationListItems).toHaveLength(1)
  })

  it('should render the no linked Locations available message', () => {
    mockgetMerchantLocationSubLocationsResponse = []
    render(<SingleViewLocationSubLocations />)
    expect(screen.getByText('There are no Sub-Locations to view.')).toBeInTheDocument()
  })
})
