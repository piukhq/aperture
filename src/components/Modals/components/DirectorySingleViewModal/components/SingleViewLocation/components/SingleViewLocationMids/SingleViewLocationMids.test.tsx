import React from 'react'
import {fireEvent, render, screen} from '@testing-library/react'
import {PaymentSchemeSlug} from 'utils/enums'
import SingleViewLocationMids from 'components/Modals/components/DirectorySingleViewModal/components/SingleViewLocation/components/SingleViewLocationMids'

jest.mock('components/Modals/components/DirectorySingleViewModal/components/LinkedListItem', () => () => <div data-testid='LinkedListItem' />)
jest.mock('components/Modals/components/DirectorySingleViewModal/components/SingleViewCombobox', () => () => <div data-testid='SingleViewCombobox' />)

let mockGetMerchantLocationLinkedMidsResponse = [
  {
    link_ref: 'mock_link_ref',
    payment_scheme_slug: PaymentSchemeSlug.VISA,
    mid_value: 'mock_mid_value',
    mid_ref: 'mock_mid_ref_1',
  },
  {
    link_ref: 'mock_link_ref',
    payment_scheme_slug: PaymentSchemeSlug.VISA,
    mid_value: 'mock_mid_value',
    mid_ref: 'mock_mid_ref_2',
  },
]

let mockGetMerchantLocationAvailableMidsResponse = [
  {
    mid: {
      link_ref: 'mock_link_ref',
      payment_scheme_slug: PaymentSchemeSlug.VISA,
      mid_value: 'mock_mid_value',
      mid_ref: 'mock_mid_ref',
    },
    locationLink: {
      link_ref: 'mock_link_ref',
      location_ref: 'mock_location_ref',
      location_title: 'mock_location_title',
    },
  },
]

const mockPostMerchantLocationLinkedMid = jest.fn()
jest.mock('hooks/useDirectoryLocationMids', () => ({
  useDirectoryLocationMids: jest.fn().mockImplementation(() => ({
    getMerchantLocationLinkedMidsResponse: mockGetMerchantLocationLinkedMidsResponse,
    getMerchantLocationAvailableMidsResponse: mockGetMerchantLocationAvailableMidsResponse,
    getMerchantLocationLinkedMidsIsLoading: false,
    postMerchantLocationLinkedMid: mockPostMerchantLocationLinkedMid,
    postMerchantLocationLinkedMidIsLoading: false,
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
    mockGetMerchantLocationAvailableMidsResponse = []
    render(<SingleViewLocationMids />)
    expect(screen.getByRole('button', {name: 'Link New MID'})).toBeInTheDocument()
  })

  it('should render the correct available mid notification when no mids are available', () => {
    mockGetMerchantLocationAvailableMidsResponse = []
    render(<SingleViewLocationMids />)
    fireEvent.click(screen.getByRole('button', {name: 'Link New MID'}))

    expect(screen.getByText('No MIDs available to link for this Location.')).toBeInTheDocument()
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
    beforeEach(() => {
      mockGetMerchantLocationAvailableMidsResponse = [
        {
          mid: {
            link_ref: 'mock_link_ref',
            payment_scheme_slug: PaymentSchemeSlug.VISA,
            mid_value: 'mock_mid_value',
            mid_ref: 'mock_mid_ref',
          },
          locationLink: {
            link_ref: 'mock_link_ref',
            location_ref: 'mock_location_ref',
            location_title: 'mock_location_title',
          },
        },
        {
          mid: {
            link_ref: 'mock_link_ref',
            payment_scheme_slug: PaymentSchemeSlug.VISA,
            mid_value: 'mock_mid_value',
            mid_ref: 'mock_mid_ref',
          },
          locationLink: {
            link_ref: 'mock_link_ref',
            location_ref: 'mock_location_ref',
            location_title: 'mock_location_title',
          },
        },
      ]

      const setStateMock = jest.fn()
      React.useState = jest.fn()
        .mockReturnValueOnce([true, setStateMock]) // shouldPrepareDropdownMenu
        .mockReturnValueOnce([true, setStateMock]) // shouldRenderDropdownMenu
        .mockReturnValueOnce([mockGetMerchantLocationAvailableMidsResponse[1], setStateMock]) // selectedAvailableMid
        .mockReturnValueOnce([null, setStateMock]) // selectedUnlinkMidIndex
        .mockReturnValueOnce(['', setStateMock]) // availableMidLocationWarning
    })

    it('should not render the New Mid link button', () => {
      render(<SingleViewLocationMids />)
      expect(screen.queryByRole('button', {name: 'Link New MID'})).not.toBeInTheDocument()
    })

    it('should render the Mid linking combobox', () => {
      render(<SingleViewLocationMids />)
      expect(screen.getByTestId('SingleViewCombobox')).toBeInTheDocument()
    })

    it('should render the Mid save button', () => {
      render(<SingleViewLocationMids />)
      expect(screen.queryByLabelText('Save Mid')).toBeInTheDocument()
    })

    it('should render the Mid link cancel button', () => {
      render(<SingleViewLocationMids />)
      expect(screen.queryByLabelText('Cancel New Mid Link')).toBeInTheDocument()
    })

    it('should not render the available mid warning text', () => {
      render(<SingleViewLocationMids />)
      expect(screen.queryByText('mock_warning')).not.toBeInTheDocument()
    })

    describe('Test available mid already linked warning message', () => {
      beforeEach(() => {
        const setStateMock = jest.fn()
        React.useState = jest.fn()
          .mockReturnValueOnce([true, setStateMock]) // shouldPrepareDropdownMenu
          .mockReturnValueOnce([true, setStateMock]) // shouldRenderDropdownMenu
          .mockReturnValueOnce([mockGetMerchantLocationAvailableMidsResponse[1], setStateMock]) // selectedAvailableMid
          .mockReturnValueOnce([null, setStateMock]) // selectedUnlinkMidIndex
          .mockReturnValueOnce(['mock_warning', setStateMock]) // availableMidLocationWarning
      })

      it('should render the available mid warning text', () => {
        render(<SingleViewLocationMids />)
        expect(screen.getByText('mock_warning')).toBeInTheDocument()
      })
    })
  })
})
