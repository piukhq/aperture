import React from 'react'
import {render, screen} from '@testing-library/react'
import {Provider} from 'react-redux'
import configureStore from 'redux-mock-store'
import {DirectoryMerchantSecondaryMids} from 'components'

const mockGetMerchantSecondaryMidsResponse = [
  {
    secondary_mid_ref: 'SMID13fa85f64-5717-4562-b3fc-2c963f66afa6',
    secondary_mid_metadata: {
      payment_scheme_code: 1,
      secondary_mid: '446720350',
      payment_enrolment_status: 'payroll_enrollment_status',
      payment_scheme_store_name: 'Mock Merchant 1',
    },
    date_added: 'Mar 21, 2020, 3:30pm',
    txm_status: 'txm_status 1',
  },
  {
    secondary_mid_ref: 'SMID23fa85f64-5717-4562-b3fc-2c963f66afa6',
    secondary_mid_metadata: {
      payment_scheme_code: 2,
      secondary_mid: '222425984',
      payment_enrolment_status: 'payroll_enrollment_status',
      payment_scheme_store_name: 'Mock Merchant 2',
    },
    date_added: 'Feb 21, 2020, 2:11pm',
    txm_status: 'txm_status 2',
  },
]

jest.mock('hooks/useMidManagementSecondaryMids', () => ({
  useMidManagementSecondaryMids: jest.fn().mockImplementation(() => ({
    getMerchantSecondaryMidsResponse: mockGetMerchantSecondaryMidsResponse,
  })),
}))

const mockStoreFn = configureStore([])
const store = mockStoreFn({
  directoryMerchant: {
    selectedTableCheckedRows: [],
  },
})

const getDirectoryMerchantSecondaryMidsComponent = (passedStore = undefined) => (
  <Provider store={passedStore || store}>
    <DirectoryMerchantSecondaryMids />
  </Provider>
)

describe('DirectoryMerchantSecondaryMids', () => {
  const useRouter = jest.spyOn(require('next/router'), 'useRouter')

  beforeEach(() => {
    useRouter.mockImplementation(() => ({
      query: {
        planId: 'mock_plan_id',
        merchantId: 'mock_merchant_id',
        tab: 'secondary_mids',
      },
    }))
  })

  it('should render the correct checked item buttons', () => {
    React.useState = jest.fn().mockReturnValue([Array(1), jest.fn]) // checkedRefArray
    render(getDirectoryMerchantSecondaryMidsComponent())

    expect(screen.getByRole('button', {name: 'Comments'})).toBeInTheDocument()
    expect(screen.getByRole('button', {name: 'Delete'})).toBeInTheDocument()
  })

  it('should render the add Secondary Mid buttons', () => {
    render(getDirectoryMerchantSecondaryMidsComponent())
    const visaButton = screen.getByRole('button', {
      name: 'Add Visa Secondary MID',
    })
    const mastercardButton = screen.getByRole('button', {
      name: 'Add Mastercard Secondary MID',
    })

    expect(visaButton).toBeInTheDocument()
    expect(mastercardButton).toBeInTheDocument()
  })

  it('should have the correct number of table headers', () => {
    render(getDirectoryMerchantSecondaryMidsComponent())
    const headings = screen.getAllByTestId('table-header')

    expect(headings).toHaveLength(8)
  })

  it('should have the correct table header labels', () => {
    render(getDirectoryMerchantSecondaryMidsComponent())
    const headings = screen.getAllByTestId('table-header')

    expect(headings[2]).toHaveTextContent('VALUE')
    expect(headings[3]).toHaveTextContent('STORE NAME')
    expect(headings[4]).toHaveTextContent('DATE ADDED')
    expect(headings[5]).toHaveTextContent('SCHEME STATUS')
    expect(headings[6]).toHaveTextContent('HARMONIA STATUS')
  })
})
