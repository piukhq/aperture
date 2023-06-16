import React from 'react'
import {render, screen, fireEvent} from '@testing-library/react'
import DirectoryMerchantLocationForm from 'components/DirectoryMerchantLocationForm'
import {PaymentSchemeSlug} from 'utils/enums'
import {Provider} from 'react-redux'
import configureStore from 'redux-mock-store'

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
}

jest.mock('components/Dropdown', () => () => <div data-testid='parent-location-dropdown' />)
const useRouter = jest.spyOn(require('next/router'), 'useRouter')

const mockSaveHandler = jest.fn()
const mockCancelHandler = jest.fn()

const mockProps = {
  location: mockLocation,
  isExistingLocation: false,
  isExistingSubLocation: false,
  isNewLocationSubLocation: false,
  setIsInEditState: jest.fn(),
  parentLocationStrings: [],
  parentLocation: 'None',
  parentLocationChangeHandler: jest.fn(),
  onSaveHandler: mockSaveHandler,
  onCancelHandler: mockCancelHandler,
  resetResponse: jest.fn(),
  isSuccess: false,
  isLoading: false,
  error: null,
}


const mockStoreFn = configureStore([])
const store = mockStoreFn({})

const getDirectoryMerchantModalComponent = (passedProps = {}) => (
  <Provider store={store}>
    <DirectoryMerchantLocationForm {...mockProps} {...passedProps} />
  </Provider>
)


describe('DirectoryMerchantLocationForm', () => {
  const setStateMock = jest.fn()
  const setIsPhysicalLocationStateMock = jest.fn()

  beforeEach(() => {
    jest.clearAllMocks()

    useRouter.mockImplementation(() => ({
      query: {
        planId: 'mock_plan_id',
        merchantId: 'mock_merchant_id',
        ref: 'mock_ref',
      },
    }))

    React.useState = jest
      .fn()
      .mockReturnValueOnce([mockName, setStateMock]) // nameValue
      .mockReturnValueOnce(['', setStateMock]) // nameValidationError
      .mockReturnValueOnce([mockLocationId, setStateMock]) // locationIdValue
      .mockReturnValueOnce(['', setStateMock]) // locationIdValidationError
      .mockReturnValueOnce([mockMerchantInternalId, setStateMock]) // merchantInternalIdValue
      .mockReturnValueOnce([mockIsPhysicalLocation, setIsPhysicalLocationStateMock]) // isPhysicalLocation
      .mockReturnValueOnce([mockAddressLine1, setStateMock]) // addressLine1Value
      .mockReturnValueOnce(['', setStateMock]) // addressLine1ValidationError
      .mockReturnValueOnce([mockAddressLine2, setStateMock]) // addressLine2Value
      .mockReturnValueOnce([mockTownCity, setStateMock]) // townCityValue
      .mockReturnValueOnce([mockCounty, setStateMock]) // countyValue
      .mockReturnValueOnce([mockCountry, setStateMock]) // countryValue
      .mockReturnValueOnce([mockPostcode, setStateMock]) // postcodeValue
      .mockReturnValueOnce(['', setStateMock]) // postcodeValidationError
      .mockReturnValueOnce(['', setStateMock]) // errorMessage
  })

  describe('Test Parent Location section', () => {
    it('should render the Parent Location section and Dropdown component', () => {
      render(getDirectoryMerchantModalComponent())
      expect(screen.getAllByRole('heading')[0]).toHaveTextContent('PARENT LOCATION')
      expect(screen.getByTestId('parent-location-section')).toBeInTheDocument()
      expect(screen.getByTestId('parent-location-dropdown')).toBeInTheDocument()
    })

    it('should render the Parent Location info message', () => {
      render(getDirectoryMerchantModalComponent({parentLocation: 'selected_location'}))
      expect(screen.getByText(
        'This location will be created as a sub-location and will inherit the MID & Secondary MID information of its parent location. You will not be able to add MIDs to this sub-location'
      )).toBeInTheDocument()
    })

    it('should not render the Parent Location section for an existing location', () => {
      render(getDirectoryMerchantModalComponent({isExistingLocation: true}))
      expect(screen.queryAllByRole('heading')[0]).not.toHaveTextContent('PARENT LOCATION')
      expect(screen.queryByTestId('parent-location-section')).not.toBeInTheDocument()
      expect(screen.queryByTestId('parent-location-dropdown')).not.toBeInTheDocument()
    })
  })

  describe('Test Identifiers section', () => {
    it('should render the Identifiers section and header', () => {
      render(getDirectoryMerchantModalComponent())
      expect(screen.getAllByRole('heading')[1]).toHaveTextContent('IDENTIFIERS')
      expect(screen.getByTestId('identifiers-section')).toBeInTheDocument()
    })

    it('should render the Location Name field', () => {
      render(getDirectoryMerchantModalComponent())
      const nameInput = screen.getByLabelText('Name')
      expect(nameInput).toHaveProperty('autofocus')
      expect(nameInput).toHaveValue(mockName)
    })

    it('should render the Location ID field', () => {
      render(getDirectoryMerchantModalComponent())
      const locationIdInput = screen.getByLabelText('Location ID')
      expect(locationIdInput).toHaveValue(mockLocationId)
    })

    it('should not render the Location ID field', () => {
      render(getDirectoryMerchantModalComponent({parentLocation: 'selected_location'}))
      expect(screen.queryByLabelText('Location ID')).not.toBeInTheDocument()
    })

    it('should render the Merchant Internal ID field', () => {
      render(getDirectoryMerchantModalComponent())
      const merchantInternalIdInput = screen.getByLabelText('Merchant Internal ID')
      expect(merchantInternalIdInput).toHaveValue(mockMerchantInternalId)
    })

    it('should not render the Merchant Internal ID field', () => {
      render(getDirectoryMerchantModalComponent({parentLocation: 'selected_location'}))
      expect(screen.queryByLabelText('Merchant Internal ID')).not.toBeInTheDocument()
    })
  })

  describe('Test physical location', () => {
    it('should render the Physical Location checkbox with text', () => {
      render(getDirectoryMerchantModalComponent())
      expect(screen.getByTestId('is-physical-location-checkbox')).toBeInTheDocument()
      expect(screen.getByText('Physical location')).toBeInTheDocument()
    })

    it('should render the enabled Physical Location', () => {
      render(getDirectoryMerchantModalComponent())
      const isPhysicalLocationCheckbox = screen.getByTestId('is-physical-location-checkbox')
      expect(isPhysicalLocationCheckbox).toBeChecked()
    })

    it('should render the disabled Physical Location', () => {
      React.useState = jest
        .fn()
        .mockReturnValueOnce([mockName, setStateMock]) // nameValue
        .mockReturnValueOnce(['', setStateMock]) // nameValidationError
        .mockReturnValueOnce([mockLocationId, setStateMock]) // locationIdValue
        .mockReturnValueOnce(['', setStateMock]) // locationIdValidationError
        .mockReturnValueOnce([mockMerchantInternalId, setStateMock]) // merchantInternalIdValue
        .mockReturnValue([false, setIsPhysicalLocationStateMock]) // isPhysicalLocation

      render(getDirectoryMerchantModalComponent())
      const isPhysicalLocationCheckbox = screen.getByTestId('is-physical-location-checkbox')
      expect(isPhysicalLocationCheckbox).not.toBeChecked()
    })
  })

  describe('Test Address section', () => {
    it('should not render the Address section', () => {
      React.useState = jest
        .fn()
        .mockReturnValueOnce([mockName, setStateMock]) // nameValue
        .mockReturnValueOnce(['', setStateMock]) // nameValidationError
        .mockReturnValueOnce([mockLocationId, setStateMock]) // locationIdValue
        .mockReturnValueOnce(['', setStateMock]) // locationIdValidationError
        .mockReturnValueOnce([mockMerchantInternalId, setStateMock]) // merchantInternalIdValue
        .mockReturnValue([false, setIsPhysicalLocationStateMock]) // isPhysicalLocation

      render(getDirectoryMerchantModalComponent())
      expect(screen.queryByTestId('address-section')).not.toBeInTheDocument()
    })

    it('should render the Address section and header', () => {
      render(getDirectoryMerchantModalComponent())
      expect(screen.getAllByRole('heading')[2]).toHaveTextContent('ADDRESS')
      expect(screen.getByTestId('address-section')).toBeInTheDocument()
    })

    it('should render the Line 1 field', () => {
      render(getDirectoryMerchantModalComponent())
      const line1Input = screen.getByLabelText('Line 1')
      expect(line1Input).toHaveValue(mockAddressLine1)
    })

    it('should render the Line 2 field', () => {
      render(getDirectoryMerchantModalComponent())
      const line2Input = screen.getByLabelText('Line 2')
      expect(line2Input).toHaveValue(mockAddressLine2)
    })

    it('should render the Town / City field', () => {
      render(getDirectoryMerchantModalComponent())
      const townCityInput = screen.getByLabelText('Town / City')
      expect(townCityInput).toHaveValue(mockTownCity)
    })

    it('should render the County field', () => {
      render(getDirectoryMerchantModalComponent())
      const countyInput = screen.getByLabelText('County')
      expect(countyInput).toHaveValue(mockCounty)
    })

    it('should render the Country field', () => {
      render(getDirectoryMerchantModalComponent())
      const countryInput = screen.getByLabelText('Country')
      expect(countryInput).toHaveValue(mockCountry)
    })

    it('should render the Postcode field', () => {
      render(getDirectoryMerchantModalComponent())
      const postcodeInput = screen.getByLabelText('Postcode')
      expect(postcodeInput).toHaveValue(mockPostcode)
    })
  })

  describe('Test form footer elements', () => {
    it('should render the appropriate buttons', () => {
      render(getDirectoryMerchantModalComponent())

      expect(screen.getByRole('button', {name: 'Cancel'})).toBeInTheDocument()
      expect(screen.getByRole('button', {name: 'Save'})).toBeInTheDocument()
    })

    it('should render the error message', () => {
      React.useState = jest
        .fn()
        .mockReturnValueOnce([mockName, setStateMock]) // nameValue
        .mockReturnValue(['Error', setStateMock]) // nameValidationError

      render(getDirectoryMerchantModalComponent())
      expect(screen.getByTestId('error-message')).toBeInTheDocument()
    })

    it('should render a disabled button with correct label when saving', () => {
      render(getDirectoryMerchantModalComponent({isLoading: true}))
      const saveButton = screen.getByRole('button', {name: 'Save'})

      expect(saveButton).toBeDisabled()
    })
  })

  describe('Test functionality', () => {
    beforeEach(() => {
      jest.clearAllMocks()
    })

    it('should call the Save function when save button is clicked and form is valid', () => {
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

      render(getDirectoryMerchantModalComponent())

      fireEvent.click(screen.getByRole('button', {name: 'Save'}))

      expect(mockSaveHandler).toBeCalledWith({
        ...locationBody,
      })
    })

    it('should call the Save function with address fields removed if physical location is unchecked', () => {
      React.useState = jest
        .fn()
        .mockReturnValueOnce([mockName, setStateMock]) // nameValue
        .mockReturnValueOnce(['', setStateMock]) // nameValidationError
        .mockReturnValueOnce([mockLocationId, setStateMock]) // locationIdValue
        .mockReturnValueOnce(['', setStateMock]) // locationIdValidationError
        .mockReturnValueOnce([mockMerchantInternalId, setStateMock]) // merchantInternalIdValue
        .mockReturnValue([false, setIsPhysicalLocationStateMock]) // isPhysicalLocation

      render(getDirectoryMerchantModalComponent({mockIsPhysicalLocation: false}))

      fireEvent.click(screen.getByRole('button', {name: 'Save'}))

      expect(mockSaveHandler).toBeCalledWith({
        name: mockName,
        location_id: mockLocationId,
        merchant_internal_id: mockMerchantInternalId,
        is_physical_location: false,
        address_line_1: '',
        address_line_2: '',
        town_city: '',
        county: '',
        country: '',
        postcode: '',
      })
    })

    describe('Test form validation', () => {
      const mockSetNameValidationError = jest.fn()
      const mockSetLocationIdValidationError = jest.fn()
      const mockSetAddressLine1ValidationError = jest.fn()
      const mockSetPostcodeValidationError = jest.fn()

      beforeEach(() => {
        React.useState = jest
          .fn()
          .mockReturnValueOnce(['', setStateMock]) // nameValue
          .mockReturnValueOnce(['', mockSetNameValidationError]) // nameValidationError
          .mockReturnValueOnce(['', setStateMock]) // locationIdValue
          .mockReturnValueOnce(['', mockSetLocationIdValidationError]) // locationIdValidationError
          .mockReturnValueOnce([mockMerchantInternalId, setStateMock]) // merchantInternalIdValue
          .mockReturnValueOnce([mockIsPhysicalLocation, setIsPhysicalLocationStateMock]) // isPhysicalLocation
          .mockReturnValueOnce(['', setStateMock]) // addressLine1Value
          .mockReturnValueOnce(['', mockSetAddressLine1ValidationError]) // addressLine1ValidationError
          .mockReturnValueOnce([mockAddressLine2, setStateMock]) // addressLine2Value
          .mockReturnValueOnce([mockTownCity, setStateMock]) // townCityValue
          .mockReturnValueOnce([mockCounty, setStateMock]) // countyValue
          .mockReturnValueOnce([mockCountry, setStateMock]) // countryValue
          .mockReturnValueOnce(['', setStateMock]) // postcodeValue
          .mockReturnValueOnce(['', mockSetPostcodeValidationError]) // postcodeValidationError
          .mockReturnValueOnce(['', setStateMock]) // errorMessage
      })

      it('should display field specific error messages when mandatory fields are left blank after blurring them', () => {
        render(getDirectoryMerchantModalComponent())

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

      it('should display field specific error messages when mandatory fields are left blank after clicking save', () => {
        render(getDirectoryMerchantModalComponent())

        fireEvent.click(screen.getByRole('button', {name: 'Save'}))
        expect(mockSetNameValidationError).toHaveBeenCalledWith('Enter name')
        expect(mockSetLocationIdValidationError).toHaveBeenCalledWith('Enter location ID')
        expect(mockSetAddressLine1ValidationError).toHaveBeenCalledWith('Enter address line 1')
        expect(mockSetPostcodeValidationError).toHaveBeenCalledWith('Enter postcode')
      })
    })
  })

  describe('Test sub-location appearance', () => {
    it('should not render the location id field', () => {
      render(getDirectoryMerchantModalComponent({isExistingSubLocation: true}))
      expect(screen.queryByLabelText('Location ID')).not.toBeInTheDocument()
    })

    it('should not render the merchant internal id field', () => {
      render(getDirectoryMerchantModalComponent({isExistingSubLocation: true}))
      expect(screen.queryByLabelText('Merchant Internal ID')).not.toBeInTheDocument()
    })

    it('should render the parent location as text', () => {
      render(getDirectoryMerchantModalComponent({isExistingSubLocation: true}))
      expect(screen.getByTestId('parent-location')).toHaveTextContent(mockProps.parentLocation)
      expect(screen.queryByTestId('parent-location-dropdown')).not.toBeInTheDocument()
    })

    it('should not render the Parent Location info message', () => {
      render(getDirectoryMerchantModalComponent({parentLocation: 'selected_location', isNewLocationSubLocation: true}))
      expect(screen.queryByText(
        'This location will be created as a sub-location and will inherit the MID & Secondary MID information of its parent location. You will not be able to add MIDs to this sub-location'
      )).not.toBeInTheDocument()
    })
  })

  describe('Test location sub-location appearance', () => {
    it('should render the parent location as text', () => {
      render(getDirectoryMerchantModalComponent({isNewLocationSubLocation: true}))
      expect(screen.getByTestId('parent-location')).toHaveTextContent(mockProps.parentLocation)
      expect(screen.queryByTestId('parent-location-dropdown')).not.toBeInTheDocument()
    })

    it('should not render the Parent Location info message', () => {
      render(getDirectoryMerchantModalComponent({parentLocation: 'selected_location', isNewLocationSubLocation: true}))
      expect(screen.queryByText(
        'This location will be created as a sub-location and will inherit the MID & Secondary MID information of its parent location. You will not be able to add MIDs to this sub-location'
      )).not.toBeInTheDocument()
    })
  })
})
