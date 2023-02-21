import React from 'react'
import {render, screen} from '@testing-library/react'
import LoadingBar from './LoadingBar'


const mockProps = {
  percentage: 100,
}
const getLoadingBarComponent = (props = {}) => {
  return <LoadingBar {...mockProps} {...props} />
}


describe('Test Loading Bar', () => {
  it('should render Loading Bar', () => {
    render(getLoadingBarComponent())
    expect(screen.getByTestId('loading-bar')).toBeInTheDocument()
  })

  it('should render Loading Bar with match percentage', () => {
    render(getLoadingBarComponent())
    expect(screen.getByText('100% match')).toBeInTheDocument()
  })

})


