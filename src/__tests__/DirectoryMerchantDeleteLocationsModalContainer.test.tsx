import React from 'react'
import {render, screen} from '@testing-library/react'
import {DirectoryMerchantLocationsDeleteModalContainer} from 'components'
import {Provider} from 'react-redux'
import configureStore from 'redux-mock-store'

jest.mock('components/DirectoryMerchantEntityDeleteModal', () => () => <div data-testid='entity-modal'></div>)

const useRouter = jest.spyOn(require('next/router'), 'useRouter')
useRouter.mockImplementation(() => ({
  query: {
    planId: 'mock_plan_id',
    merchantId: 'mock_merchant_id',
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
    <DirectoryMerchantLocationsDeleteModalContainer/>
  </Provider>
)

describe('DirectoryMerchantLocationsDeleteModalContainer', () => {
  it('should render the DirectoryMerchantEntityDeleteModal component', () => {
    render(getDirectoryMerchantLocationsDeleteModalComponent())
    expect(screen.getByTestId('entity-modal')).toBeInTheDocument()
  })
})
