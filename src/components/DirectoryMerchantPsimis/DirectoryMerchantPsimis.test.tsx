import React from 'react'
import {render, screen} from '@testing-library/react'
import {Provider} from 'react-redux'
import configureStore from 'redux-mock-store'
import {DirectoryMerchantPsimis} from 'components'
import {PaymentSchemeSlug} from 'utils/enums'

const mockGetMerchantPsimisResponse = [
  {
    psimi_ref: 'psimi13fa85f64-5717-4562-b3fc-2c963f66afa6',
    psimi_metadata: {
      value: '170976',
      payment_scheme_slug: PaymentSchemeSlug.VISA,
      payment_scheme_merchant_name: 'HARVEY NICHOLS',
    },
    date_added: 'Mar 21, 2019, 3:30pm',
  },
  {
    psimi_ref: 'psimi23fa85f64-5717-4562-b3fc-2c963f66afa6',
    psimi_metadata: {
      value: '178997',
      payment_scheme_slug: PaymentSchemeSlug.VISA,
      payment_scheme_merchant_name: 'HARVEY NICHOLS - FENTY',
    },
    date_added: 'Mar 21, 2019, 3:30pm',
  },
  {
    psimi_ref: 'psimi33fa85f64-5717-4562-b3fc-2c963f66afa6',
    psimi_metadata: {
      value: '16689',
      payment_scheme_slug: PaymentSchemeSlug.MASTERCARD,
      payment_scheme_merchant_name: 'HARVEY NICHOLS',
    },
    date_added: 'Mar 21, 2019, 3:30pm',
  },
]

jest.mock('components/DirectoryMerchantDetailsTable', () => () => <div data-testid='merchant-details-table' />)
jest.mock('components/DirectoryMerchantPaginationButton', () => () => <div data-testid='pagination-button' />)
jest.mock('components/BulkActionsDropdown', () => () => <div data-testid='bulk-actions-dropdown' />)
jest.mock('utils/windowDimensions', () => {
  return {
    useIsMobileViewportDimensions: jest.fn().mockImplementation(() => false),
  }
})

jest.mock('hooks/useDirectoryPsimis', () => ({
  useDirectoryPsimis: jest.fn().mockImplementation(() => ({
    getMerchantPsimisResponse: mockGetMerchantPsimisResponse,
  })),
}))

const mockStoreFn = configureStore([])
const store = mockStoreFn({
  directoryMerchant: {
    selectedTableCheckedRefs: ['mock_id'],
  },
})

const getDirectoryMerchantPsimisComponent = (passedStore = undefined) => (
  <Provider store={passedStore || store}>
    <DirectoryMerchantPsimis />
  </Provider>
)

describe('DirectoryMerchantPsimis', () => {
  const useRouter = jest.spyOn(require('next/router'), 'useRouter')

  beforeEach(() => {
    jest.clearAllMocks()
    useRouter.mockImplementation(() => ({
      query: {
        planId: 'mock_plan_id',
        merchantId: 'mock_merchant_id',
        tab: 'psimis',
      },
    }))
  })

  it('should render the correct checked item buttons', () => {
    React.useState = jest.fn().mockReturnValue([Array(1), jest.fn]) // checkedRefArray
    render(getDirectoryMerchantPsimisComponent())

    expect(screen.getByRole('button', {name: 'Onboard to Harmonia'})).toBeInTheDocument()
    expect(screen.getByRole('button', {name: 'Offboard from Harmonia'})).toBeInTheDocument()
    expect(screen.getByRole('button', {name: 'Comments'})).toBeInTheDocument()
    expect(screen.getByRole('button', {name: 'Delete'})).toBeInTheDocument()
    expect(screen.queryByTestId('bulk-actions-dropdown')).not.toBeInTheDocument()
  })

  it('should render the add PSIMI buttons', () => {
    render(getDirectoryMerchantPsimisComponent())
    const visaButton = screen.getByRole('button', {
      name: 'Add Visa PSIMI',
    })
    const mastercardButton = screen.getByRole('button', {
      name: 'Add Mastercard PSIMI',
    })

    expect(visaButton).toBeInTheDocument()
    expect(mastercardButton).toBeInTheDocument()
  })

  it('should render the DirectoryMerchantDetailsTable component', () => {
    render(getDirectoryMerchantPsimisComponent())
    expect(screen.getByTestId('merchant-details-table')).toBeInTheDocument()
  })
})
