import React from 'react'
import {render, screen} from '@testing-library/react'
import PageNotFound from './PageNotFound'

describe('Page Not Found', () => {
  it('should render the Page Not Found Header', () => {
    render(< PageNotFound />)
    expect(screen.getByRole('heading', {name: 'Oops! Page not found'})).toBeInTheDocument()
  })
})
