import React from 'react'
import {render} from '@testing-library/react'
import MerchantTile from 'components/MerchantTile'

describe('MerchantTile', () => {
  const mockName = 'mock_name'
  const mockUrl = '/mock_url'
  const mockSchemeLabel = 'mock_scheme_label'
  const mockSchemeCount = 3
  const mockPaymentSchemes = [
    {
      label: mockSchemeLabel,
      count: mockSchemeCount,
    },
  ]
  const mockLocationLabel = 'mock_location_label'
  const mockTotalLocations = 2

  const mockMerchant = {
    name: mockName,
    icon_url: mockUrl,
    slug: 'mock_slug',
    payment_schemes: mockPaymentSchemes,
    plan_id: 0,
    location_label: mockLocationLabel,
    pk: 'mock_pk',
    total_locations: mockTotalLocations,
  }

  it('should render edit button', () => {
    const {getByRole} = render(<MerchantTile merchant={mockMerchant} />)
    expect(getByRole('button', {name: /Edit Merchant/i})).toBeInTheDocument()
  })

  it('should render image component, merchant name and number of locations', () => {
    const {queryByTestId, getByText} = render(<MerchantTile merchant={mockMerchant} />)
    expect(queryByTestId('merchant-icon')).toBeInTheDocument()
    expect(getByText(mockName)).toBeInTheDocument()
    expect(getByText(`${mockTotalLocations} ${mockLocationLabel}s`)).toBeInTheDocument()
  })

  it('should render view merchant stores button', () => {
    const {getByRole} = render(<MerchantTile merchant={mockMerchant} />)
    expect(getByRole('button', {name: `View ${mockLocationLabel}s`})).toBeInTheDocument()
  })

  describe('Test Payment Scheme info', () => {
    it('should render payment scheme label and count', () => {
      const {getByText} = render(<MerchantTile merchant={mockMerchant} />)
      expect(getByText(mockSchemeLabel.toLocaleUpperCase())).toBeInTheDocument()
      expect(getByText(mockSchemeCount)).toBeInTheDocument()
    })
  })
})
