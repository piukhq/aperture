import React from 'react'
import * as Redux from 'react-redux'
import configureStore from 'redux-mock-store'
import {render, screen} from '@testing-library/react'
import Sidebar from 'components/Sidebar'
import {UserPermissions} from 'utils/enums'

describe('Sidebar', () => {
  const useRouter = jest.spyOn(require('next/router'), 'useRouter')
  const useUser = jest.spyOn(require('@auth0/nextjs-auth0'), 'useUser')

  const mockStoreFn = configureStore([])

  let store
  const initialState = {
    apiReflector: {
      useApiReflector: false,
    },
  }

  let mockPermissions = [] as UserPermissions[]

  beforeEach(() => {
    jest.clearAllMocks()
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
    const useStateMock = (useState) => [useState, setStateMock]
    jest.spyOn(React, 'useState').mockImplementation(useStateMock as unknown as () => [boolean, React.Dispatch<React.SetStateAction<boolean>>]) // Hardcore TS!
  })

  const getSidebarComponent = (passedStore = undefined) => (
    <Redux.Provider store={passedStore || store}>
      <Sidebar isOpen={true} setIsOpen={jest.fn()} />
    </Redux.Provider>
  )

  describe('Test headings', () => {
    it('should render correct heading', () => {
      render(getSidebarComponent())

      const binkHeading = screen.getByRole('heading', {
        name: 'APERTURE',
      })

      expect(binkHeading).toBeInTheDocument()
    })

    it('should render the skip to main content link but visible onto when focused', () => {
      render(getSidebarComponent())
      const skipToContentLink = screen.getByRole('link', {name: 'Skip to content'})

      expect(skipToContentLink).toBeInTheDocument()
      expect(skipToContentLink).toHaveClass('opacity-0')
      expect(skipToContentLink).toHaveClass('focus:opacity-100')
    })
  })

  describe('Test logo', () => {
    it('should render logo', () => {
      render(getSidebarComponent())

      expect(screen.queryByTestId('logo')).toBeInTheDocument()
    })
  })

  describe('Test Sub-Headings', () => {
    it('should render the Mid Management subheading', () => {
      mockPermissions = [UserPermissions.MERCHANT_DATA_READ_ONLY]
      render(getSidebarComponent())
      expect(screen.getByRole('heading', {name: 'MID Management'})).toBeInTheDocument()
    })

    it('should render the Plan Management subheading', () => {
      render(getSidebarComponent())
      expect(screen.getByRole('heading', {name: 'Plan Management'})).toBeInTheDocument()
    })

    // it('should render the Customer Support subheading', () => {
    //   mockPermissions = [UserPermissions.CUSTOMER_WALLET_READ_ONLY]
    //   render(getSidebarComponent())
    //   expect(screen.getByRole('heading', {name: 'Customer Support'})).toBeInTheDocument()
    // })
  })

  describe('Test links', () => {
    it('should render correct links', () => {
      render(getSidebarComponent())

      const assetComparatorLink = screen.getByRole('link', {
        name: 'ASSET COMPARATOR',
      })

      const planComparatorLink = screen.getByRole('link', {
        name: 'PLAN COMPARATOR',
      })

      expect(assetComparatorLink).toBeInTheDocument()
      expect(planComparatorLink).toBeInTheDocument()
    })

    describe('Test permissions specific links', () => {
      it('should not render the MID Management Sidebar link', () => {
        mockPermissions = [UserPermissions.CUSTOMER_WALLET_READ_ONLY]
        render(getSidebarComponent())

        const directoryLink = screen.queryByRole('link', {
          name: 'MID DIRECTORY',
        })

        expect(directoryLink).not.toBeInTheDocument()
      })

      it('should render the MID Management Sidebar link', () => {
        mockPermissions = [UserPermissions.MERCHANT_DATA_READ_ONLY]
        render(getSidebarComponent())

        const directoryLink = screen.getByRole('link', {
          name: 'MID DIRECTORY',
        })

        expect(directoryLink).toBeInTheDocument()
      })

      // TODO: Uncomment this test when the Customer Wallets feature is ready
      // it('should not render the Customer Wallets Sidebar link', () => {
      //   render(getSidebarComponent())

      //   const customerWalletsLink = screen.queryByRole('link', {
      //     name: 'CUSTOMER WALLETS',
      //   })

      //   expect(customerWalletsLink).not.toBeInTheDocument()
      // })

      // it('should render the Customer Wallets Sidebar link', () => {
      //   mockPermissions = [UserPermissions.CUSTOMER_WALLET_READ_ONLY]
      //   render(getSidebarComponent())

      //   const customerWalletsLink = screen.getByRole('link', {
      //     name: 'CUSTOMER WALLETS',
      //   })

      //   expect(customerWalletsLink).toBeInTheDocument()
      // })
    })
  })

  describe('Test Collapsed Sidebar', () => {
    it('should render collapsed sidebar with no app links bar home page link', () => {
      render(
        <Redux.Provider store={store}>
          <Sidebar isOpen={false} setIsOpen={jest.fn()} />
        </Redux.Provider>
      )

      const links = screen.queryAllByRole('link')
      expect(links).toHaveLength(1)
    })
  })
})
