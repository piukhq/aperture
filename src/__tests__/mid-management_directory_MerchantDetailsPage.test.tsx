import React from 'react'
import {render, screen} from '@testing-library/react'
import {Provider} from 'react-redux'
import configureStore from 'redux-mock-store'
import MerchantDetailsPage from 'pages/mid-management/directory/[planId]/[merchantId]/index'

jest.mock('components/DirectoryDetailsHeader', () => () => <div data-testid='directory-details-header' />)
jest.mock('components/DirectoryMerchantMids', () => () => <div data-testid='directory-merchant-mids' />)

const mockStoreFn = configureStore([])
const store = mockStoreFn({
  directoryPlan: {
    plan_ref: 'mock_plan_ref',
    plan_metadata: {
      name: 'mock-name',
      slug: 'mock-slug',
      iconUrl: 'mock-icon-url',
    },
  },
  directoryMerchant: {
    merchant_ref: 'mock_merchant_ref',
    merchant_metadata: {
      name: 'mock-name',
      iconUrl: 'mock-icon-url',
    },
  },
})

const getMerchantDetailsPageComponent = (passedStore = undefined) => (
  <Provider store={passedStore || store}>
    <MerchantDetailsPage />
  </Provider>
)

// TODO: Add tests for different tab functionality when implemented properly
describe('MID Management MerchantDetailsPage', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    const useRouter = jest.spyOn(require('next/router'), 'useRouter')
    useRouter.mockImplementation(() => ({
      query: {
        planId: 'mock_plan_id',
        merchantId: 'mock_merchant_id',
      },
    }))
  })

  it('should render DirectoryDetailsHeader component', () => {
    render(getMerchantDetailsPageComponent())
    expect(screen.queryByTestId('directory-details-header')).toBeInTheDocument()
  })

  it('should render MIDs button', () => {
    render(getMerchantDetailsPageComponent())
    const midsButton = screen.getByRole('button', {
      name: 'MIDs',
    })

    expect(midsButton).toBeInTheDocument()
  })

  it('should render Secondary MIDSs button', () => {
    render(getMerchantDetailsPageComponent())
    const secondaryMidsButton = screen.getByRole('button', {
      name: 'Secondary MIDs',
    })

    expect(secondaryMidsButton).toBeInTheDocument()
  })

  it('should render Locations button', () => {
    render(getMerchantDetailsPageComponent())
    const locationsButton = screen.getByRole('button', {
      name: 'Locations',
    })

    expect(locationsButton).toBeInTheDocument()
  })

  it('should render Identifiers button', () => {
    render(getMerchantDetailsPageComponent())
    const identifiersButton = screen.getByRole('button', {
      name: 'Identifiers',
    })

    expect(identifiersButton).toBeInTheDocument()
  })
})
