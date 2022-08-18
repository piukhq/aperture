import React from 'react'
import {render, screen} from '@testing-library/react'
import SingleViewSecondaryMidLocations from 'components/DirectorySingleViewModal/components/SingleViewSecondaryMid/components/SingleViewSecondaryMidLocations'

jest.mock('components/DirectorySingleViewModal/components/SingleViewSecondaryMid/components/SingleViewSecondaryMidLocations/components/SecondaryMidLocationsListItem',
  () => () => <div data-testid='SecondaryMidLocationsListItem' />)

let mockGetMerchantSecondaryMidLocationsResponse = [{
  link_ref: 'mock_link_ref',
  location_ref: 'mock_location_ref',
  location_title: 'mock_location_title',
}]

jest.mock('hooks/useMidManagementSecondaryMidLocations', () => ({
  useMidManagementSecondaryMidLocations: jest.fn().mockImplementation(() => ({
    getMerchantSecondaryMidLocationsResponse: mockGetMerchantSecondaryMidLocationsResponse,
    getMerchantSecondaryMidLocationsIsLoading: false,
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

  it('should render the SecondaryMidLocationsListItem', () => {
    render(<SingleViewSecondaryMidLocations />)
    const locationListItems = screen.queryAllByTestId('SecondaryMidLocationsListItem')
    expect(locationListItems).toHaveLength(1)
  })

  it('should render the no Locations available message', () => {
    mockGetMerchantSecondaryMidLocationsResponse = []
    render(<SingleViewSecondaryMidLocations />)
    expect(screen.getByText('There are no Locations to view.')).toBeInTheDocument()
  })
})
