import React from 'react'
import {render, screen} from '@testing-library/react'
import SingleViewSubLocation from 'components/Modals/components/DirectorySingleViewModal/components/SingleViewSubLocation'
import {setSelectedDirectoryMerchantEntity} from 'features/directoryMerchantSlice'

const mockName = 'mock_name'
let mockGetMerchantSubLocationResponse = {
  parent_location: {
    location_ref: 'mock_parent_location_ref',
    location_title: 'mock_parent_location_title',
  },
  sub_location: {
    location_metadata: {
      name: mockName,
    },
  },
}

jest.mock('app/hooks', () => ({
  useAppDispatch: () => jest.fn(),
}))

jest.mock('hooks/useDirectoryLocationSubLocations', () => ({
  useDirectoryLocationSubLocations: jest.fn().mockImplementation(() => ({
    getMerchantLocationSubLocationResponse: mockGetMerchantSubLocationResponse,
  })),
}))

jest.mock('components/Modals/components/DirectorySingleViewModal/components/SingleViewSubLocation/components/SingleViewSubLocationDetails',
  () => () => <div data-testid='SingleViewSubLocationDetails' />)

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
  setIsEntityFound: jest.fn(),
  setShouldDisplayEditButton: jest.fn(),
  setShouldDisableEditButton: jest.fn(),
}

const useRouter = jest.spyOn(require('next/router'), 'useRouter')

const getSingleViewSubLocationComponent = () => (
  <SingleViewSubLocation {...mockProps} />
)

describe('SingleViewSubLocation', () => {
  beforeEach(() => {
    jest.clearAllMocks()

    useRouter.mockImplementation(() => ({
      query: {
        planId: 'mock_plan_id',
        merchantId: 'mock_merchant_id',
        ref: 'mock_location_ref',
        sub_location_ref: 'mock_sub_location_ref',
      },
    }))

    React.useState = jest.fn().mockReturnValueOnce(['Details', jest.fn()]) // tabSelected
  })

  it('should render the Navigation tabs', () => {
    render(getSingleViewSubLocationComponent())
    expect(screen.getByText('Details')).toBeInTheDocument()
    expect(screen.getByText('Comments')).toBeInTheDocument()
  })

  it('should call prop function to set header', () => {
    render(getSingleViewSubLocationComponent())
    expect(mockSetHeaderFnProp).toBeCalledWith(mockName)
  })

  it('should render SingleViewSubLocationDetails component', () => {
    render(getSingleViewSubLocationComponent())
    expect(screen.getByTestId('SingleViewSubLocationDetails')).toBeInTheDocument()
  })

  it('should render the SingleViewComments component', () => {
    React.useState = jest.fn().mockReturnValueOnce(['Comments', jest.fn()])

    render(getSingleViewSubLocationComponent())
    expect(screen.getByTestId('SingleViewComments')).toBeInTheDocument()
  })

  it('should call function to set selected entity if selected entity is not present', () => {
    render(getSingleViewSubLocationComponent())
    expect(setSelectedDirectoryMerchantEntity).toBeCalledWith(mockGetMerchantSubLocationResponse)
  })

  it('should display error message if selected entity is not found', () => {
    mockGetMerchantSubLocationResponse = null
    render(getSingleViewSubLocationComponent())
    expect(screen.getByText('Sub-location could not be found. Check that it has not been deleted or refresh your browser')).toBeInTheDocument()
  })
})
