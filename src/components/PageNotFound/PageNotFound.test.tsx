import React from 'react'
import {render, screen} from '@testing-library/react'
import PageNotFound from './PageNotFound'

describe('Page Not Found', () => {
  it('should render the Page Not Found Header', () => {
    render(< PageNotFound />)
    expect(screen.getByRole('heading', {name: 'Oops! Page not found'})).toBeInTheDocument()
  })
  it('should render the Page Not Found copy', () => {
    render(< PageNotFound />)
    expect(screen.getByText('Sorry, the page you\'re looking for doesn\'t exist')).toBeInTheDocument()
  })
  it('should render the Go Home button', () => {
    render(< PageNotFound />)
    expect(screen.getByText('Go Home')).toBeInTheDocument()
  })
  it('should render the Let Us Know button', () => {
    render(< PageNotFound />)
    expect(screen.getByRole('link', {name: 'Let Us Know'})).toBeInTheDocument()
  })
})
