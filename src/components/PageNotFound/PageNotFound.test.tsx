import React from 'react'
import {render, screen} from '@testing-library/react'
import PageNotFound from './PageNotFound'
import {Provider} from 'react-redux'
import configureStore from 'redux-mock-store'

const mockStoreFn = configureStore([])
const store = mockStoreFn({})

const getPageNotFound = (passedProps = {}) => {
  return (
    <Provider store={store}>
      <PageNotFound {...passedProps} />
    </Provider>
  )
}

describe('Page Not Found', () => {
  it('should render the Page Not Found Header', () => {
    render(getPageNotFound())
    expect(screen.getByRole('heading', {name: 'Oops! Page not found'})).toBeInTheDocument()
  })
  it('should render the Page Not Found copy', () => {
    render(getPageNotFound())
    expect(screen.getByText('Sorry, the page you\'re looking for doesn\'t exist')).toBeInTheDocument()
  })
  it('should render the Go Home button', () => {
    render(getPageNotFound())
    expect(screen.getByText('Go Home')).toBeInTheDocument()
  })
  it('should render the Let Us Know button', () => {
    render(getPageNotFound())
    expect(screen.getByRole('link', {name: 'Let Us Know'})).toBeInTheDocument()
  })
})
