import React from 'react'
import {render, screen} from '@testing-library/react'
import ApertureHeader from './ApertureHeader'

describe('ApertureHeader', () => {
  it('should render the Aperture heading', () => {
    render(<ApertureHeader />)
    expect(screen.getByRole('heading', {name: 'Aperture'})).toBeInTheDocument()
  })
})
