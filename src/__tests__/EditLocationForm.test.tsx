import React from 'react'
import * as Redux from 'react-redux'
import {render, screen} from '@testing-library/react'
import EditLocationForm from 'components/Modals/components/DirectorySingleViewModal/components/EditLocationForm/EditLocationForm'
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

const mockPutLocationFn = jest.fn()

jest.mock('hooks/useMidManagementLocations', () => ({
  useMidManagementLocations: jest.fn().mockImplementation(() => ({
    putMerchantLocation: mockPutLocationFn,
    putMerchantLocationIsSuccess: true,
    putMerchantLocationIsLoading: false,
    putMerchantLocationError: false,
    resetPutMerchantLocationResponse: jest.fn(),
  })),
}))

jest.mock('components/DirectoryMerchantLocationForm', () => () => <div data-testid='directory-merchant-location-form' />)

const useRouter = jest.spyOn(require('next/router'), 'useRouter')
const useDispatchMock = jest.spyOn(Redux, 'useDispatch')

const mockProps = {
  onCancelEditState: jest.fn(),
  location: mockLocation,
}

const mockPlanId = 'mock_plan_id'
const mockMerchantId = 'mock_merchant_id'
const mockTab = 'mock_tab'
const mockLocationRef = 'mock_location_ref'

const getEditLocationFormComponent = (passedProps = {}) => (
  <EditLocationForm {...mockProps} {...passedProps} />
)

describe('EditLocationForm', () => {
  beforeEach(() => {
    jest.clearAllMocks()

    useRouter.mockImplementation(() => ({
      query: {
        planId: mockPlanId,
        merchantId: mockMerchantId,
        tab: mockTab,
        ref: mockLocationRef,
      },
    }))

    const dummyDispatch = jest.fn()
    useDispatchMock.mockReturnValue(dummyDispatch)
  })

  it('should render the DirectoryMerchantLocationForm component', () => {
    render(getEditLocationFormComponent())
    expect(screen.getByTestId('directory-merchant-location-form')).toBeInTheDocument()
  })
})
