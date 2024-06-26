import React from 'react'
import {render, screen} from '@testing-library/react'
import SingleViewMid from 'components/Modals/components/DirectorySingleViewModal/components/SingleViewMid'
import {Provider} from 'react-redux'
import configureStore from 'redux-mock-store'
import {setSelectedDirectoryMerchantEntity} from 'features/directoryMerchantSlice'
import {DirectoryMid} from 'types'

const mockMidValue = 'mock_mid_value'
let mockGetMerchantMidResponse = {
  mid: {
    mid_metadata: {
      mid: mockMidValue,
    },
  },
} as unknown as DirectoryMid

jest.mock('app/hooks', () => ({
  useAppDispatch: () => jest.fn(),
}))

jest.mock('hooks/useDirectoryMids', () => ({
  useDirectoryMids: jest.fn().mockImplementation(() => ({
    getMerchantMidResponse: mockGetMerchantMidResponse,
  })),
}))

jest.mock('components/Modals/components/DirectorySingleViewModal/components/SingleViewMid/components/SingleViewMidDetails',
  () => () => <div data-testid='SingleViewMidDetails' />)

jest.mock('components/Modals/components/DirectorySingleViewModal/components/SingleViewComments',
  () => () => <div data-testid='SingleViewComments' />)

jest.mock('features/directoryMerchantSlice', () => ({
  setSelectedDirectoryMerchantEntity: jest.fn(),
  getSelectedDirectoryMerchantEntity: jest.fn().mockReturnValue(null),
}))

const mockSetHeaderFnProp = jest.fn()

const mockProps = {
  selectedEntity: null as unknown as DirectoryMid,
  resetError: jest.fn(),
  setError: jest.fn(),
  setIsEntityFound: jest.fn(),
  setHeaderFn: mockSetHeaderFnProp,
}

const mockMerchantDetailsState = {
  directoryMerchant: {
    selectedEntity: {},
  },
}

const useRouter = jest.spyOn(require('next/router'), 'useRouter')
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

    React.useState = jest.fn().mockReturnValueOnce(['Details', jest.fn()]) // tabSelected
  })

  it('should render the Navigation tabs', () => {
    render(getSingleViewMidComponent())
    expect(screen.getByText('Details')).toBeInTheDocument()
    expect(screen.getByText('Comments')).toBeInTheDocument()
  })

  it('should call prop function to set header', () => {
    render(getSingleViewMidComponent())
    expect(mockSetHeaderFnProp).toBeCalledWith(`MID - ${mockMidValue}`)
  })

  it('should render SingleViewMidDetails component', () => {
    render(getSingleViewMidComponent())
    expect(screen.getByTestId('SingleViewMidDetails')).toBeInTheDocument()
  })

  it('should render the SingleViewComments component', () => {
    React.useState = jest.fn().mockReturnValueOnce(['Comments', jest.fn()])

    render(getSingleViewMidComponent())
    expect(screen.getByTestId('SingleViewComments')).toBeInTheDocument()
  })

  it('should call function to set selected entity if selected entity is not present', () => {
    render(getSingleViewMidComponent())
    expect(setSelectedDirectoryMerchantEntity).toBeCalledWith(mockGetMerchantMidResponse)
  })

  it('should display error message if selected entity is not found', () => {
    mockGetMerchantMidResponse = null as unknown as DirectoryMid
    render(getSingleViewMidComponent())
    expect(screen.getByText('MID could not be found. Check that it has not been deleted or refresh your browser')).toBeInTheDocument()
  })
})
