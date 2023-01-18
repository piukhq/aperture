import React from 'react'
import * as Redux from 'react-redux'
import {render, screen} from '@testing-library/react'
import SingleViewLocation from 'components/Modals/components/DirectorySingleViewModal/components/SingleViewLocation'
import {setSelectedDirectoryMerchantEntity} from 'features/directoryMerchantSlice'

const mockName = 'mock_name'
const mockGetMerchantLocationResponse = {
  location_metadata: {
    name: mockName,
  },
}

jest.mock('hooks/useMidManagementLocations', () => ({
  useMidManagementLocations: jest.fn().mockImplementation(() => ({
    getMerchantLocationResponse: mockGetMerchantLocationResponse,
  })),
}))

jest.mock('components/Modals/components/DirectorySingleViewModal/components/SingleViewLocation/components/SingleViewLocationDetails',
  () => () => <div data-testid='SingleViewLocationDetails' />)

jest.mock('components/Modals/components/DirectorySingleViewModal/components/SingleViewComments',
  () => () => <div data-testid='SingleViewComments' />)

jest.mock('features/directoryMerchantSlice', () => ({
  setSelectedDirectoryMerchantEntity: jest.fn(),
  getSelectedDirectoryMerchantEntity: jest.fn().mockReturnValue(null),
}))

const mockSetHeaderFnProp = jest.fn()

const mockProps = {
  selectedEntity: null,
  isInEditState: false,
  setIsInEditState: jest.fn(),
  onCancelEditState: jest.fn(),
  setHeaderFn: mockSetHeaderFnProp,
  setShouldDisplayEditButton: jest.fn(),
  setShouldDisableEditButton: jest.fn(),
}

const useRouter = jest.spyOn(require('next/router'), 'useRouter')
const useDispatchMock = jest.spyOn(Redux, 'useDispatch')

const getSingleViewLocationComponent = () => (
  <SingleViewLocation {...mockProps} />
)

describe('SingleViewLocation', () => {
  beforeEach(() => {
    jest.clearAllMocks()

    useRouter.mockImplementation(() => ({
      query: {
        planId: 'mock_plan_id',
        merchantId: 'mock_merchant_id',
        ref: 'mock_location_ref',
      },
    }))

    const dummyDispatch = jest.fn()
    useDispatchMock.mockReturnValue(dummyDispatch)

    React.useState = jest.fn().mockReturnValueOnce(['Details', jest.fn()]) // tabSelected
  })

  it('should render the Navigation tabs', () => {
    render(getSingleViewLocationComponent())
    expect(screen.getByText('Details')).toBeInTheDocument()
    expect(screen.getByText('MIDs')).toBeInTheDocument()
    expect(screen.getByText('Secondary MIDs')).toBeInTheDocument()
    expect(screen.getByText('Sub-Locations')).toBeInTheDocument()
    expect(screen.getByText('Comments')).toBeInTheDocument()
  })

  it('should call prop function to set header', () => {
    render(getSingleViewLocationComponent())
    expect(mockSetHeaderFnProp).toBeCalledWith(mockName)
  })

  it('should render SingleViewLocationDetails component', () => {
    render(getSingleViewLocationComponent())
    expect(screen.getByTestId('SingleViewLocationDetails')).toBeInTheDocument()
  })

  it('should render the SingleViewComments component', () => {
    React.useState = jest.fn().mockReturnValueOnce(['Comments', jest.fn()])

    render(getSingleViewLocationComponent())
    expect(screen.getByTestId('SingleViewComments')).toBeInTheDocument()
  })

  it('should call function to set selected entity if selected entity is not present', () => {
    render(getSingleViewLocationComponent())
    expect(setSelectedDirectoryMerchantEntity).toBeCalledWith(mockGetMerchantLocationResponse)
  })
})
