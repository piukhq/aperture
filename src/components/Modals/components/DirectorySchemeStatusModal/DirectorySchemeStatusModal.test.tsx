// TODO Add adjust for future functionality to be added in the component
import React from 'react'
import {render, screen} from '@testing-library/react'
import {DirectorySchemeStatusModal} from 'components/Modals'
import {Provider} from 'react-redux'
import configureStore from 'redux-mock-store'
import {HarmoniaActionTypes} from 'utils/enums'

jest.mock('components/PaymentCardIcon', () => () => <div data-testid='payment-card-icon' />)
jest.mock('components/Dropdown', () => () => <div data-testid='dropdown' />)
jest.mock('components/Modal', () => ({
  __esModule: true,
  default ({modalHeader, children}: Record<string, React.ReactNode>) {
    return (
      <div>
        <h1>{modalHeader}</h1>
        {children}
      </div>
    )
  },
}))

// switches for mocking the response from the hooks in different tests
let mockIsSuccess = false
let mockIsError = false
let mockIsLoading = false

jest.mock('hooks/useDirectoryMids', () => ({
  useDirectoryMids: jest.fn().mockImplementation(() => ({
    patchMerchantMidsBulk: jest.fn(),
    patchMerchantMidsBulkIsSuccess: mockIsSuccess,
    resetPatchMerchantMidsBulkResponse: jest.fn(),
    patchMerchantMidsBulkIsError: mockIsError,
    patchMerchantMidsBulkIsLoading: mockIsLoading,
  })),
}))

jest.mock('hooks/useDirectorySecondaryMids', () => ({
  useDirectorySecondaryMids: jest.fn().mockImplementation(() => ({
    patchMerchantSecondaryMidsBulk: jest.fn(),
    patchMerchantSecondaryMidsBulkIsSuccess: mockIsSuccess,
    resetPatchMerchantSecondaryMidsBulkResponse: jest.fn(),
    patchMerchantSecondaryMidsBulkIsError: mockIsError,
    patchMerchantSecondaryMidsBulkIsLoading: mockIsLoading,
  })),
}))

const defaultMockStore = {
  directoryMerchant: {
    selectedEntityCheckedSelection: [
      {
        entityRef: 'mock_ref_1',
        entityValue: 'mock_value_1',
        entitySchemeStatus: 'enrolled',
      },
      {
        entityRef: 'mock_ref_2',
        entityValue: 'mock_value_2',
        entitySchemeStatus: 'enrolling',
      },
    ],
  },
  modal: {
    isModalHidden: false,
    shouldModalClose: false,
  }}
const mockStoreFn = configureStore([])
const store = mockStoreFn(defaultMockStore)

const getDirectorySchemeStatusModalComponent = (passedStore = undefined) => (
  <Provider store={passedStore || store}>
    <DirectorySchemeStatusModal />
  </Provider>
)

describe('DirectorySchemeStatusModal', () => {
  const useRouter = jest.spyOn(require('next/router'), 'useRouter')
  beforeEach(() => {
    jest.clearAllMocks()
    useRouter.mockImplementation(() => ({
      query: {
        tab: 'mids',
      },
    }))

    React.useState = jest.fn().mockImplementation(() => ['', jest.fn()])
  })


  describe('Test initial status', () => {
    it('should render the scheme status heading', () => {
      render(getDirectorySchemeStatusModalComponent())
      const heading = screen.getByRole('heading', {
        name: 'Set MIDs Enrolment Status',
      })

      expect(heading).toBeInTheDocument()
    })

    it('should render the MID scheme status copy', () => {
      render(getDirectorySchemeStatusModalComponent())

      expect(screen.getByTestId('paragraph-1')).toHaveTextContent(/Are you sure you want to update the payment scheme enrolment status of the following MIDs:/)
    })

    it('should render the selected mids', () => {
      render(getDirectorySchemeStatusModalComponent())
      const mids = screen.getAllByRole('listitem')

      expect(mids).toHaveLength(2)
    })

    it('should render the payment card icon when a payment scheme slug is provided', () => {
      const paymentSchemeSlugStore = mockStoreFn({
        ...defaultMockStore,
        directoryHarmonia: {
          harmoniaActionType: HarmoniaActionTypes.ONBOARD,
        },
        directoryMerchant: {
          selectedEntityCheckedSelection: [
            {
              entityRef: 'mock_ref_1',
              entityValue: 'mock_value_1',
              paymentSchemeSlug: 'visa',
            },
            {
              entityRef: 'mock_ref_2',
              entityValue: 'mock_value_2',
              paymentSchemeSlug: 'visa',
            },
          ],
        },
      })

      render(getDirectorySchemeStatusModalComponent(paymentSchemeSlugStore))
      expect(screen.getAllByTestId('payment-card-icon')).toHaveLength(2)
    })

    it('should render the 2nd paragraph copy', () => {
      render(getDirectorySchemeStatusModalComponent())
      expect(screen.getByTestId('paragraph-2')).toHaveTextContent(/Enrolment status for these MIDs will be set to/)
    })

    it('should render the apply button', () => {
      render(getDirectorySchemeStatusModalComponent())
      const button = screen.getByRole('button', {
        name: 'Apply',
      })

      expect(button).toBeInTheDocument()
    })

    it('should adjust the heading and button text when there is a single MID', () => {
      const singleMidStore = mockStoreFn({
        ...defaultMockStore,
        directoryHarmonia: {
          harmoniaActionType: HarmoniaActionTypes.ONBOARD,
        },
        directoryMerchant: {
          selectedEntityCheckedSelection: [
            {
              entityRef: 'mock_ref_1',
              entityValue: 'mock_value_1',
            },
          ],
        },
      })

      render(getDirectorySchemeStatusModalComponent(singleMidStore))
      const heading = screen.getByRole('heading', {
        name: 'Set MID Enrolment Status',
      })

      expect(heading).toBeInTheDocument()
      expect(screen.getByTestId('paragraph-1')).toHaveTextContent(/Are you sure you want to update the payment scheme enrolment status of the following MID:/)
      expect(screen.getByTestId('paragraph-2')).toHaveTextContent(/Enrolment status for this MID will be set to/)

    })
  })

  describe('Test error state', () => {
    it('should render the error copy', () => {
      mockIsError = true
      render(getDirectorySchemeStatusModalComponent())
      expect(screen.getByText(/MIDs status update failed/)).toBeInTheDocument()

    })
  })

  describe('Test success state', () => {
    it('should render the success copy', () => {
      mockIsSuccess = true
      render(getDirectorySchemeStatusModalComponent())

      expect(screen.getByText(/MIDs enrolment status has been successfully changed/)).toBeInTheDocument()
    })
  })

  describe('Test Secondary MIDs', () => {
    beforeEach(() => {
      jest.clearAllMocks()
      useRouter.mockImplementation(() => ({
        query: {
          tab: 'secondary-mids',
        },
      }))
    })

    it('should render the secondary Mid versions of initial modal copy', () => {
      mockIsSuccess = false
      render(getDirectorySchemeStatusModalComponent())
      const heading = screen.getByRole('heading', {
        name: 'Set Secondary MIDs Enrolment Status',
      })

      expect(heading).toBeInTheDocument()
      expect(screen.getByTestId('paragraph-1')).toHaveTextContent(/Are you sure you want to update the payment scheme enrolment status of the following Secondary MIDs:/)
      expect(screen.getByTestId('paragraph-2')).toHaveTextContent(/Enrolment status for these Secondary MIDs will be set to/)
      expect(screen.getByText(/Secondary MIDs status update failed/)).toBeInTheDocument()
    })

    it('should render the secondary Mid versions of success modal copy', () => {
      mockIsSuccess = true
      render(getDirectorySchemeStatusModalComponent())

      expect(screen.getByText(/Secondary MIDs enrolment status has been successfully changed/)).toBeInTheDocument()
    })
  })

  describe('Test loading state', () => {
    it('should render the Apply button in its loading state', () => {
      mockIsLoading = true
      mockIsSuccess = false
      render(getDirectorySchemeStatusModalComponent())
      const button = screen.getByRole('button') // The name is applying at this point but this is fine for this test

      expect(button).toBeDisabled()
      expect(button).toHaveTextContent(/Applying/)
    })
  })

})
