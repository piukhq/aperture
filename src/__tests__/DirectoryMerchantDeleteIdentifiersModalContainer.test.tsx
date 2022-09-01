import React from 'react'
import {render, screen} from '@testing-library/react'
import {DirectoryMerchantIdentifiersDeleteModalContainer} from 'components/Modals'
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
    <DirectoryMerchantIdentifiersDeleteModalContainer/>
  </Provider>
)

describe('DirectoryMerchantIdentifiersDeleteModalContainer', () => {
  it('should render the DirectoryMerchantEntityDeleteModal component', () => {
    render(getDirectoryMerchantIdentifiersDeleteModalComponent())
    expect(screen.getByTestId('entity-modal')).toBeInTheDocument()
  })
})
