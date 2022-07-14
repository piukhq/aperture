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

jest.mock('hooks/useMidManagementMids', () => ({
  useMidManagementMids: jest.fn().mockImplementation(() => ({
    getMerchantMidsResponse: mockGetMerchantMidsResponse,
  })),
}))
const mockStoreFn = configureStore([])
const store = mockStoreFn({modal: {
  modalRequested: 'NO_MODAL',
}})

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

  it('should have the correct number of table headers', () => {
    render(getDirectoryMerchantMidsComponent())
    const headings = screen.getAllByTestId('table-header')
    expect(headings).toHaveLength(7)
  })

  it('should have the correct table header labels', () => {
    render(getDirectoryMerchantMidsComponent())
    const headings = screen.getAllByTestId('table-header')

    expect(headings[2]).toHaveTextContent('VALUE')
    expect(headings[3]).toHaveTextContent('BIN')
    expect(headings[4]).toHaveTextContent('DATE ADDED')
    expect(headings[5]).toHaveTextContent('SCHEME STATUS')
    expect(headings[6]).toHaveTextContent('HARMONIA STATUS')
  })
})
