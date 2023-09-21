// TODO Add adjust for future functionality to be added in the component
import React from 'react'
import {render, screen} from '@testing-library/react'
import {DirectoryHarmoniaModal} from 'components/Modals'
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

jest.mock('hooks/useDirectoryMids', () => ({
  useDirectoryMids: jest.fn().mockImplementation(() => ({
    getMerchantMidsResponse: [],
  })),
}))

jest.mock('hooks/useDirectorySecondaryMids', () => ({
  useDirectorySecondaryMids: jest.fn().mockImplementation(() => ({
    getMerchantSecondaryMidsResponse: [],
  })),
}))

jest.mock('hooks/useDirectoryPsimis', () => ({
  useDirectoryPsimis: jest.fn().mockImplementation(() => ({
    getMerchantPsimisResponse: [],
  })),
}))


const defaultMockStore = {
  directoryHarmonia: {
    harmoniaActionType: HarmoniaActionTypes.ONBOARD,
  },
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

const getDirectoryHarmoniaModalComponent = (passedStore = undefined) => (
  <Provider store={passedStore || store}>
    <DirectoryHarmoniaModal />
  </Provider>
)

describe('DirectoryHarmoniaModal', () => {
  const mockTab = 'mids'

  describe('Test Onboarding', () => {
    const useRouter = jest.spyOn(require('next/router'), 'useRouter')
    describe('Test Mid Onboarding', () => {
      beforeEach(() => {
        jest.clearAllMocks()
        useRouter.mockImplementation(() => ({
          query: {
            tab: mockTab,
          },
        }))
      })

      it('should render the onboarding heading', () => {
        render(getDirectoryHarmoniaModalComponent())
        const heading = screen.getByRole('heading', {
          name: 'Onboard MIDs',
        })

        expect(heading).toBeInTheDocument()
      })

      it('should render the MID onboarding copy', () => {
        render(getDirectoryHarmoniaModalComponent())

        expect(screen.getByTestId('paragraph-1')).toHaveTextContent(/Are you sure you want to onboard the following MIDs:/)
      })

      it('should render the selected mids', () => {
        render(getDirectoryHarmoniaModalComponent())
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

        render(getDirectoryHarmoniaModalComponent(paymentSchemeSlugStore))

        expect(screen.getAllByTestId('payment-card-icon')).toHaveLength(2)
      })

      it('should render the onboarding button', () => {
        render(getDirectoryHarmoniaModalComponent())
        const button = screen.getByRole('button', {
          name: 'Onboard MIDs',
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

        render(getDirectoryHarmoniaModalComponent(singleMidStore))
        const heading = screen.getByRole('heading', {
          name: 'Onboard MID',
        })

        const button = screen.getByRole('button', {
          name: 'Onboard MID',
        })

        expect(heading).toBeInTheDocument()
        expect(screen.getByTestId('paragraph-1')).toHaveTextContent(/Are you sure you want to onboard the following MID:/)
        expect(button).toBeInTheDocument()
      })
    })

    describe('Test Secondary MID Onboarding differences', () => {

      beforeEach(() => {
        jest.clearAllMocks()
        useRouter.mockImplementation(() => ({
          query: {
            tab: 'secondary-mids',
          },
        }))
      })

      it('should render the secondary MID onboarding heading', () => {
        render(getDirectoryHarmoniaModalComponent())
        const heading = screen.getByRole('heading', {
          name: 'Onboard Secondary MIDs',
        })

        expect(heading).toBeInTheDocument()
      })
      it('should render the secondary MID onboarding copy', () => {
        render(getDirectoryHarmoniaModalComponent())

        expect(screen.getByTestId('paragraph-1')).toHaveTextContent(/Are you sure you want to onboard the following Secondary MIDs:/)
      })

      it('should render the onboarding button', () => {
        render(getDirectoryHarmoniaModalComponent())
        const button = screen.getByRole('button', {
          name: 'Onboard Secondary MIDs',
        })

        expect(button).toBeInTheDocument()
      })
    })

    describe('Test PSIMI Onboarding differences', () => {

      beforeEach(() => {
        jest.clearAllMocks()
        useRouter.mockImplementation(() => ({
          query: {
            tab: 'psimis',
          },
        }))
      })

      it('should render the psimi onboarding heading', () => {
        render(getDirectoryHarmoniaModalComponent())
        const heading = screen.getByRole('heading', {
          name: 'Onboard PSIMIs',
        })

        expect(heading).toBeInTheDocument()
      })
      it('should render the psimi onboarding copy', () => {
        render(getDirectoryHarmoniaModalComponent())

        expect(screen.getByTestId('paragraph-1')).toHaveTextContent(/Are you sure you want to onboard the following PSIMIs:/)
      })

      it('should render the psimi onboarding button', () => {
        render(getDirectoryHarmoniaModalComponent())
        const button = screen.getByRole('button', {
          name: 'Onboard PSIMIs',
        })

        expect(button).toBeInTheDocument()
      })
    })
  })

  describe('Test Offboarding differences', () => {
    const offboardingStore = mockStoreFn({
      ...defaultMockStore,
      directoryHarmonia: {
        harmoniaActionType: HarmoniaActionTypes.OFFBOARD,
      },
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
    })

    const useRouter = jest.spyOn(require('next/router'), 'useRouter')
    beforeEach(() => {
      jest.clearAllMocks()
      useRouter.mockImplementation(() => ({
        query: {
          tab: mockTab,
        },
      }))
    })

    it('should render the offboarding heading', () => {
      render(getDirectoryHarmoniaModalComponent(offboardingStore))
      const heading = screen.getByRole('heading', {
        name: 'Offboard MIDs',
      })

      expect(heading).toBeInTheDocument()
    })

    it('should render the entity offboarding copy', () => {
      render(getDirectoryHarmoniaModalComponent(offboardingStore))
      expect(screen.getByTestId('paragraph-1')).toHaveTextContent(/Are you sure you want to offboard the following MIDs:/)
    })

    it('should render the entity offboarding button', () => {
      render(getDirectoryHarmoniaModalComponent(offboardingStore))
      const button = screen.getByRole('button', {
        name: 'Offboard MIDs',
      })

      expect(button).toBeInTheDocument()
    })
  })

  describe('Test Update differences', () => {
    const updateStore = mockStoreFn({
      ...defaultMockStore,
      directoryHarmonia: {
        harmoniaActionType: HarmoniaActionTypes.UPDATE,
      },
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
    })

    const useRouter = jest.spyOn(require('next/router'), 'useRouter')
    beforeEach(() => {
      jest.clearAllMocks()
      useRouter.mockImplementation(() => ({
        query: {
          tab: mockTab,
        },
      }))
    })

    it('should render the update heading', () => {
      render(getDirectoryHarmoniaModalComponent(updateStore))
      const heading = screen.getByRole('heading', {
        name: 'Update MIDs',
      })

      expect(heading).toBeInTheDocument()
    })

    it('should render the MID update copy', () => {
      render(getDirectoryHarmoniaModalComponent(updateStore))
      expect(screen.getByTestId('paragraph-1')).toHaveTextContent(/Are you sure you want to update the following MIDs:/)
    })

    it('should render the update button', () => {
      render(getDirectoryHarmoniaModalComponent(updateStore))
      const button = screen.getByRole('button', {
        name: 'Update MIDs',
      })

      expect(button).toBeInTheDocument()
    })

    it('should render the additional update-specific paragraph for multiple Entities', () => {
      render(getDirectoryHarmoniaModalComponent(updateStore))
      expect(screen.getByText('MIDs will be updated in Harmonia to include current location links and metadata')).toBeInTheDocument()
    })

    it('should render the additional update-specific paragraph for single Entity', () => {
      const singleMidStore = mockStoreFn({
        ...defaultMockStore,
        directoryHarmonia: {
          harmoniaActionType: HarmoniaActionTypes.UPDATE,
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

      render(getDirectoryHarmoniaModalComponent(singleMidStore))
      expect(screen.getByText('This MID will be updated in Harmonia to include current location links and metadata')).toBeInTheDocument()
    })
  })
})
