import React from 'react'
import {fireEvent, render, screen} from '@testing-library/react'
import SingleViewSecondaryMidLocations from 'components/DirectorySingleViewModal/components/SingleViewSecondaryMid/components/SingleViewSecondaryMidLocations'

jest.mock('components/DirectorySingleViewModal/components/LinkedListItem', () => () => <div data-testid='LinkedListItem' />)

let mockGetMerchantSecondaryMidLinkedLocationsResponse = [{
  link_ref: 'mock_link_ref',
  location_ref: 'mock_location_ref',
  location_title: 'mock_location_title',
}]

const mockGetMerchantLocations = []

jest.mock('hooks/useMidManagementSecondaryMidLocations', () => ({
  useMidManagementSecondaryMidLocations: jest.fn().mockImplementation(() => ({
    getMerchantSecondaryMidLinkedLocationsResponse: mockGetMerchantSecondaryMidLinkedLocationsResponse,
    getMerchantSecondaryMidLinkedLocationsIsLoading: false,
  })),
}))

jest.mock('hooks/useMidManagementLocations', () => ({
  useMidManagementLocations: jest.fn().mockImplementation(() => ({
    getMerchantLocationsResponse: mockGetMerchantLocations,
    getMerchantLocationsIsLoading: false,
  })),
}))

const useRouter = jest.spyOn(require('next/router'), 'useRouter')

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
  })

  it('should render Link New Location button', () => {
    render(<SingleViewSecondaryMidLocations />)
    expect(screen.getByRole('button', {name: 'Link New Location'})).toBeInTheDocument()
  })

  it('should render the correct section heading', () => {
    render(<SingleViewSecondaryMidLocations />)
    expect(screen.getByRole('heading')).toHaveTextContent('LINKED LOCATIONS')
  })

  it('should render the LinkedListItem', () => {
    render(<SingleViewSecondaryMidLocations />)
    const locationListItems = screen.queryAllByTestId('LinkedListItem')
    expect(locationListItems).toHaveLength(1)
  })

  it('should render the no linked Locations available message', () => {
    mockGetMerchantSecondaryMidLinkedLocationsResponse = []
    render(<SingleViewSecondaryMidLocations />)
    expect(screen.getByText('There are no Locations to view.')).toBeInTheDocument()
  })

  it('should render the no Locations available message', () => {
    mockGetMerchantSecondaryMidLinkedLocationsResponse = []
    render(<SingleViewSecondaryMidLocations />)

    fireEvent.click(screen.getByRole('button', {name: 'Link New Location'}))
    expect(screen.getByText('No Locations available to link for this Secondary MID')).toBeInTheDocument()
  })
})
