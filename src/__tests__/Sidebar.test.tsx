import React from 'react'
import * as Redux from 'react-redux'
import configureStore from 'redux-mock-store'
import {render, screen} from '@testing-library/react'
import Sidebar from 'components/Sidebar'

describe('Sidebar', () => {
  const useDispatchMock = jest.spyOn(Redux, 'useDispatch')
  const useRouter = jest.spyOn(require('next/router'), 'useRouter')

  const dummyDispatch = jest.fn()

  const mockStoreFn = configureStore([])

  let store
  const initialState = {
    apiReflectorToggle: {
      useApiReflector: false,
    },
  }

  beforeEach(() => {
    jest.clearAllMocks()

    useDispatchMock.mockReturnValue(dummyDispatch)
    store = mockStoreFn({...initialState})

    useRouter.mockImplementation(() => ({
      pathname: '',
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

      const midManagementLink = screen.getByRole('link', {
        name: 'MID Management',
      })

      const customerWalletsLink = screen.getByRole('link', {
        name: 'Customer Wallets',
      })

      const styleGuideLink = screen.getByRole('link', {
        name: 'Style Guide',
      })

      expect(assetComparatorLink).toBeInTheDocument()
      expect(planComparatorLink).toBeInTheDocument()
      expect(midManagementLink).toBeInTheDocument()
      expect(customerWalletsLink).toBeInTheDocument()
      expect(styleGuideLink).toBeInTheDocument()
    })
  })
})
