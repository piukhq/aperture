import React from 'react'
import * as Redux from 'react-redux'
import {render, screen} from '@testing-library/react'
import SingleViewIdentifier from 'components/Modals/components/DirectorySingleViewModal/components/SingleViewIdentifier'
import {Provider} from 'react-redux'
import configureStore from 'redux-mock-store'
import {setSelectedDirectoryMerchantEntity} from 'features/directoryMerchantSlice'

const mockIdentifierValue = 'mock_identifier_value'
const mockGetMerchantIdentifierResponse = {
  identifier_metadata: {
    value: mockIdentifierValue,
  },
}

jest.mock('hooks/useMidManagementIdentifiers', () => ({
  useMidManagementIdentifiers: jest.fn().mockImplementation(() => ({
    getMerchantIdentifierResponse: mockGetMerchantIdentifierResponse,
  })),
}))

jest.mock('components/Modals/components/DirectorySingleViewModal/components/SingleViewIdentifier/components/SingleViewIdentifierDetails',
  () => () => <div data-testid='SingleViewIdentifierDetails' />)

jest.mock('features/directoryMerchantSlice', () => ({
  setSelectedDirectoryMerchantEntity: jest.fn(),
  getSelectedDirectoryMerchantEntity: jest.fn().mockReturnValue(null),
}))

const mockSetHeaderFnProp = jest.fn()

const mockProps = {
  resetError: jest.fn(),
  setError: jest.fn(),
  setHeaderFn: mockSetHeaderFnProp,
}

const mockMerchantDetailsState = {
  directoryMerchant: {
    selectedEntity: {},
  },
}

const useRouter = jest.spyOn(require('next/router'), 'useRouter')
const useDispatchMock = jest.spyOn(Redux, 'useDispatch')

const mockStoreFn = configureStore([])
const store = mockStoreFn({...mockMerchantDetailsState})

const getSingleViewIdentifierComponent = (passedStore = undefined) => (
  <Provider store={passedStore || store}>
    <SingleViewIdentifier {...mockProps} />
  </Provider>
)

describe('SingleViewIdentifier', () => {
  beforeEach(() => {
    jest.clearAllMocks()

    useRouter.mockImplementation(() => ({
      query: {
        planId: 'mock_plan_id',
        merchantId: 'mock_merchant_id',
        ref: 'mock_mid_ref',
      },
    }))

    const dummyDispatch = jest.fn()
    useDispatchMock.mockReturnValue(dummyDispatch)

    React.useState = jest.fn().mockReturnValueOnce(['Details', jest.fn()]) // tabSelected
  })

  it('should render the Navigation tabs', () => {
    render(getSingleViewIdentifierComponent())
    expect(screen.getByText('Details')).toBeInTheDocument()
    expect(screen.getByText('Comments')).toBeInTheDocument()
  })

  it('should call prop function to set header', () => {
    render(getSingleViewIdentifierComponent())
    expect(mockSetHeaderFnProp).toBeCalledWith(`Identifier - ${mockIdentifierValue}`)
  })

  it('should render SingleViewIdentifierDetails component', () => {
    render(getSingleViewIdentifierComponent())
    expect(screen.getByTestId('SingleViewIdentifierDetails')).toBeInTheDocument()
  })

  it('should call function to set selected entity if selected entity is not present', () => {
    render(getSingleViewIdentifierComponent())
    expect(setSelectedDirectoryMerchantEntity).toBeCalledWith(mockGetMerchantIdentifierResponse)
  })
})
