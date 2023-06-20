// TODO Add adjust for future functionality to be added in the component
import React from 'react'
import {render, screen} from '@testing-library/react'
import {DirectorySchemeStatusModal} from 'components/Modals'
import {Provider} from 'react-redux'
import configureStore from 'redux-mock-store'
import {HarmoniaActionTypes} from 'utils/enums'

jest.mock('components/PaymentCardIcon', () => () => <div data-testid='payment-card-icon' />)
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

const defaultMockStore = {
  directoryMerchant: {
    selectedEntityCheckedSelection: [
      {
        entityRef: 'mock_ref_1',
        entityValue: 'mock_value_1',
      },
      {
        entityRef: 'mock_ref_2',
        entityValue: 'mock_value_2',
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
  })
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

  it('should render the onboarding button', () => {
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
