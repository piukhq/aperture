import React from 'react'
import {render, screen} from '@testing-library/react'
import SingleViewLocationSecondaryMids from 'components/DirectorySingleViewModal/components/SingleViewLocation/components/SingleViewLocationSecondaryMids'

jest.mock('components/DirectorySingleViewModal/components/SingleViewLocation/components/LocationMidsListItem',
  () => () => <div data-testid='LocationMidsListItem' />)

let mockGetMerchantLocationLinkedSecondaryMidsResponse = [
  {
    link_ref: 'mock_link_ref',
    payment_scheme_code: 1,
    secondary_mid_value: 'mock_secondary_mid_value',
    secondary_mid_ref: 'mock_secondary_mid_ref',
  },
  {
    link_ref: 'mock_link_ref',
    payment_scheme_code: 1,
    secondary_mid_value: 'mock_secondary_mid_value',
    secondary_mid_ref: 'mock_secondary_mid_ref',
  },
]

jest.mock('hooks/useMidManagementLocationMids', () => ({
  useMidManagementLocationMids: jest.fn().mockImplementation(() => ({
    getMerchantLocationLinkedSecondaryMidsResponse: mockGetMerchantLocationLinkedSecondaryMidsResponse,
    getMerchantLocationLinkedSecondaryMidsIsLoading: false,
  })),
}))

const useRouter = jest.spyOn(require('next/router'), 'useRouter')

describe('SingleViewLocationSecondaryMids', () => {
  beforeEach(() => {
    jest.clearAllMocks()

    useRouter.mockImplementation(() => ({
      query: {
        planId: 'mock_plan_id',
        merchantId: 'mock_merchant_id',
        ref: 'mock_location_ref',
      },
    }))
  })

  it('should render Link New Secondary MID button', () => {
    render(<SingleViewLocationSecondaryMids />)
    expect(screen.getByRole('button', {name: 'Link New Secondary MID'})).toBeInTheDocument()
  })

  it('should render the correct section heading', () => {
    render(<SingleViewLocationSecondaryMids />)
    expect(screen.getAllByRole('heading')[0]).toHaveTextContent('LINKED SECONDARY MIDS')
  })

  it('should render the LocationMidsListItem', () => {
    render(<SingleViewLocationSecondaryMids />)
    const midListItems = screen.queryAllByTestId('LocationMidsListItem')
    expect(midListItems).toHaveLength(2)
  })

  it('should render the no Secondary MIDs available message', () => {
    mockGetMerchantLocationLinkedSecondaryMidsResponse = []
    render(<SingleViewLocationSecondaryMids />)
    expect(screen.getByText('There are no Secondary MIDs to view.')).toBeInTheDocument()
  })
})
