import React from 'react'
import {render, screen} from '@testing-library/react'
import {DirectoryMerchantIdentifiersDeleteModal} from 'components'
import {Provider} from 'react-redux'
import configureStore from 'redux-mock-store'

jest.mock('components/Modal', () => ({
  __esModule: true,
  default ({modalHeader, children}: Record<string, unknown>) {
    return (
      <div>
        <h1>{modalHeader}</h1>
        {children}
      </div>
    )
  },
}))

jest.mock('components/DirectoryMerchantEntityDeleteModalContent', () => () => <div data-testid='content-component'></div>)

const useRouter = jest.spyOn(require('next/router'), 'useRouter')
useRouter.mockImplementation(() => ({
  query: {
    planId: 'mock_plan_id',
    merchantId: 'mock_merchant_id',
    tab: 'identifiers', // This must match once of the enum values in DirectorySingleViewEntities
  },
}))

const mockDeleteMerchantSecondaryMid = jest.fn()
const mockDeleteMerchantSecondaryMidIsLoading = false

jest.mock('hooks/useMidManagementIdentifiers', () => ({
  useMidManagementIdentifiers: jest.fn().mockImplementation(() => ({
    deleteMerchantSecondaryMid: mockDeleteMerchantSecondaryMid,
    deleteMerchantSecondaryMidIsLoading: mockDeleteMerchantSecondaryMidIsLoading,
  })),
}))

const mockEntityValue1 = 'mock_entity_value_1'
const mockEntityValue2 = 'mock_entity_value_2'

const mockStoreFn = configureStore([])
const store = mockStoreFn({
  directoryMerchant: {
    selectedEntityCheckedSelection: [
      {entityRef: mockEntityValue1, entityValue: mockEntityValue1},
      {entityRef: mockEntityValue2, entityValue: mockEntityValue2},
    ],
  },
})

const getDirectoryMerchantIdentifiersDeleteModalComponent = (passedStore = undefined) => (
  <Provider store={passedStore || store}>
    <DirectoryMerchantIdentifiersDeleteModal/>
  </Provider>
)

describe('DirectoryMerchantIdentifiersDeleteModal', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should render the correct modal header for multiple Identifiers', () => {
    render(getDirectoryMerchantIdentifiersDeleteModalComponent())
    expect(screen.getByRole('heading', {name: 'Delete Identifiers'})).toBeInTheDocument()
  })

  it('should render the correct modal header for a singular Identifier', () => {
    render(getDirectoryMerchantIdentifiersDeleteModalComponent(
      mockStoreFn({
        directoryMerchant: {selectedEntityCheckedSelection: [{entityRef: mockEntityValue1, entityValue: mockEntityValue1}]},
      })
    ))
    expect(screen.getByRole('heading', {name: 'Delete Identifier'})).toBeInTheDocument()
  })

  it('should render the DirectoryMerchantEntityDeleteModalContent component', () => {
    render(getDirectoryMerchantIdentifiersDeleteModalComponent())
    expect(screen.getByTestId('content-component')).toBeInTheDocument()
  })
})
