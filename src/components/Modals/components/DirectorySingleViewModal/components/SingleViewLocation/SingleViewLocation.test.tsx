import React from 'react'
import {render, screen} from '@testing-library/react'
import SingleViewLocation from 'components/Modals/components/DirectorySingleViewModal/components/SingleViewLocation'
import {setSelectedDirectoryMerchantEntity} from 'features/directoryMerchantSlice'
import {DirectoryEntity, DirectoryLocation} from 'types'

const mockName = 'mock_name'
let mockGetMerchantLocationResponse = {
  location_metadata: {
    name: mockName,
  },
} as unknown as DirectoryLocation

jest.mock('app/hooks', () => ({
  useAppDispatch: () => jest.fn(),
}))

jest.mock('hooks/useDirectoryLocations', () => ({
  useDirectoryLocations: jest.fn().mockImplementation(() => ({
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
  selectedEntity: null as unknown as DirectoryEntity,
  isInEditState: false,
  setIsInEditState: jest.fn(),
  onCancelEditState: jest.fn(),
  setHeaderFn: mockSetHeaderFnProp,
  setIsEntityFound: jest.fn(),
  setShouldDisplayEditButton: jest.fn(),
  setShouldDisableEditButton: jest.fn(),
}

const useRouter = jest.spyOn(require('next/router'), 'useRouter')

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

  it('should display error message if selected entity is not found by the api', () => {
    mockGetMerchantLocationResponse = null as unknown as DirectoryLocation
    render(getSingleViewLocationComponent())
    expect(screen.getByText('Location could not be found. Check that it has not been deleted or refresh your browser')).toBeInTheDocument()
  })
})
