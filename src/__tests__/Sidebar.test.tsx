import React from 'react'
import * as Redux from 'react-redux'
import configureStore from 'redux-mock-store'
import {render, screen} from '@testing-library/react'
import Sidebar from 'components/Sidebar'
import {UserPermissions} from 'utils/enums'

describe('Sidebar', () => {
  const useDispatchMock = jest.spyOn(Redux, 'useDispatch')
  const useRouter = jest.spyOn(require('next/router'), 'useRouter')

  const useUser = jest.spyOn(require('@auth0/nextjs-auth0'), 'useUser')

  const dummyDispatch = jest.fn()

  const mockStoreFn = configureStore([])

  let store
  const initialState = {
    apiReflector: {
      useApiReflector: false,
    },
  }

  let mockPermissions = []

  beforeEach(() => {
    jest.clearAllMocks()

    useDispatchMock.mockReturnValue(dummyDispatch)
    store = mockStoreFn({...initialState})

    useRouter.mockImplementation(() => ({
      pathname: '',
    }))

    useUser.mockImplementation(() => ({
      user: {
        permissions: mockPermissions,
      },
    }))

    const setStateMock = jest.fn()
    const useStateMock: any = (useState: any) => [useState, setStateMock]
    jest.spyOn(React, 'useState').mockImplementation(useStateMock)
  })

  const getSidebarComponent = (passedStore = undefined) => (
    <Redux.Provider store={passedStore || store}>
      <Sidebar />
    </Redux.Provider>
  )

  describe('Test headings', () => {
    it('should render correct headings', () => {
      render(getSidebarComponent())

      const binkHeading = screen.getByRole('heading', {
        name: 'Bink',
      })

      const toolsHeading = screen.getByRole('heading', {
        name: 'TOOLS',
      })

      expect(binkHeading).toBeInTheDocument()
      expect(toolsHeading).toBeInTheDocument()
    })
  })

  describe('Test logo', () => {
    it('should render logo', () => {
      render(getSidebarComponent())

      expect(screen.queryByTestId('logo')).toBeInTheDocument()
    })
  })

  describe('Test links', () => {
    it('should render correct links', () => {
      render(getSidebarComponent())

      const assetComparatorLink = screen.getByRole('link', {
        name: 'Asset Comparator',
      })

      const planComparatorLink = screen.getByRole('link', {
        name: 'Plan Comparator',
      })

      const styleGuideLink = screen.getByRole('link', {
        name: 'Style Guide',
      })

      expect(assetComparatorLink).toBeInTheDocument()
      expect(planComparatorLink).toBeInTheDocument()
      expect(styleGuideLink).toBeInTheDocument()
    })

    describe('Test permissions specific links', () => {
      it('should not render the MID Management Sidebar link', () => {
        render(getSidebarComponent())

        const midManagementLink = screen.queryByRole('link', {
          name: 'MID Management',
        })

        expect(midManagementLink).not.toBeInTheDocument()
      })

      it('should render the MID Management Sidebar link', () => {
        mockPermissions = [UserPermissions.MERCHANT_DATA_READ_ONLY]
        render(getSidebarComponent())

        const midManagementLink = screen.getByRole('link', {
          name: 'MID Management',
        })

        expect(midManagementLink).toBeInTheDocument()
      })

      it('should not render the Customer Wallets Sidebar link', () => {
        render(getSidebarComponent())

        const customerWalletsLink = screen.queryByRole('link', {
          name: 'Customer Wallets',
        })

        expect(customerWalletsLink).not.toBeInTheDocument()
      })

      it('should render the Customer Wallets Sidebar link', () => {
        mockPermissions = [UserPermissions.CUSTOMER_WALLET_READ_ONLY]
        render(getSidebarComponent())

        const customerWalletsLink = screen.getByRole('link', {
          name: 'Customer Wallets',
        })

        expect(customerWalletsLink).toBeInTheDocument()
      })
    })
  })
})
