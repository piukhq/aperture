import React from 'react'
import {fireEvent, render, screen} from '@testing-library/react'
import SingleViewSecondaryMidLocations from 'components/Modals/components/DirectorySingleViewModal/components/SingleViewSecondaryMid/components/SingleViewSecondaryMidLocations'
import {Provider} from 'react-redux'
import configureStore from 'redux-mock-store'

jest.mock('components/Modals/components/DirectorySingleViewModal/components/LinkedListItem', () => () => <div data-testid='LinkedListItem' />)
jest.mock('components/Modals/components/DirectorySingleViewModal/components/SingleViewCombobox', () => () => <div data-testid='SingleViewCombobox' />)

let mockGetMerchantSecondaryMidLinkedLocationsResponse = [{
  link_ref: 'mock_link_ref',
  location_ref: 'mock_location_ref',
  location_title: 'mock_location_title',
}]

let mockGetMerchantLocations = []

jest.mock('hooks/useDirectorySecondaryMidLocations', () => ({
  useDirectorySecondaryMidLocations: jest.fn().mockImplementation(() => ({
    getMerchantSecondaryMidLinkedLocationsResponse: mockGetMerchantSecondaryMidLinkedLocationsResponse,
    getMerchantSecondaryMidLinkedLocationsIsLoading: false,
    postMerchantSecondaryMidLocationLink: jest.fn(),
    postMerchantSecondaryMidLocationLinkIsLoading: false,
    postMerchantSecondaryMidLocationLinkIsSuccess: false,
    resetPostMerchantSecondaryMidLocationLink: jest.fn(),
    deleteMerchantSecondaryMidLocationLink: jest.fn(),
    deleteMerchantSecondaryMidLocationLinkIsSuccess: false,
    deleteMerchantSecondaryMidLocationLinkIsLoading: false,
    resetDeleteMerchantSecondaryMidLocationLinkResponse: jest.fn(),
  })),
}))

jest.mock('hooks/useDirectoryLocations', () => ({
  useDirectoryLocations: jest.fn().mockImplementation(() => ({
    getMerchantLocationsResponse: mockGetMerchantLocations,
    getMerchantLocationsIsLoading: false,
    getMerchantLocationsRefresh: jest.fn(),
  })),
}))

const useRouter = jest.spyOn(require('next/router'), 'useRouter')

const mockStoreFn = configureStore([])
const store = mockStoreFn({})

const getSingleViewSecondaryMidsLocationComponent = (passedStore = undefined) => (
  <Provider store={passedStore || store}>
    <SingleViewSecondaryMidLocations />
  </Provider>
)

describe('SingleViewSecondaryMidLocations', () => {
  beforeEach(() => {
    jest.clearAllMocks()

    useRouter.mockImplementation(() => ({
      query: {
        planId: 'mock_plan_id',
        merchantId: 'mock_merchant_id',
        ref: 'mock_secondary_mid_ref',
      },
    }))

    mockGetMerchantLocations = []
  })

  it('should render Link New Location button', () => {
    render(getSingleViewSecondaryMidsLocationComponent())
    expect(screen.getByRole('button', {name: 'Link New Location'})).toBeInTheDocument()
  })

  it('should render the correct section heading', () => {
    render(getSingleViewSecondaryMidsLocationComponent())
    expect(screen.getByRole('heading')).toHaveTextContent('LINKED LOCATIONS')
  })

  it('should render the LinkedListItem', () => {
    render(getSingleViewSecondaryMidsLocationComponent())
    const locationListItems = screen.queryAllByTestId('LinkedListItem')
    expect(locationListItems).toHaveLength(1)
  })

  it('should render the no linked Locations available message', () => {
    mockGetMerchantSecondaryMidLinkedLocationsResponse = []
    render(getSingleViewSecondaryMidsLocationComponent())
    expect(screen.getByText('There are no Locations to view.')).toBeInTheDocument()
  })

  it('should render the no available Locations message', () => {
    mockGetMerchantSecondaryMidLinkedLocationsResponse = []
    render(getSingleViewSecondaryMidsLocationComponent())

    fireEvent.click(screen.getByRole('button', {name: 'Link New Location'}))
    expect(screen.getByText('No Locations available to link for this Secondary MID')).toBeInTheDocument()
  })

  describe('Link New Location functionality', () => {
    beforeEach(() => {
      mockGetMerchantLocations = [{
        location_ref: 'mock_location_ref',
        location_metadata: {
          name: 'mock_location_name',
        },
      }]
    })

    it('should render the Link New Location dropdown', () => {
      render(getSingleViewSecondaryMidsLocationComponent())
      fireEvent.click(screen.getByRole('button', {name: 'Link New Location'}))
      expect(screen.getByTestId('SingleViewCombobox')).toBeInTheDocument()
    })

    it('should render the Link New Location save button', () => {
      render(getSingleViewSecondaryMidsLocationComponent())
      fireEvent.click(screen.getByRole('button', {name: 'Link New Location'}))
      expect(screen.getByRole('button', {name: 'Save Location'})).toBeInTheDocument()
    })

    it('should render the Link New Location cancel button', () => {
      render(getSingleViewSecondaryMidsLocationComponent())
      fireEvent.click(screen.getByRole('button', {name: 'Link New Location'}))

      expect(screen.getByRole('button', {name: 'Cancel Location Link'})).toBeInTheDocument()
    })
    it('should revert to default view after clicking the Link New Location cancel button', () => {
      render(getSingleViewSecondaryMidsLocationComponent())
      fireEvent.click(screen.getByRole('button', {name: 'Link New Location'}))
      fireEvent.click(screen.getByRole('button', {name: 'Cancel Location Link'}))

      expect(screen.getByRole('button', {name: 'Link New Location'})).toBeInTheDocument()
      expect(screen.queryByRole('button', {name: 'Cancel Location Link'})).not.toBeInTheDocument()
      expect(screen.queryByRole('button', {name: 'Select Location'})).not.toBeInTheDocument()
    })
  })

})
