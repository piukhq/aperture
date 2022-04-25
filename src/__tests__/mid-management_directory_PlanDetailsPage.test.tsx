import React from 'react'
import {render, screen} from '@testing-library/react'
import PlanDetailsPage from 'pages/mid-management/directory/[planId]/index'
import {Provider} from 'react-redux'
import configureStore from 'redux-mock-store'
import {ModalType} from 'utils/enums'

jest.mock('components/DirectoryDetailsHeader', () => () => <div data-testid='directory-details-header' />)
jest.mock('components/DirectoryTile', () => () => <div data-testid='directory-tile' />)
jest.mock('components/DirectoryMerchantModal', () => () => <div data-testid='directory-merchant-modal' />)

const mockStoreFn = configureStore([])
const store = mockStoreFn({modal: {
  modalRequested: 'NO_MODAL',
}})

const getPlanDetailsPageComponent = (passedStore = undefined) => (
  <Provider store={passedStore || store}>
    <PlanDetailsPage />
  </Provider>
)

describe('MID Management PlanDetailsPage', () => {
  beforeEach(() => {
    jest.clearAllMocks()

    const useRouter = jest.spyOn(require('next/router'), 'useRouter')
    useRouter.mockImplementation(() => ({
      query: {
        planId: 'mock_id',
      },
    }))
  })

  it('should render DirectoryDetailsHeader component', () => {
    render(getPlanDetailsPageComponent())
    expect(screen.queryByTestId('directory-details-header')).toBeInTheDocument()
  })

  describe('Test plan content', () => {
    it('should render correct number of plan tiles', () => {
      render(getPlanDetailsPageComponent())
      const planTiles = screen.getAllByTestId('directory-tile')
      // TODO: must fix this test once real plan data is used
      expect(planTiles).toHaveLength(5)
    })
  })

  describe('Test New Merchant button', () => {
    it('should render New Merchant Modal', () => {
      const store = mockStoreFn({
        modal: {
          modalRequested: ModalType.MID_MANAGEMENT_DIRECTORY_MERCHANT,
        },
      })
      render(getPlanDetailsPageComponent(store))
      expect(screen.queryByTestId('directory-merchant-modal')).toBeInTheDocument()
    })

    it('should not render New Merchant Modal', () => {
      render(getPlanDetailsPageComponent(store))
      expect(screen.queryByTestId('directory-merchant-modal')).not.toBeInTheDocument()
    })
  })
})
