import React from 'react'
import {render, screen} from '@testing-library/react'
import SingleViewLocationMids from 'components/Modals/components/DirectorySingleViewModal/components/SingleViewLocation/components/SingleViewLocationMids'

jest.mock('components/DirectorySingleViewModal/components/LinkedListItem', () => () => <div data-testid='LinkedListItem' />)

let mockGetMerchantLocationLinkedMidsResponse = [
  {
    payment_scheme_code: 1,
    mid_value: 'mock_mid_value',
    mid_ref: 'mock_mid_ref',
  },
  {
    payment_scheme_code: 1,
    mid_value: 'mock_mid_value',
    mid_ref: 'mock_mid_ref',
  },
]

jest.mock('hooks/useMidManagementLocationMids', () => ({
  useMidManagementLocationMids: jest.fn().mockImplementation(() => ({
    getMerchantLocationLinkedMidsResponse: mockGetMerchantLocationLinkedMidsResponse,
    getMerchantLocationLinkedMidsIsLoading: false,
  })),
}))

const useRouter = jest.spyOn(require('next/router'), 'useRouter')

describe('SingleViewLocationMids', () => {
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

  it('should render Link New MID button', () => {
    render(<SingleViewLocationMids />)
    expect(screen.getByRole('button', {name: 'Link New MID'})).toBeInTheDocument()
  })

  it('should render the correct section heading', () => {
    render(<SingleViewLocationMids />)
    expect(screen.getAllByRole('heading')[0]).toHaveTextContent('LINKED MIDS')
  })

  it('should render the LinkedListItem', () => {
    render(<SingleViewLocationMids />)
    const midListItems = screen.queryAllByTestId('LinkedListItem')
    expect(midListItems).toHaveLength(2)
  })

  it('should render the no MIDs available message', () => {
    mockGetMerchantLocationLinkedMidsResponse = []
    render(<SingleViewLocationMids />)
    expect(screen.getByText('There are no MIDs to view.')).toBeInTheDocument()
  })
})
