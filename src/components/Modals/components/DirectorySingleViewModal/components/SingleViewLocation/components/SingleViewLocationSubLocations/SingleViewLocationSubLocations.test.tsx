import React from 'react'
import {render, screen} from '@testing-library/react'
import SingleViewLocationSubLocations from 'components/Modals/components/DirectorySingleViewModal/components/SingleViewLocation/components/SingleViewLocationSubLocations'
import {PaymentSchemeSlug} from 'utils/enums'

jest.mock('components/DirectoryMerchantLocationForm', () => () => <div data-testid='directory-merchant-location-form' />)

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

let mockGetMerchantLocationSubLocationsResponse = [mockLocation]

jest.mock('hooks/useMidManagementLocationSubLocations', () => ({
  useMidManagementLocationSubLocations: jest.fn().mockImplementation(() => ({
    getMerchantLocationSubLocationsResponse: mockGetMerchantLocationSubLocationsResponse,
    getMerchantLocationSubLocationsIsLoading: false,
    postMerchantLocationSubLocation: jest.fn(),
    postMerchantLocationSubLocationIsSuccess: false,
    postMerchantLocationSubLocationIsLoading: false,
    postMerchantLocationSubLocationError: false,
  })),
}))

const getSingleViewSubLocationsComponent = (passedProps = {}) => (
  <SingleViewLocationSubLocations
    location={mockLocation}
    isInEditState={false}
    setIsInEditState={jest.fn()}
    onCancelEditState={jest.fn()}
    {...passedProps} />
)

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
    render(getSingleViewSubLocationsComponent())
    expect(screen.getByRole('button', {name: 'New Sub-location'})).toBeInTheDocument()
  })

  it('should render the correct section heading', () => {
    render(getSingleViewSubLocationsComponent())
    expect(screen.getByRole('heading')).toHaveTextContent('SUB-LOCATIONS')
  })

  it('should render the sub-location list anchor tag with the correct href', () => {
    render(getSingleViewSubLocationsComponent())
    const subLocationListItem = screen.getByRole('link')
    expect(subLocationListItem).toHaveTextContent(`${mockName}, ${mockAddressLine1}, ${mockPostcode}`)

    expect(subLocationListItem).toHaveAttribute('href', '/mid-management/directory/mock_plan_id/mock_merchant_id?tab=locations&ref=mock_secondary_mid_ref&sub_location_ref=mock_location_ref')
  })

  it('should render the no linked Locations available message', () => {
    mockGetMerchantLocationSubLocationsResponse = []
    render(getSingleViewSubLocationsComponent())
    expect(screen.getByText(`Creating a sub-location will make ${mockLocation.location_metadata.name} non-physical. Any address details for this location will be copied to the new sub-location but can be edited. Continue?`)).toBeInTheDocument()
  })

  it('should render the DirectoryMerchantLocationForm when in edit mode', () => {
    render(getSingleViewSubLocationsComponent({isInEditState: true}))

    expect(screen.getByTestId('directory-merchant-location-form')).toBeInTheDocument()
  })
})
