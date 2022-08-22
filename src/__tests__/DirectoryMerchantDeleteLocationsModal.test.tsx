import React from 'react'
import {render, screen} from '@testing-library/react'
import {DirectoryMerchantLocationsDeleteModal} from 'components'
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
    tab: 'locations', // This must match once of the enum values in DirectorySingleViewEntities
  },
}))

const mockDeleteMerchantLocation = jest.fn()
const mockDeleteMerchantLocationIsLoading = false

jest.mock('hooks/useMidManagementLocations', () => ({
  useMidManagementLocations: jest.fn().mockImplementation(() => ({
    deleteMerchantLocation: mockDeleteMerchantLocation,
    deleteMerchantLocationIsLoading: mockDeleteMerchantLocationIsLoading,
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

const getDirectoryMerchantLocationsDeleteModalComponent = (passedStore = undefined) => (
  <Provider store={passedStore || store}>
    <DirectoryMerchantLocationsDeleteModal/>
  </Provider>
)

describe('DirectoryMerchantLocationsDeleteModal', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should render the correct modal header for multiple Locations', () => {
    render(getDirectoryMerchantLocationsDeleteModalComponent())
    expect(screen.getByRole('heading', {name: 'Delete Locations'})).toBeInTheDocument()
  })

  it('should render the correct modal header for a singular Location', () => {
    render(getDirectoryMerchantLocationsDeleteModalComponent(
      mockStoreFn({
        directoryMerchant: {selectedEntityCheckedSelection: [{entityRef: mockEntityValue1, entityValue: mockEntityValue1}]},
      })
    ))
    expect(screen.getByRole('heading', {name: 'Delete Location'})).toBeInTheDocument()
  })

  it('should render the DirectoryMerchantEntityDeleteModalContent component', () => {
    render(getDirectoryMerchantLocationsDeleteModalComponent())
    expect(screen.getByTestId('content-component')).toBeInTheDocument()
  })
})
