import React from 'react'
import {render, screen} from '@testing-library/react'
import SingleViewLocationDetails from 'components/DirectorySingleViewModal/components/SingleViewLocation/components/SingleViewLocationDetails'

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
      expect(screen.getAllByRole('heading')[3]).toHaveTextContent('MERCHANT ID')
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
        React.useState = jest.fn().mockReturnValueOnce([false, jest.fn()]) // isPhysicalLocation

        render(getSingleViewLocationDetailsComponent())
        expect(screen.getByText('No')).toBeInTheDocument()
      })
    })
  })

  // TODO: Add functionality tests into each section
  describe('Test edit state', () => {
    let editingSingleViewLocationDetailsComponent

    beforeEach(() => {
      jest.clearAllMocks()

      editingSingleViewLocationDetailsComponent = getSingleViewLocationDetailsComponent({isInEditState: true})
    })

    it('should render the edit location form', () => {
      render(editingSingleViewLocationDetailsComponent)
      expect(screen.getByTestId('location-editing-form')).toBeInTheDocument()
    })

    describe('Test Identifiers section', () => {
      it('should render the Identifiers section and header', () => {
        render(editingSingleViewLocationDetailsComponent)
        expect(screen.getAllByRole('heading')[0]).toHaveTextContent('IDENTIFIERS')
        expect(screen.getByTestId('identifiers-section')).toBeInTheDocument()
      })

      it('should render the Location Name field', () => {
        render(editingSingleViewLocationDetailsComponent)
        const nameInput = screen.getByLabelText('Name')
        expect(nameInput).toBeInTheDocument()
        expect(nameInput).toHaveProperty('autofocus')
        expect(nameInput).toHaveValue(mockName)
      })

      it('should render the Location ID field', () => {
        render(editingSingleViewLocationDetailsComponent)
        const locationIdInput = screen.getByLabelText('Location ID')
        expect(locationIdInput).toBeInTheDocument()
        expect(locationIdInput).toHaveValue(mockLocationId)
      })

      it('should render the Merchant Internal ID field', () => {
        render(editingSingleViewLocationDetailsComponent)
        const merchantInternalIdInput = screen.getByLabelText('Merchant Internal ID')
        expect(merchantInternalIdInput).toBeInTheDocument()
        expect(merchantInternalIdInput).toHaveValue(mockMerchantInternalId)
      })
    })

    describe('Test physical location', () => {
      it('should render the Physical Loaction checkbox with text', () => {
        render(editingSingleViewLocationDetailsComponent)
        expect(screen.getByTestId('is-physical-location-checkbox')).toBeInTheDocument()
        expect(screen.getByText('Physical location')).toBeInTheDocument()
      })

      it('should render the enabled Physical Loaction', () => {
        render(editingSingleViewLocationDetailsComponent)
        const isPhysicalLocationCheckbox = screen.getByTestId('is-physical-location-checkbox')
        expect(isPhysicalLocationCheckbox).toBeChecked()
      })

      it('should render the disabled Physical Loaction', () => {
        React.useState = jest.fn().mockReturnValueOnce([false, jest.fn()]) // isPhysicalLocation

        render(editingSingleViewLocationDetailsComponent)
        const isPhysicalLocationCheckbox = screen.getByTestId('is-physical-location-checkbox')
        expect(isPhysicalLocationCheckbox).not.toBeChecked()
      })
    })

    describe('Test Address section', () => {
      it('should not render the Address section', () => {
        React.useState = jest.fn().mockReturnValueOnce([false, jest.fn()]) // isPhysicalLocation

        render(editingSingleViewLocationDetailsComponent)
        expect(screen.queryByTestId('address-section')).not.toBeInTheDocument()
      })

      it('should render the Address section and header', () => {
        render(editingSingleViewLocationDetailsComponent)
        expect(screen.getAllByRole('heading')[1]).toHaveTextContent('ADDRESS')
        expect(screen.getByTestId('address-section')).toBeInTheDocument()
      })

      it('should render the Line 1 field', () => {
        render(editingSingleViewLocationDetailsComponent)
        const line1Input = screen.getByLabelText('Line 1')
        expect(line1Input).toBeInTheDocument()
        expect(line1Input).toHaveValue(mockAddressLine1)
      })

      it('should render the Line 2 field', () => {
        render(editingSingleViewLocationDetailsComponent)
        const line2Input = screen.getByLabelText('Line 2')
        expect(line2Input).toBeInTheDocument()
        expect(line2Input).toHaveValue(mockAddressLine2)
      })

      it('should render the Town / City field', () => {
        render(editingSingleViewLocationDetailsComponent)
        const townCityInput = screen.getByLabelText('Town / City')
        expect(townCityInput).toBeInTheDocument()
        expect(townCityInput).toHaveValue(mockTownCity)
      })

      it('should render the County field', () => {
        render(editingSingleViewLocationDetailsComponent)
        const countyInput = screen.getByLabelText('County')
        expect(countyInput).toBeInTheDocument()
        expect(countyInput).toHaveValue(mockCounty)
      })

      it('should render the Country field', () => {
        render(editingSingleViewLocationDetailsComponent)
        const countryInput = screen.getByLabelText('Country')
        expect(countryInput).toBeInTheDocument()
        expect(countryInput).toHaveValue(mockCountry)
      })

      it('should render the Postcode field', () => {
        render(editingSingleViewLocationDetailsComponent)
        const postcodeInput = screen.getByLabelText('Postcode')
        expect(postcodeInput).toBeInTheDocument()
        expect(postcodeInput).toHaveValue(mockPostcode)
      })
    })
  })
})
