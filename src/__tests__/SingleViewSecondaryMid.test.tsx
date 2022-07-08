import React from 'react'
import * as Redux from 'react-redux'
import {render, screen} from '@testing-library/react'
import SingleViewSecondaryMid from 'components/DirectorySingleViewModal/components/SingleViewSecondaryMid'
import {Provider} from 'react-redux'
import configureStore from 'redux-mock-store'
import {setSelectedDirectoryMerchantEntity} from 'features/directoryMerchantSlice'

const mockSecondaryMidValue = 'mock_secondary_mid_value'
const mockGetMerchantSecondaryMidResponse = {
  secondary_mid_metadata: {
    secondary_mid: mockSecondaryMidValue,
  },
}

jest.mock('hooks/useMidManagementSecondaryMids', () => ({
  useMidManagementSecondaryMids: jest.fn().mockImplementation(() => ({
    getMerchantSecondaryMidResponse: mockGetMerchantSecondaryMidResponse,
  })),
}))

jest.mock('components/DirectorySingleViewModal/components/SingleViewSecondaryMid/components/SingleViewSecondaryMidDetails',
  () => () => <div data-testid='SingleViewSecondaryMidDetails' />)

jest.mock('features/directoryMerchantSlice', () => ({
  setSelectedDirectoryMerchantEntity: jest.fn(),
  getSelectedDirectoryMerchantEntity: jest.fn().mockReturnValue(null),
}))

const mockSetHeaderProp = jest.fn()

const mockProps = {
  resetError: jest.fn(),
  setError: jest.fn(),
  setHeader: mockSetHeaderProp,
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

const getSingleViewSecondaryMidComponent = (passedStore = undefined) => (
  <Provider store={passedStore || store}>
    <SingleViewSecondaryMid {...mockProps} />
  </Provider>
)

describe('SingleViewSecondaryMid', () => {
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
    render(getSingleViewSecondaryMidComponent())
    expect(screen.getByText('Details')).toBeInTheDocument()
    expect(screen.getByText('Comments')).toBeInTheDocument()
  })

  it('should call prop function to set header', () => {
    render(getSingleViewSecondaryMidComponent())
    expect(mockSetHeaderProp).toBeCalledWith(`Secondary MID - ${mockSecondaryMidValue}`)
  })

  it('should render SingleViewSecondaryMidDetails component', () => {
    render(getSingleViewSecondaryMidComponent())
    expect(screen.getByTestId('SingleViewSecondaryMidDetails')).toBeInTheDocument()
  })

  it('should call function if selected entity is not present', () => {
    render(getSingleViewSecondaryMidComponent())
    expect(setSelectedDirectoryMerchantEntity).toBeCalledWith(mockGetMerchantSecondaryMidResponse)
  })
})
