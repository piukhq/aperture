import React from 'react'
import * as Redux from 'react-redux'
import {render, screen} from '@testing-library/react'
import SingleViewMid from 'components/DirectorySingleViewModal/components/SingleViewMid'
import {Provider} from 'react-redux'
import configureStore from 'redux-mock-store'
import {setSelectedDirectoryMerchantEntity} from 'features/directoryMerchantSlice'

const mockMidValue = 'mock_mid_value'
const mockGetMerchantMidResponse = {
  mid: {
    mid_metadata: {
      mid: mockMidValue,
    },
  },
}

jest.mock('hooks/useMidManagementMids', () => ({
  useMidManagementMids: jest.fn().mockImplementation(() => ({
    getMerchantMidResponse: mockGetMerchantMidResponse,
  })),
}))

jest.mock('components/DirectorySingleViewModal/components/SingleViewMid/components/SingleViewMidDetails',
  () => () => <div data-testid='SingleViewMidDetails' />)

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

const getSingleViewMidComponent = (passedStore = undefined) => (
  <Provider store={passedStore || store}>
    <SingleViewMid {...mockProps} />
  </Provider>
)

describe('SingleViewMid', () => {
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
    render(getSingleViewMidComponent())
    expect(screen.getByText('Details')).toBeInTheDocument()
    expect(screen.getByText('Comments')).toBeInTheDocument()
  })

  it('should call prop function to set header', () => {
    render(getSingleViewMidComponent())
    expect(mockSetHeaderProp).toBeCalledWith(`MID - ${mockMidValue}`)
  })

  it('should render SingleViewMidDetails component', () => {
    render(getSingleViewMidComponent())
    expect(screen.getByTestId('SingleViewMidDetails')).toBeInTheDocument()
  })

  it('should call function to set selected entity if selected entity is not present', () => {
    render(getSingleViewMidComponent())
    expect(setSelectedDirectoryMerchantEntity).toBeCalledWith(mockGetMerchantMidResponse)
  })
})
