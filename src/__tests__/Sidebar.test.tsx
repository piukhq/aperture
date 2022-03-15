import React from 'react'
import {render, screen} from '@testing-library/react'
import Sidebar from 'components/Sidebar'

describe('Sidebar', () => {
  beforeEach(() => {
    jest.clearAllMocks()

    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const useRouter = jest.spyOn(require('next/router'), 'useRouter')

    useRouter.mockImplementation(() => ({
      pathname: '',
    }))

    const setStateMock = jest.fn()
    const useStateMock: any = (useState: any) => [useState, setStateMock]
    jest.spyOn(React, 'useState').mockImplementation(useStateMock)
  })

  describe('Test headings', () => {
    it('should render correct headings', () => {
      render(<Sidebar />)

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
      const {queryByTestId} = render(<Sidebar />)
      expect(queryByTestId('logo')).toBeInTheDocument()
    })
  })

  describe('Test links', () => {
    it('should render correct links', () => {
      render(<Sidebar />)

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
