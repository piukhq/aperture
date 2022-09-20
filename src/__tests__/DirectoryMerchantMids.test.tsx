import React from 'react'
import {render, screen} from '@testing-library/react'
import {Provider} from 'react-redux'
import configureStore from 'redux-mock-store'
import {DirectoryMerchantMids} from 'components'

const mockGetMerchantMidsResponse = [
  {
    mid_ref: 'MID13fa85f64-5717-4562-b3fc-2c963f66afa6',
    mid_metadata: {
      payment_scheme_code: 3,
      mid: '1114259847329',
      visa_bin: '',
      payment_enrolment_status: 'Enrolled',
    },
    date_added: 'Mar 21, 2020, 3:30pm',
    txm_status: 'txm_status 1',
  },
  {
    mid_ref: 'MID23fa85f64-5717-4562-b3fc-2c963f66afa6',
    mid_metadata: {
      payment_scheme_code: 3,
      mid: '2224259847329',
      visa_bin: '',
      payment_enrolment_status: 'Enrolled',
    },
    date_added: 'Feb 21, 2020, 2:11pm',
    txm_status: 'txm_status 2',
  },
]

const mockDirectoryMerchantDetailsTableComponent = jest.fn()
jest.mock('components/DirectoryMerchantDetailsTable', () => (props) => {
  mockDirectoryMerchantDetailsTableComponent(props)
  return <div data-testid='DirectoryMerchantDetailsTable' />
})

jest.mock('hooks/useMidManagementMids', () => ({
  useMidManagementMids: jest.fn().mockImplementation(() => ({
    getMerchantMidsResponse: mockGetMerchantMidsResponse,
  })),
}))


const mockStoreFn = configureStore([])
const store = mockStoreFn({
  directoryMerchant: {
    selectedTableCheckedRefs: ['mock_id'],
  },
})

const getDirectoryMerchantMidsComponent = (passedStore = undefined) => (
  <Provider store={passedStore || store}>
    <DirectoryMerchantMids />
  </Provider>
)

describe('DirectoryMerchantMids', () => {
  const useRouter = jest.spyOn(require('next/router'), 'useRouter')

  beforeEach(() => {
    useRouter.mockImplementation(() => ({
      query: {
        planId: 'mock_plan_id',
        merchantId: 'mock_merchant_id',
        tab: 'mids',
      },
    }))
  })

  it('should render the add Mid buttons', () => {
    render(getDirectoryMerchantMidsComponent())
    const visaButton = screen.getByRole('button', {
      name: 'Add Visa MID',
    })
    const mastercardButton = screen.getByRole('button', {
      name: 'Add Mastercard MID',
    })
    const amexButton = screen.getByRole('button', {
      name: 'Add Amex MID',
    })

    expect(visaButton).toBeInTheDocument()
    expect(mastercardButton).toBeInTheDocument()
    expect(amexButton).toBeInTheDocument()
  })

  it('should render the correct checked item buttons', () => {
    render(getDirectoryMerchantMidsComponent())

    expect(screen.getByRole('button', {name: 'Onboard to Harmonia'})).toBeInTheDocument()
    expect(screen.getByRole('button', {name: 'Offboard from Harmonia'})).toBeInTheDocument()
    expect(screen.getByRole('button', {name: 'Comments'})).toBeInTheDocument()
    expect(screen.getByRole('button', {name: 'Delete'})).toBeInTheDocument()
  })

  it('should have the correct table header props to the DirectoryMerchantDetailsTableComponent', () => {
    const tableHeaders = [
      {
        isPaymentIcon: true,
      },
      {
        displayValue: 'VALUE',
      },
      {
        displayValue: 'BIN',
      },
      {
        displayValue: 'DATE ADDED',
      },
      {
        displayValue: 'SCHEME STATUS',
      },
      {
        displayValue: 'HARMONIA STATUS',
      },
    ]

    render(getDirectoryMerchantMidsComponent())

    // Test that component is called with correct props
    expect(mockDirectoryMerchantDetailsTableComponent).toHaveBeenCalledWith(expect.objectContaining({
      tableHeaders,
    }))
  })
})
