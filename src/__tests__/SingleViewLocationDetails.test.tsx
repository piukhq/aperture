import React from 'react'
import {render, screen} from '@testing-library/react'
import SingleViewLocationDetails from 'components/Modals/components/DirectorySingleViewModal/components/SingleViewLocation/components/SingleViewLocationDetails'

jest.mock('components/Modals/components/DirectorySingleViewModal/components/SingleViewLocation/components/SingleViewLocationDetails/components/EditLocationForm',
  () => () => <div data-testid='EditLocationForm' />)


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

const mockLocation = {
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
}

const mockProps = {
  isInEditState: false,
  onCancelEditState: jest.fn(),
  location: mockLocation,
}

const getSingleViewLocationDetailsComponent = (passedProps = {}) => (
  <SingleViewLocationDetails {...mockProps} {...passedProps} />
)

describe('SingleViewLocationDetails', () => {
  beforeEach(() => {
    jest.clearAllMocks()

    React.useState = jest.fn().mockReturnValueOnce([mockIsPhysicalLocation, jest.fn()]) // isPhysicalLocation
  })

  describe('Test read-only state', () => {
    it('should render the Date Added heading and value', () => {
      render(getSingleViewLocationDetailsComponent())
      expect(screen.getAllByRole('heading')[0]).toHaveTextContent('DATE ADDED')
      expect(screen.getByText(mockDateAdded)).toBeInTheDocument()
    })

    it('should render the Location ID heading and value', () => {
      render(getSingleViewLocationDetailsComponent())
      expect(screen.getAllByRole('heading')[1]).toHaveTextContent('LOCATION ID')
      expect(screen.getByText(mockLocationId)).toBeInTheDocument()
    })

    it('should render the Address heading and value', () => {
      render(getSingleViewLocationDetailsComponent())
      expect(screen.getAllByRole('heading')[2]).toHaveTextContent('ADDRESS')
      expect(screen.getByText(mockAddressLine1)).toBeInTheDocument()
      expect(screen.getByText(mockAddressLine2)).toBeInTheDocument()
      expect(screen.getByText(mockTownCity)).toBeInTheDocument()
      expect(screen.getByText(mockCounty)).toBeInTheDocument()
      expect(screen.getByText(mockCountry)).toBeInTheDocument()
      expect(screen.getByText(mockPostcode)).toBeInTheDocument()
    })

    it('should render the Merchant ID heading and value', () => {
      render(getSingleViewLocationDetailsComponent())
      expect(screen.getAllByRole('heading')[3]).toHaveTextContent('MERCHANT INTERNAL ID')
      expect(screen.getByText(mockMerchantInternalId)).toBeInTheDocument()
    })

    it('should render the Number of MIDs heading and value', () => {
      render(getSingleViewLocationDetailsComponent())
      expect(screen.getAllByRole('heading')[4]).toHaveTextContent('NUMBER OF MIDS')
      expect(screen.getByText(mockLinkedMidsCount)).toBeInTheDocument()
    })

    it('should render the Physical Secondary MIDs heading and value', () => {
      render(getSingleViewLocationDetailsComponent())
      expect(screen.getAllByRole('heading')[6]).toHaveTextContent('SECONDARY MIDS')
      expect(screen.getByText(mockLinkedSecondaryMidsCount)).toBeInTheDocument()
    })

    describe('Test physical location', () => {
      it('should render the Physical Location heading', () => {
        render(getSingleViewLocationDetailsComponent())
        expect(screen.getAllByRole('heading')[5]).toHaveTextContent('PHYSICAL LOCATION')
      })

      it('should render enabled Physical Location text', () => {
        render(getSingleViewLocationDetailsComponent())
        expect(screen.getByText('Yes')).toBeInTheDocument()
      })

      it('should render disabled Physical Location text', () => {
        const location = {
          ...mockLocation,
          location_metadata: {
            is_physical_location: false,
          },
        }
        render(getSingleViewLocationDetailsComponent({location}))
        expect(screen.getByText('No')).toBeInTheDocument()
      })
    })
  })

  // TODO: Add functionality tests into each section
  describe('Test edit state', () => {
    it('should render the EditLocationForm', () => {
      render(getSingleViewLocationDetailsComponent({isInEditState: true}))
      expect(screen.getByTestId('EditLocationForm')).toBeInTheDocument()
    })
  })
})
