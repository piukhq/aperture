import React from 'react'
import {render, screen} from '@testing-library/react'
import {DirectoryMerchantSecondaryMidsDeleteModalContainer} from 'components/Modals'
import {Provider} from 'react-redux'
import configureStore from 'redux-mock-store'

jest.mock('components/DirectoryMerchantEntityDeleteModal', () => () => <div data-testid='entity-modal' />)

const useRouter = jest.spyOn(require('next/router'), 'useRouter')
useRouter.mockImplementation(() => ({
  query: {
    planId: 'mock_plan_id',
    merchantId: 'mock_merchant_id',
    tab: 'secondary-mids', // This must match once of the enum values in DirectorySingleViewEntities
  },
}))

const mockDeleteMerchantSecondaryMid = jest.fn()
const mockDeleteMerchantSecondaryMidIsLoading = false

jest.mock('hooks/useMidManagementSecondaryMids', () => ({
  useMidManagementSecondaryMids: jest.fn().mockImplementation(() => ({
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

const getDirectoryMerchantSecondaryMidsDeleteModalComponent = (passedStore = undefined) => (
  <Provider store={passedStore || store}>
    <DirectoryMerchantSecondaryMidsDeleteModalContainer/>
  </Provider>
)

describe('DirectoryMerchantSecondaryMidsDeleteModalContainer', () => {
  it('should render the DirectoryMerchantEntityDeleteModal component', () => {
    render(getDirectoryMerchantSecondaryMidsDeleteModalComponent())
    expect(screen.getByTestId('entity-modal')).toBeInTheDocument()
  })
})
