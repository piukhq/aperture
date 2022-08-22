import React from 'react'
import {render, screen} from '@testing-library/react'
import {DirectoryMerchantMidsDeleteModal} from 'components'
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
    tab: 'mids', // This must match once of the enum values in DirectorySingleViewEntities
  },
}))

const mockDeleteMerchantMid = jest.fn()
const mockDeleteMerchantMidIsLoading = false

jest.mock('hooks/useMidManagementMids', () => ({
  useMidManagementMids: jest.fn().mockImplementation(() => ({
    deleteMerchantMid: mockDeleteMerchantMid,
    deleteMerchantMidIsLoading: mockDeleteMerchantMidIsLoading,
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

const getDirectoryMerchantMidsDeleteModalComponent = (passedStore = undefined) => (
  <Provider store={passedStore || store}>
    <DirectoryMerchantMidsDeleteModal/>
  </Provider>
)

describe('DirectoryMerchantMidsDeleteModal', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    React.useState = jest
      .fn()
      .mockReturnValueOnce(['', jest.fn()]) // ErrorMessage
  })

  it('should render the correct modal header for multiple mids', () => {
    render(getDirectoryMerchantMidsDeleteModalComponent())
    expect(screen.getByRole('heading', {name: 'Delete MIDs'})).toBeInTheDocument()
  })

  it('should render the correct modal header for a singular mid', () => {
    render(getDirectoryMerchantMidsDeleteModalComponent(
      mockStoreFn({
        directoryMerchant: {selectedEntityCheckedSelection: [{entityRef: mockEntityValue1, entityValue: mockEntityValue1}]},
      })
    ))
    expect(screen.getByRole('heading', {name: 'Delete MID'})).toBeInTheDocument()
  })

  it('should render the DirectoryMerchantEntityDeleteModalContent component', () => {
    render(getDirectoryMerchantMidsDeleteModalComponent())
    expect(screen.getByTestId('content-component')).toBeInTheDocument()
  })
})
