import React from 'react'
import * as Redux from 'react-redux'
import {render, screen} from '@testing-library/react'
import {DirectoryLocationModal} from 'components/Modals'
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

jest.mock('hooks/useMidManagementLocations', () => ({
  useMidManagementLocations: jest.fn().mockImplementation(() => ({
    postMerchantLocation: jest.fn(),
    postMerchantLocationIsSuccess: false,
    postMerchantLocationIsLoading: false,
  })),
}))

jest.mock('components/DirectoryMerchantLocationForm', () => () => <div data-testid='directory-merchant-location-form' />)

const useRouter = jest.spyOn(require('next/router'), 'useRouter')
const useDispatchMock = jest.spyOn(Redux, 'useDispatch')

const mockPlanId = 'mock_plan_id'
const mockMerchantId = 'mock_merchant_id'
const mockTab = 'mock_tab'
const mockLocationRef = 'mock_location_ref'
const mockLocationLabel = 'mock_location_label'

const mockNewMerchantInitialState = {
  directoryLocation: {
    locationLabel: mockLocationLabel,
  },
}

const mockStoreFn = configureStore([])
const store = mockStoreFn({...mockNewMerchantInitialState})

const getDirectoryLocationModalComponent = () => (
  <Provider store={store}>
    <DirectoryLocationModal />
  </Provider>
)

describe('DirectoryLocationModal', () => {
  beforeEach(() => {
    jest.clearAllMocks()

    useRouter.mockImplementation(() => ({
      query: {
        planId: mockPlanId,
        merchantId: mockMerchantId,
        tab: mockTab,
        ref: mockLocationRef,
      },
    }))

    const dummyDispatch = jest.fn()
    useDispatchMock.mockReturnValue(dummyDispatch)
  })

  it('should render the correct heading', () => {
    render(getDirectoryLocationModalComponent())
    const heading = screen.getByRole('heading', {
      name: `New ${mockLocationLabel}`,
    })

    expect(heading).toBeInTheDocument()
  })

  it('should render the DirectoryMerchantLocationForm component', () => {
    render(getDirectoryLocationModalComponent())
    expect(screen.getByTestId('directory-merchant-location-form')).toBeInTheDocument()
  })
})
