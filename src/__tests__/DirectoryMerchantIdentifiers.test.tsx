import React from 'react'
import {render, screen} from '@testing-library/react'
import {Provider} from 'react-redux'
import configureStore from 'redux-mock-store'
import {DirectoryMerchantIdentifiers} from 'components'

const mockGetMerchantIdentifiersResponse = [
  {
    identifier_ref: 'identifier13fa85f64-5717-4562-b3fc-2c963f66afa6',
    identifier_metadata: {
      value: '170976',
      payment_scheme_code: 1,
      payment_scheme_merchant_name: 'HARVEY NICHOLS',
    },
    date_added: 'Mar 21, 2019, 3:30pm',
  },
  {
    identifier_ref: 'identifier23fa85f64-5717-4562-b3fc-2c963f66afa6',
    identifier_metadata: {
      value: '178997',
      payment_scheme_code: 1,
      payment_scheme_merchant_name: 'HARVEY NICHOLS - FENTY',
    },
    date_added: 'Mar 21, 2019, 3:30pm',
  },
  {
    identifier_ref: 'identifier33fa85f64-5717-4562-b3fc-2c963f66afa6',
    identifier_metadata: {
      value: '16689',
      payment_scheme_code: 2,
      payment_scheme_merchant_name: 'HARVEY NICHOLS',
    },
    date_added: 'Mar 21, 2019, 3:30pm',
  },
]

jest.mock('hooks/useMidManagementIdentifiers', () => ({
  useMidManagementIdentifiers: jest.fn().mockImplementation(() => ({
    getMerchantIdentifiersResponse: mockGetMerchantIdentifiersResponse,
  })),
}))

const mockStoreFn = configureStore([])
const store = mockStoreFn({modal: {
  modalRequested: 'NO_MODAL',
}})

const getDirectoryMerchantIdentifiersComponent = (passedStore = undefined) => (
  <Provider store={passedStore || store}>
    <DirectoryMerchantIdentifiers />
  </Provider>
)

describe('DirectoryMerchantIdentifiers', () => {
  const useRouter = jest.spyOn(require('next/router'), 'useRouter')

  beforeEach(() => {
    useRouter.mockImplementation(() => ({
      query: {
        planId: 'mock_plan_id',
        merchantId: 'mock_merchant_id',
        tab: 'identifiers',
      },
    }))
  })

  it('should render the add Identifier buttons', () => {
    render(getDirectoryMerchantIdentifiersComponent())
    const visaButton = screen.getByRole('button', {
      name: 'Add Visa Identifier',
    })
    const mastercardButton = screen.getByRole('button', {
      name: 'Add Mastercard Identifier',
    })

    expect(visaButton).toBeInTheDocument()
    expect(mastercardButton).toBeInTheDocument()
  })

  it('should have the correct number of table headers', () => {
    render(getDirectoryMerchantIdentifiersComponent())
    const headings = screen.getAllByTestId('table-header')

    expect(headings).toHaveLength(6)
  })

  it('should have the correct table header labels', () => {
    render(getDirectoryMerchantIdentifiersComponent())
    const headings = screen.getAllByTestId('table-header')

    expect(headings[2]).toHaveTextContent('VALUE')
    expect(headings[3]).toHaveTextContent('SCHEME NAME')
    expect(headings[4]).toHaveTextContent('DATE ADDED')
    expect(headings[5]).toHaveTextContent('HARMONIA STATUS')
  })
})
