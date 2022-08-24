import React from 'react'
import {fireEvent, render, screen} from '@testing-library/react'
import SingleViewLocationMids from 'components/DirectorySingleViewModal/components/SingleViewLocation/components/SingleViewLocationMids'

jest.mock('components/DirectorySingleViewModal/components/LinkedListItem', () => () => <div data-testid='LinkedListItem' />)
jest.mock('components/DropDown', () => () => <div data-testid='Dropdown' />)

let mockGetMerchantLocationLinkedMidsResponse = [
  {
    link_ref: 'mock_link_ref',
    payment_scheme_code: 1,
    mid_value: 'mock_mid_value',
    mid_ref: 'mock_mid_ref',
  },
  {
    link_ref: 'mock_link_ref',
    payment_scheme_code: 1,
    mid_value: 'mock_mid_value',
    mid_ref: 'mock_mid_ref',
  },
]

const mockGetMerchantMidsResponse = [
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

const mockPostMerchantLocationLinkedMid = jest.fn()
jest.mock('hooks/useMidManagementLocationMids', () => ({
  useMidManagementLocationMids: jest.fn().mockImplementation(() => ({
    getMerchantLocationLinkedMidsResponse: mockGetMerchantLocationLinkedMidsResponse,
    getMerchantLocationLinkedMidsIsLoading: false,
    postMerchantLocationLinkedMid: mockPostMerchantLocationLinkedMid,
    postMerchantLocationLinkedMidIsLoading: false,
  })),
}))

jest.mock('hooks/useMidManagementMids', () => ({
  useMidManagementMids: jest.fn().mockImplementation(() => ({
    getMerchantMidsResponse: mockGetMerchantMidsResponse,
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

  it('should not render the Mid linking elements', () => {
    render(<SingleViewLocationMids />)

    expect(screen.queryByLabelText('Save Mid')).not.toBeInTheDocument()
    expect(screen.queryByLabelText('Cancel New Mid Link')).not.toBeInTheDocument()
    expect(screen.queryByTestId('Dropdown')).not.toBeInTheDocument()
  })

  describe('Test Link New Mid button functionality', () => {
    it('should not render the New Mid link button', () => {
      render(<SingleViewLocationMids />)
      fireEvent.click(screen.getByRole('button', {name: 'Link New MID'}))

      expect(screen.queryByRole('button', {name: 'Link New MID'})).not.toBeInTheDocument()
    })

    it('should render the Mid linking dropdown', () => {
      render(<SingleViewLocationMids />)
      fireEvent.click(screen.getByRole('button', {name: 'Link New MID'}))

      expect(screen.getByTestId('Dropdown')).toBeInTheDocument()
    })


    describe('Test Mid save button', () => {
      it('should render the Mid save button', () => {
        render(<SingleViewLocationMids />)
        fireEvent.click(screen.getByRole('button', {name: 'Link New MID'}))

        expect(screen.queryByLabelText('Save Mid')).toBeInTheDocument()
      })
    })

    describe('Test Mid link cancel button', () => {
      it('should render the Mid link cancel button', () => {
        render(<SingleViewLocationMids />)
        fireEvent.click(screen.getByRole('button', {name: 'Link New MID'}))

        expect(screen.queryByLabelText('Cancel New Mid Link')).toBeInTheDocument()
      })

      it('should not render the mid linking elements when cancel button is clicked', () => {
        render(<SingleViewLocationMids />)
        fireEvent.click(screen.getByRole('button', {name: 'Link New MID'}))
        fireEvent.click(screen.getByLabelText('Cancel New Mid Link'))

        expect(screen.queryByLabelText('Cancel New Mid Link')).not.toBeInTheDocument()
      })
    })
  })
})
