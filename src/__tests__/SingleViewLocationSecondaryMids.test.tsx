import React from 'react'
import {fireEvent, render, screen} from '@testing-library/react'
import SingleViewLocationSecondaryMids from 'components/DirectorySingleViewModal/components/SingleViewLocation/components/SingleViewLocationSecondaryMids'

jest.mock('components/DirectorySingleViewModal/components/SingleViewLocation/components/LocationMidsListItem',
  () => () => <div data-testid='LocationMidsListItem' />)
jest.mock('components/DropDown',
  () => () => <div data-testid='Dropdown' />)

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

const mockGetMerchantSecondaryMidsResponse = [
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

const mockPostMerchantLocationLinkedSecondaryMid = jest.fn()
jest.mock('hooks/useMidManagementLocationSecondaryMids', () => ({
  useMidManagementLocationSecondaryMids: jest.fn().mockImplementation(() => ({
    getMerchantLocationLinkedSecondaryMidsResponse: mockGetMerchantLocationLinkedSecondaryMidsResponse,
    getMerchantLocationLinkedSecondaryMidsIsLoading: false,
    postMerchantLocationLinkedSecondaryMid: mockPostMerchantLocationLinkedSecondaryMid,
    postMerchantLocationLinkedSecondaryMidIsLoading: false,
  })),
}))


jest.mock('hooks/useMidManagementSecondaryMids', () => ({
  useMidManagementSecondaryMids: jest.fn().mockImplementation(() => ({
    getMerchantSecondaryMidsResponse: mockGetMerchantSecondaryMidsResponse,
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

  it('should not render the Secondary Mid linking elements', () => {
    render(<SingleViewLocationSecondaryMids />)

    expect(screen.queryByLabelText('Save Secondary Mid')).not.toBeInTheDocument()
    expect(screen.queryByLabelText('Cancel New Secondary Mid Link')).not.toBeInTheDocument()
    expect(screen.queryByTestId('Dropdown')).not.toBeInTheDocument()
  })

  describe('Test Link New Secondary Mid button functionality', () => {
    it('should not render the New Secondary Mid link button', () => {
      render(<SingleViewLocationSecondaryMids />)
      fireEvent.click(screen.getByRole('button', {name: 'Link New Secondary MID'}))

      expect(screen.queryByRole('button', {name: 'Link New Secondary MID'})).not.toBeInTheDocument()
    })

    it('should render the Secondary Mid linking dropdown', () => {
      render(<SingleViewLocationSecondaryMids />)
      fireEvent.click(screen.getByRole('button', {name: 'Link New Secondary MID'}))

      expect(screen.getByTestId('Dropdown')).toBeInTheDocument()
    })


    describe('Test Secondary Mid save button', () => {
      it('should render the Secondary Mid save button', () => {
        render(<SingleViewLocationSecondaryMids />)
        fireEvent.click(screen.getByRole('button', {name: 'Link New Secondary MID'}))

        expect(screen.queryByLabelText('Save Secondary Mid')).toBeInTheDocument()
      })
    })

    describe('Test Secondary Mid link cancel button', () => {
      it('should render the Secondary Mid link cancel button', () => {
        render(<SingleViewLocationSecondaryMids />)
        fireEvent.click(screen.getByRole('button', {name: 'Link New Secondary MID'}))

        expect(screen.queryByLabelText('Cancel New Secondary Mid Link')).toBeInTheDocument()
      })

      it('should not render the secondary mid linking elements when cancel button is clicked', () => {
        render(<SingleViewLocationSecondaryMids />)
        fireEvent.click(screen.getByRole('button', {name: 'Link New Secondary MID'}))
        fireEvent.click(screen.getByLabelText('Cancel New Secondary Mid Link'))

        expect(screen.queryByLabelText('Cancel New Secondary Mid Link')).not.toBeInTheDocument()
      })
    })
  })
})