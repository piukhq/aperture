import React from 'react'
import {render, screen} from '@testing-library/react'
import ModalFactory from 'components/ModalFactory'
import {ModalType} from 'utils/enums'
import {Provider} from 'react-redux'
import configureStore from 'redux-mock-store'
const mockStoreFn = configureStore([])
const store = mockStoreFn({
  directoryPlan: {
    plan_ref: null,
  },
  directoryMerchant: {
    selectedMerchant: {
      merchant_ref: null,
    },
  },
})


jest.mock('components/Modals/components/AssetModal', () => () => <div data-testid='asset-comparator-modal' />)
jest.mock('components/Modals/components/CredentialsModal', () => () => <div data-testid='credentials-modal' />)
jest.mock('components/Modals/components/DirectoryPlanModal', () => () => <div data-testid='directory-plan-modal' />)
jest.mock('components/Modals/components/DirectoryPlanDeleteModal', () => () => <div data-testid='directory-plan-delete-modal' />)
jest.mock('components/Modals/components/DirectoryMerchantModal', () => () => <div data-testid='directory-merchant-modal' />)
jest.mock('components/Modals/components/DirectoryMerchantDeleteModal', () => () => <div data-testid='directory-merchant-delete-modal' />)
jest.mock('components/Modals/components/DirectoryMidModal', () => () => <div data-testid='directory-mid-modal' />)
jest.mock('components/Modals/components/DirectorySingleViewModal', () => () => <div data-testid='directory-single-view-modal' />)
jest.mock('components/Modals/components/DirectoryMerchantMidsDeleteModalContainer', () => () => <div data-testid='directory-merchant-mids-delete-modal' />)
jest.mock('components/Modals/components/DirectoryMerchantSecondaryMidsDeleteModalContainer', () => () => <div data-testid='directory-merchant-secondary-mids-delete-modal' />)
jest.mock('components/Modals/components/DirectoryMerchantLocationsDeleteModalContainer', () => () => <div data-testid='directory-merchant-locations-delete-modal' />)
jest.mock('components/Modals/components/DirectoryMerchantPsimisDeleteModalContainer', () => () => <div data-testid='directory-merchant-psimis-delete-modal' />)
jest.mock('components/Modals/components/DirectoryCommentsModal', () => () => <div data-testid='directory-comments-modal' />)

describe('ModalFactory', () => {
  const mockProps = {
    modalRequested: ModalType.NO_MODAL,
  }

  const getModalFactoryComponent = (passedProps = {}) => (
    <Provider store={store}>
      <ModalFactory {...mockProps} {...passedProps} />
    </Provider>
  )

  describe('Test no modals rendered', () => {
    it('should not render any modals', () => {
      const {container} = render(getModalFactoryComponent())
      expect(container.childElementCount).toEqual(0)
    })
  })


  describe('Test Asset Modal', () => {
    it('should render the Asset Modal', () => {
      render(getModalFactoryComponent({modalRequested: ModalType.ASSET_COMPARATOR_ASSET}))
      expect(screen.queryByTestId('asset-comparator-modal')).toBeInTheDocument()
    })
  })

  describe('Test Credentials Modal', () => {
    it('should render the Credentials Modal', () => {
      render(getModalFactoryComponent({modalRequested: ModalType.ASSET_COMPARATOR_CREDENTIALS}))
      expect(screen.queryByTestId('credentials-modal')).toBeInTheDocument()
    })
  })

  describe('Test Directory Plan Modal', () => {
    it('should render the Directory Plan Modal', () => {
      render(getModalFactoryComponent({modalRequested: ModalType.MID_MANAGEMENT_DIRECTORY_PLAN}))
      expect(screen.queryByTestId('directory-plan-modal')).toBeInTheDocument()
    })
  })

  describe('Test Directory Plan Delete Modal', () => {
    it('should render the Directory Plan Delete Modal', () => {
      render(getModalFactoryComponent({modalRequested: ModalType.MID_MANAGEMENT_DIRECTORY_PLAN_DELETE}))
      expect(screen.queryByTestId('directory-plan-delete-modal')).toBeInTheDocument()
    })
  })

  describe('Test Directory Merchant Modal', () => {
    it('should render the Directory Merchant Modal', () => {
      render(getModalFactoryComponent({modalRequested: ModalType.MID_MANAGEMENT_DIRECTORY_MERCHANT}))
      expect(screen.queryByTestId('directory-merchant-modal')).toBeInTheDocument()
    })
  })

  describe('Test Directory Merchant Delete Modal', () => {
    it('should render the Directory Merchant Delete Modal', () => {
      render(getModalFactoryComponent({modalRequested: ModalType.MID_MANAGEMENT_DIRECTORY_MERCHANT_DELETE}))
      expect(screen.queryByTestId('directory-merchant-delete-modal')).toBeInTheDocument()
    })
  })

  describe('Test Directory MID Modal', () => {
    it('should render the Directory MID Modal', () => {
      render(getModalFactoryComponent({modalRequested: ModalType.MID_MANAGEMENT_DIRECTORY_MID}))
      expect(screen.queryByTestId('directory-mid-modal')).toBeInTheDocument()
    })
  })

  describe('Test Directory Single View Modal', () => {
    it('should render the Directory Single View Modal', () => {
      render(getModalFactoryComponent({modalRequested: ModalType.MID_MANAGEMENT_DIRECTORY_SINGLE_VIEW}))
      expect(screen.queryByTestId('directory-single-view-modal')).toBeInTheDocument()
    })
  })

  describe('Test Directory MIDs Delete Modal', () => {
    it('should render the Directory MIDs Delete Modal', () => {
      render(getModalFactoryComponent({modalRequested: ModalType.MID_MANAGEMENT_DIRECTORY_MIDS_DELETE}))
      expect(screen.queryByTestId('directory-merchant-mids-delete-modal')).toBeInTheDocument()
    })
  })

  describe('Test Directory Secondary MIDs Delete Modal', () => {
    it('should render the Directory Secondary MIDs Delete Modal', () => {
      render(getModalFactoryComponent({modalRequested: ModalType.MID_MANAGEMENT_DIRECTORY_SECONDARY_MIDS_DELETE}))
      expect(screen.queryByTestId('directory-merchant-secondary-mids-delete-modal')).toBeInTheDocument()
    })
  })

  describe('Test Directory Locations Delete Modal', () => {
    it('should render the Directory Locations Delete Modal', () => {
      render(getModalFactoryComponent({modalRequested: ModalType.MID_MANAGEMENT_DIRECTORY_LOCATIONS_DELETE}))
      expect(screen.queryByTestId('directory-merchant-locations-delete-modal')).toBeInTheDocument()
    })
  })

  describe('Test Directory Psimis Delete Modal', () => {
    it('should render the Directory Psimis Delete Modal', () => {
      render(getModalFactoryComponent({modalRequested: ModalType.MID_MANAGEMENT_DIRECTORY_PSIMIS_DELETE}))
      expect(screen.queryByTestId('directory-merchant-psimis-delete-modal')).toBeInTheDocument()
    })
  })

  describe('Test Comments Modal', () => {
    it('should render the Comments Modal', () => {
      render(getModalFactoryComponent({modalRequested: ModalType.MID_MANAGEMENT_COMMENTS}))
      expect(screen.queryByTestId('directory-comments-modal')).toBeInTheDocument()
    })
  })
})
