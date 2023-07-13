import React from 'react'
import {render, screen} from '@testing-library/react'
import SingleViewPsimi from 'components/Modals/components/DirectorySingleViewModal/components/SingleViewPsimi'
import {Provider} from 'react-redux'
import configureStore from 'redux-mock-store'
import {setSelectedDirectoryMerchantEntity} from 'features/directoryMerchantSlice'
import {DirectoryPsimi} from 'types'

const mockPsimiValue = 'mock_psimi_value'
let mockGetMerchantPsimiResponse = {
  psimi_metadata: {
    value: mockPsimiValue,
  },
}

jest.mock('app/hooks', () => ({
  useAppDispatch: () => jest.fn(),
}))

jest.mock('hooks/useDirectoryPsimis', () => ({
  useDirectoryPsimis: jest.fn().mockImplementation(() => ({
    getMerchantPsimiResponse: mockGetMerchantPsimiResponse,
    getMerchantPsimiIsLoading: false,
  })),
}))

jest.mock('components/Modals/components/DirectorySingleViewModal/components/SingleViewPsimi/components/SingleViewPsimiDetails',
  () => () => <div data-testid='SingleViewPsimiDetails' />)

jest.mock('components/Modals/components/DirectorySingleViewModal/components/SingleViewComments',
  () => () => <div data-testid='SingleViewComments' />)

jest.mock('features/directoryMerchantSlice', () => ({
  setSelectedDirectoryMerchantEntity: jest.fn(),
  getSelectedDirectoryMerchantEntity: jest.fn().mockReturnValue(null),
}))

const mockSetHeaderFnProp = jest.fn()

const mockProps = {
  selectedEntity: null as unknown as DirectoryPsimi,
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

const getSingleViewPsimiComponent = (passedStore = undefined) => (
  <Provider store={passedStore || store}>
    <SingleViewPsimi {...mockProps} />
  </Provider>
)

describe('SingleViewPsimi', () => {
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
    render(getSingleViewPsimiComponent())
    expect(screen.getByText('Details')).toBeInTheDocument()
    expect(screen.getByText('Comments')).toBeInTheDocument()
  })

  it('should call prop function to set header', () => {
    render(getSingleViewPsimiComponent())
    expect(mockSetHeaderFnProp).toBeCalledWith(`PSIMI - ${mockPsimiValue}`)
  })

  it('should render SingleViewPsimiDetails component', () => {
    render(getSingleViewPsimiComponent())
    expect(screen.getByTestId('SingleViewPsimiDetails')).toBeInTheDocument()
  })

  it('should render the SingleViewComments component', () => {
    React.useState = jest.fn().mockReturnValueOnce(['Comments', jest.fn()])

    render(getSingleViewPsimiComponent())
    expect(screen.getByTestId('SingleViewComments')).toBeInTheDocument()
  })

  it('should call function to set selected entity if selected entity is not present', () => {
    render(getSingleViewPsimiComponent())
    expect(setSelectedDirectoryMerchantEntity).toBeCalledWith(mockGetMerchantPsimiResponse)
  })

  it('should display error message if selected entity is not found', () => {
    mockGetMerchantPsimiResponse = null as unknown as DirectoryPsimi
    render(getSingleViewPsimiComponent())
    expect(screen.getByText('PSIMI could not be found. Check that it has not been deleted or refresh your browser')).toBeInTheDocument()
  })
})
