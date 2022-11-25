import React from 'react'
import {render, screen, fireEvent} from '@testing-library/react'
import DirectoryMerchantLocationForm from 'components/DirectoryMerchantLocationForm'
import {PaymentSchemeSlug} from 'utils/enums'

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
      scheme_slug: PaymentSchemeSlug.VISA,
      count: 1,
    },
    {
      label: 'MASTERCARD',
      scheme_slug: PaymentSchemeSlug.MASTERCARD,
      count: 2,
    },
    {
      label: 'AMEX',
      scheme_slug: PaymentSchemeSlug.AMEX,
      count: 1,
    },
  ],
}

jest.mock('components/Dropdown', () => () => <div data-testid='parent-location-dropdown' />)

const mockSaveHandler = jest.fn()
const mockCancelHandler = jest.fn()
const mockIsLoading = false

const mockProps = {
  location: mockLocation,
  onSaveHandler: mockSaveHandler,
  onCancelHandler: mockCancelHandler,
  isLoading: false,
}

const getEditLocationFormComponent = (passedProps = {}) => (
  <DirectoryMerchantLocationForm {...mockProps} {...passedProps} />
)

describe('DirectoryMerchantLocationForm', () => {
  const setStateMock = jest.fn()
  const setIsPhysicalLocationStateMock = jest.fn()

  beforeEach(() => {
    jest.clearAllMocks()

    React.useState = jest
      .fn()
      .mockReturnValueOnce([mockName, setStateMock]) // nameValue
      .mockReturnValueOnce([null, setStateMock]) // nameValidationError
      .mockReturnValueOnce([mockLocationId, setStateMock]) // locationIdValue
      .mockReturnValueOnce([null, setStateMock]) // locationIdValidationError
      .mockReturnValueOnce([mockMerchantInternalId, setStateMock]) // merchantInternalIdValue
      .mockReturnValueOnce([mockIsPhysicalLocation, setIsPhysicalLocationStateMock]) // isPhysicalLocation
      .mockReturnValueOnce([mockAddressLine1, setStateMock]) // addressLine1Value
      .mockReturnValueOnce([null, setStateMock]) // addressLine1ValidationError
      .mockReturnValueOnce([mockAddressLine2, setStateMock]) // addressLine2Value
      .mockReturnValueOnce([mockTownCity, setStateMock]) // townCityValue
      .mockReturnValueOnce([mockCounty, setStateMock]) // countyValue
      .mockReturnValueOnce([mockCountry, setStateMock]) // countryValue
      .mockReturnValueOnce([mockPostcode, setStateMock]) // postcodeValue
      .mockReturnValueOnce([null, setStateMock]) // postcodeValidationError
      .mockReturnValueOnce([null, setStateMock]) // errorMessage
  })

  describe('Test Parent Location section', () => {
    it('should render the Parent Location section and Dropdown component', () => {
      render(getEditLocationFormComponent())
      expect(screen.getAllByRole('heading')[0]).toHaveTextContent('PARENT LOCATION')
      expect(screen.getByTestId('parent-location-section')).toBeInTheDocument()
      expect(screen.getByTestId('parent-location-dropdown')).toBeInTheDocument()
    })
  })

  describe('Test Identifiers section', () => {
    it('should render the Identifiers section and header', () => {
      render(getEditLocationFormComponent())
      expect(screen.getAllByRole('heading')[1]).toHaveTextContent('IDENTIFIERS')
      expect(screen.getByTestId('identifiers-section')).toBeInTheDocument()
    })

    it('should render the Location Name field', () => {
      render(getEditLocationFormComponent())
      const nameInput = screen.getByLabelText('Name')
      expect(nameInput).toBeInTheDocument()
      expect(nameInput).toHaveProperty('autofocus')
      expect(nameInput).toHaveValue(mockName)
    })

    it('should render the Location ID field', () => {
      render(getEditLocationFormComponent())
      const locationIdInput = screen.getByLabelText('Location ID')
      expect(locationIdInput).toBeInTheDocument()
      expect(locationIdInput).toHaveValue(mockLocationId)
    })

    it('should render the Merchant Internal ID field', () => {
      render(getEditLocationFormComponent())
      const merchantInternalIdInput = screen.getByLabelText('Merchant Internal ID')
      expect(merchantInternalIdInput).toBeInTheDocument()
      expect(merchantInternalIdInput).toHaveValue(mockMerchantInternalId)
    })
  })

  describe('Test physical location', () => {
    it('should render the Physical Location checkbox with text', () => {
      render(getEditLocationFormComponent())
      expect(screen.getByTestId('is-physical-location-checkbox')).toBeInTheDocument()
      expect(screen.getByText('Physical location')).toBeInTheDocument()
    })

    it('should render the enabled Physical Location', () => {
      render(getEditLocationFormComponent())
      const isPhysicalLocationCheckbox = screen.getByTestId('is-physical-location-checkbox')
      expect(isPhysicalLocationCheckbox).toBeChecked()
    })

    it('should render the disabled Physical Location', () => {
      React.useState = jest
        .fn()
        .mockReturnValueOnce([mockName, setStateMock]) // nameValue
        .mockReturnValueOnce([null, setStateMock]) // nameValidationError
        .mockReturnValueOnce([mockLocationId, setStateMock]) // locationIdValue
        .mockReturnValueOnce([null, setStateMock]) // locationIdValidationError
        .mockReturnValueOnce([mockMerchantInternalId, setStateMock]) // merchantInternalIdValue
        .mockReturnValue([false, setIsPhysicalLocationStateMock]) // isPhysicalLocation

      render(getEditLocationFormComponent())
      const isPhysicalLocationCheckbox = screen.getByTestId('is-physical-location-checkbox')
      expect(isPhysicalLocationCheckbox).not.toBeChecked()
    })
  })

  describe('Test Address section', () => {
    it('should not render the Address section', () => {
      React.useState = jest
        .fn()
        .mockReturnValueOnce([mockName, setStateMock]) // nameValue
        .mockReturnValueOnce([null, setStateMock]) // nameValidationError
        .mockReturnValueOnce([mockLocationId, setStateMock]) // locationIdValue
        .mockReturnValueOnce([null, setStateMock]) // locationIdValidationError
        .mockReturnValueOnce([mockMerchantInternalId, setStateMock]) // merchantInternalIdValue
        .mockReturnValue([false, setIsPhysicalLocationStateMock]) // isPhysicalLocation

      render(getEditLocationFormComponent())
      expect(screen.queryByTestId('address-section')).not.toBeInTheDocument()
    })

    it('should render the Address section and header', () => {
      render(getEditLocationFormComponent())
      expect(screen.getAllByRole('heading')[2]).toHaveTextContent('ADDRESS')
      expect(screen.getByTestId('address-section')).toBeInTheDocument()
    })

    it('should render the Line 1 field', () => {
      render(getEditLocationFormComponent())
      const line1Input = screen.getByLabelText('Line 1')
      expect(line1Input).toBeInTheDocument()
      expect(line1Input).toHaveValue(mockAddressLine1)
    })

    it('should render the Line 2 field', () => {
      render(getEditLocationFormComponent())
      const line2Input = screen.getByLabelText('Line 2')
      expect(line2Input).toBeInTheDocument()
      expect(line2Input).toHaveValue(mockAddressLine2)
    })

    it('should render the Town / City field', () => {
      render(getEditLocationFormComponent())
      const townCityInput = screen.getByLabelText('Town / City')
      expect(townCityInput).toBeInTheDocument()
      expect(townCityInput).toHaveValue(mockTownCity)
    })

    it('should render the County field', () => {
      render(getEditLocationFormComponent())
      const countyInput = screen.getByLabelText('County')
      expect(countyInput).toBeInTheDocument()
      expect(countyInput).toHaveValue(mockCounty)
    })

    it('should render the Country field', () => {
      render(getEditLocationFormComponent())
      const countryInput = screen.getByLabelText('Country')
      expect(countryInput).toBeInTheDocument()
      expect(countryInput).toHaveValue(mockCountry)
    })

    it('should render the Postcode field', () => {
      render(getEditLocationFormComponent())
      const postcodeInput = screen.getByLabelText('Postcode')
      expect(postcodeInput).toBeInTheDocument()
      expect(postcodeInput).toHaveValue(mockPostcode)
    })
  })

  describe('Test form footer elements', () => {
    it('should render the appropriate buttons', () => {
      render(getEditLocationFormComponent())

      expect(screen.getByRole('button', {name: 'Cancel'})).toBeInTheDocument()
      expect(screen.getByRole('button', {name: 'Save'})).toBeInTheDocument()
    })

    it('should render the error message', () => {
      React.useState = jest
        .fn()
        .mockReturnValueOnce([mockName, setStateMock]) // nameValue
        .mockReturnValue(['Error', setStateMock]) // nameValidationError

      render(getEditLocationFormComponent())
      expect(screen.getByTestId('error-message')).toBeInTheDocument()
    })

    it('should render a disabled button with correct label when saving', () => {
      render(getEditLocationFormComponent({isLoading: true}))
      const saveButton = screen.getByRole('button', {name: 'Save'})

      expect(saveButton).toBeInTheDocument()
      expect(saveButton).toBeDisabled()
    })
  })

  describe('Test functionality', () => {
    beforeEach(() => {
      jest.clearAllMocks()
    })

    it('should call the PUT function when save button is clicked and form is valid', () => {
      const locationBody = {
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
      }

      render(getEditLocationFormComponent())

      fireEvent.click(screen.getByRole('button', {name: 'Save'}))

      expect(mockSaveHandler).toBeCalledWith({
        ...locationBody,
      })
    })

    it('should display field specific error messages when mandatory fields are left blank', () => {
      const mockSetNameValidationError = jest.fn()
      const mockSetLocationIdValidationError = jest.fn()
      const mockSetAddressLine1ValidationError = jest.fn()
      const mockSetPostcodeValidationError = jest.fn()

      React.useState = jest
        .fn()
        .mockReturnValueOnce(['', setStateMock]) // nameValue
        .mockReturnValueOnce([null, mockSetNameValidationError]) // nameValidationError
        .mockReturnValueOnce(['', setStateMock]) // locationIdValue
        .mockReturnValueOnce([null, mockSetLocationIdValidationError]) // locationIdValidationError
        .mockReturnValueOnce([mockMerchantInternalId, setStateMock]) // merchantInternalIdValue
        .mockReturnValueOnce([mockIsPhysicalLocation, setIsPhysicalLocationStateMock]) // isPhysicalLocation
        .mockReturnValueOnce(['', setStateMock]) // addressLine1Value
        .mockReturnValueOnce([null, mockSetAddressLine1ValidationError]) // addressLine1ValidationError
        .mockReturnValueOnce([mockAddressLine2, setStateMock]) // addressLine2Value
        .mockReturnValueOnce([mockTownCity, setStateMock]) // townCityValue
        .mockReturnValueOnce([mockCounty, setStateMock]) // countyValue
        .mockReturnValueOnce([mockCountry, setStateMock]) // countryValue
        .mockReturnValueOnce(['', setStateMock]) // postcodeValue
        .mockReturnValueOnce([null, mockSetPostcodeValidationError]) // postcodeValidationError
        .mockReturnValueOnce([null, setStateMock]) // errorMessage

      render(getEditLocationFormComponent())

      const nameInput = screen.getByLabelText('Name')
      fireEvent.blur(nameInput)
      expect(mockSetNameValidationError).toHaveBeenCalledWith('Enter name')

      const locationIdInput = screen.getByLabelText('Location ID')
      fireEvent.blur(locationIdInput)
      expect(mockSetLocationIdValidationError).toHaveBeenCalledWith('Enter location ID')

      const addressLine1Input = screen.getByLabelText('Line 1')
      fireEvent.blur(addressLine1Input)
      expect(mockSetAddressLine1ValidationError).toHaveBeenCalledWith('Enter address line 1')

      const postcodeInput = screen.getByLabelText('Postcode')
      fireEvent.blur(postcodeInput)
      expect(mockSetPostcodeValidationError).toHaveBeenCalledWith('Enter postcode')
    })
  })
})