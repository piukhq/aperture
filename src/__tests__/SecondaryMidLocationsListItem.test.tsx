import React from 'react'
import {render, screen} from '@testing-library/react'

import SecondaryMidLocationsListItem from 'components/DirectorySingleViewModal/components/SingleViewSecondaryMid/components/SingleViewSecondaryMidLocations/components/SecondaryMidLocationsListItem'

jest.mock('components/DirectorySingleViewModal/components/SingleViewLocation/components/PaymentCardIcon', () => () => <div data-testid='payment-card-icon' />)

const mockLocationRef = 'mock_location_ref'
const mockLocationTitle = 'mock_location_title'

const mockProps = {
  locationRef: mockLocationRef,
  locationTitle: mockLocationTitle,
}

const getLocationMidsListItemComponent = (passedProps = {}) => (
  <SecondaryMidLocationsListItem {...mockProps} {...passedProps} />
)

describe('SecondaryMidLocationsListItem', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should render the location title', () => {
    render(getLocationMidsListItemComponent())
    expect(screen.getByText(mockLocationTitle)).toBeInTheDocument()
  })

  it('should render the default buttons', () => {
    render(getLocationMidsListItemComponent())
    expect(screen.getByLabelText('View')).toBeInTheDocument()
    expect(screen.getByLabelText('Unlink')).toBeInTheDocument()
  })
})
