import React from 'react'
import {render, screen} from '@testing-library/react'
import SingleViewSubLocationDetails from 'components/Modals/components/DirectorySingleViewModal/components/SingleViewSubLocation/components/SingleViewSubLocationDetails'
import {PaymentSchemeSlug} from 'utils/enums'

jest.mock('components/DirectoryMerchantLocationForm', () => () => <div data-testid='DirectoryMerchantLocationForm' />)
jest.mock('components/Modals/components/DirectorySingleViewModal/components/SingleViewEditableField', () => () => <div data-testid='SingleViewEditableField' />)
jest.mock('components/TextInputGroup', () => () => <div data-testid='location-id-text-input' />)


const mockLocations = [
  {
    'location_ref': '3fa85f64-5717-4562-b3fc-2c963f66afa6',
    'location_metadata': {
      'name': 'HARVEY NICHOLS',
      'location_id': '0018',
      'merchant_internal_id': '1234',
      'is_physical_location': true,
      'address_line_1': '16 Manesty\'s Lane',
      'town_city': 'Liverpool',
      'postcode': 'L1 3D',
    },
    'location_status': 'status',
    'date_added': 'Mar 21, 2019, 3:30pm',
    'payment_schemes': [],
    'sub_locations': [],
  },
]

jest.mock('hooks/useDirectoryLocations', () => ({
  useDirectoryLocations: jest.fn().mockImplementation(() => ({
    getMerchantLocationsResponse: mockLocations,
    getMerchantLocationsIsFetching: false,
  })),
}))

jest.mock('hooks/useDirectoryLocationSubLocations', () => ({
  useDirectoryLocationSubLocations: jest.fn().mockImplementation(() => ({
    putMerchantLocationSubLocations: jest.fn(),
    putMerchantLocationSubLocationsIsSuccess: false,
    putMerchantLocationSubLocationsIsLoading: false,
    putMerchantLocationSubLocationsError: null,
    patchMerchantLocationSubLocation: jest.fn(),
    patchMerchantLocationSubLocationIsSuccess: false,
    patchMerchantLocationSubLocationIsLoading: false,
    patchMerchantLocationSubLocationError: null,
    patchMerchantLocationSubLocationResponse: {
      location_ref: 'mock_location_ref',
      parent_ref: 'mock_parent_ref',
    },
    resetPatchMerchantLocationSubLocationResponse: jest.fn(),
  })),
}))

const useRouter = jest.spyOn(require('next/router'), 'useRouter')

const mockParentLocationTitle = 'mock_parent_location_title'
const mockDateAdded = 'mock_date_added'
const mockName = 'mock_name'
const mockLocationId = 'mock_location_id'
const mockMerchantInternalId = 'mock_merchant_internal_id'
const mockAddressLine1 = 'mock_address_line_1'
const mockAddressLine2 = 'mock_address_line_2'
const mockTownCity = 'mock_town_city'
const mockCounty = 'mock_county'
const mockCountry = 'mock_country'
const mockPostcode = 'mock_postcode'
const mockLinkedMidsCount = 3
const mockLinkedSecondaryMidsCount = 5
const mockIsPhysicalLocation = true

const mockSubLocation = {
  parent_location: {
    location_ref: 'mock_parent_location_ref',
    location_title: mockParentLocationTitle,
  },
  sub_location: {
    location_ref: 'mock_location_ref',
    location_metadata: {
      name: mockName,
      location_id: mockLocationId,
      merchant_internal_id: mockMerchantInternalId,
      is_physical_location: mockIsPhysicalLocation,
      address_line_1: mockAddressLine1,
      address_line_2: mockAddressLine2,
      town_city: mockTownCity,
      county: mockCounty,
      country: mockCountry,
      postcode: mockPostcode,
    },
    linked_mids_count: mockLinkedMidsCount,
    linked_secondary_mids_count: mockLinkedSecondaryMidsCount,
    date_added: mockDateAdded,
    location_status: 'status',
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
}

const mockProps = {
  isInEditState: false,
  setIsInEditState: jest.fn(),
  location: mockSubLocation,
  onCancelEditState: jest.fn(),
  handleRefresh: jest.fn(),
  isRefreshing: false,
}

const getSingleViewSubLocationDetailsComponent = (passedProps = {}) => (
  <SingleViewSubLocationDetails {...mockProps} {...passedProps} />
)

describe('SingleViewSubLocationDetails', () => {
  beforeEach(() => {
    jest.clearAllMocks()

    useRouter.mockImplementation(() => ({
      query: {
        planId: 'mock_plan_id',
        merchantId: 'mock_merchant_id',
        ref: 'mock_ref',
      },
    }))

    React.useState = jest.fn()
      .mockReturnValueOnce(['mock_selected_parent', jest.fn()]) // selectedParentLocationName
      .mockReturnValueOnce(['mock_locationId', jest.fn()]) // locationIdValue
      .mockReturnValueOnce(['', jest.fn()]) // locationIdValidationError
  })

  describe('Test read-only state', () => {
    it('should render the Date Added heading and value', () => {
      render(getSingleViewSubLocationDetailsComponent())
      expect(screen.getAllByRole('heading')[0]).toHaveTextContent('DATE ADDED')
      expect(screen.getByText(mockDateAdded)).toBeInTheDocument()
    })

    it('should render the Address heading and value', () => {
      render(getSingleViewSubLocationDetailsComponent())
      expect(screen.getAllByRole('heading')[2]).toHaveTextContent('ADDRESS')
      expect(screen.getByText(mockAddressLine1)).toBeInTheDocument()
      expect(screen.getByText(mockAddressLine2)).toBeInTheDocument()
      expect(screen.getByText(mockTownCity)).toBeInTheDocument()
      expect(screen.getByText(mockCounty)).toBeInTheDocument()
      expect(screen.getByText(mockCountry)).toBeInTheDocument()
      expect(screen.getByText(mockPostcode)).toBeInTheDocument()
    })

    it('should not render the location ID text input', () => {
      render(getSingleViewSubLocationDetailsComponent())
      expect(screen.queryByTestId('location-id-text-input')).not.toBeInTheDocument()
    })

    it('should render the SingleViewEditableField component', () => {
      render(getSingleViewSubLocationDetailsComponent())
      expect(screen.getByTestId('SingleViewEditableField')).toBeInTheDocument()
    })

    describe('Test physical location', () => {
      it('should render the Physical Location heading', () => {
        render(getSingleViewSubLocationDetailsComponent())
        expect(screen.getAllByRole('heading')[1]).toHaveTextContent('PHYSICAL LOCATION')
      })

      it('should render enabled Physical Location text', () => {
        render(getSingleViewSubLocationDetailsComponent())
        expect(screen.getByText('Yes')).toBeInTheDocument()
      })

      it('should render disabled Physical Location text', () => {
        const location = {
          ...mockSubLocation,
          sub_location: {
            ...mockSubLocation.sub_location,
            location_metadata: {
              is_physical_location: false,
            },
          },
        }
        render(getSingleViewSubLocationDetailsComponent({location}))
        expect(screen.getByText('No')).toBeInTheDocument()
      })
    })
  })

  // TODO: Add functionality tests into each section
  describe('Test edit state', () => {
    it('should render the DirectoryMerchantLocationForm', () => {
      render(getSingleViewSubLocationDetailsComponent({isInEditState: true}))
      expect(screen.getByTestId('DirectoryMerchantLocationForm')).toBeInTheDocument()
    })
  })

  describe('Test refresh button', () => {
    it('should render the "Refresh" button text when not refreshing', () => {
      render(getSingleViewSubLocationDetailsComponent())
      expect(screen.getByTestId('sub-location-refresh-button')).toHaveTextContent('Refresh')
    })

    it('should render the "Refreshing" button text when not refreshing', () => {
      render(getSingleViewSubLocationDetailsComponent({isRefreshing: true}))
      expect(screen.getByTestId('sub-location-refresh-button')).toHaveTextContent('Refreshing')
    })
  })

  describe('Test behaviour when selected parent location is set to None', () => {
    beforeEach(() => {
      jest.clearAllMocks()
      React.useState = jest.fn()
        .mockReturnValueOnce(['None', jest.fn()]) // selectedParentLocationName
        .mockReturnValueOnce(['mock_locationId', jest.fn()]) // locationIdValue
        .mockReturnValueOnce(['', jest.fn()]) // locationIdValidationError
    })
    it('should render the Add location Id copy', () => {
      render(getSingleViewSubLocationDetailsComponent())
      expect(screen.getByText('Add a Location ID and save?')).toBeInTheDocument()
    })

    it('should render the Location ID text input', () => {
      render(getSingleViewSubLocationDetailsComponent())
      expect(screen.getByTestId('location-id-text-input')).toBeInTheDocument()
    })
  })
})
