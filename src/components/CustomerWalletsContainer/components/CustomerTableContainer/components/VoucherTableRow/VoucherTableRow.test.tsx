import React from 'react'
import {render, screen} from '@testing-library/react'
import {LoyaltyVoucher} from 'types'
import VoucherTableRow from './VoucherTableRow'

const mockVoucher: LoyaltyVoucher = {
  code: 'mock_code',
  state: 'mock_state',
  headline: 'mock_headline',
  date_issued: 1686058201, // 06/06/2023
  expiry_date: 1687098203, // 18/06/2023
  burn: {
    prefix: 'mock_prefix',
    suffix: 'mock_suffix',
    type: 'mock_type',
  },
  earn: {
    prefix: 'mock_prefix',
    suffix: 'mock_suffix',
    type: 'mock_type',
    value: 100,
    target_value: 200,
  },
  barcode_type: 1,
}

const getVoucherTableRowComponent = (passedProps = {}) => (
  <VoucherTableRow voucher={mockVoucher}{...passedProps} />
)

describe('Test VoucherTableRow', () => {
  it('should render the component', () => {
    render(getVoucherTableRowComponent())
    screen.debug()
    expect(screen.getByTestId('voucher-row')).toBeInTheDocument()
  })

  it('should render the type', () => {
    render(getVoucherTableRowComponent())
    expect(screen.getByText('mock_prefix mock_suffix mock_type')).toBeInTheDocument()
  })

  it('should render the code', () => {
    render(getVoucherTableRowComponent())
    expect(screen.getByText('MOCK_CODE')).toBeInTheDocument()
  })

  it('should render the date issued', () => {
    render(getVoucherTableRowComponent())
    expect(screen.getByText('06/06/2023')).toBeInTheDocument()
  })

  it('should render the date expired', () => {
    render(getVoucherTableRowComponent())
    expect(screen.getByText('18/06/2023')).toBeInTheDocument()
  })

  describe('Test renderVoucherState', () => {
    it('should render the state as redeemed', () => {
      render(getVoucherTableRowComponent({voucher: {...mockVoucher, state: 'redeemed'}}))
      expect(screen.getByText('Redeemed')).toBeInTheDocument()
    })

    it('should render the state as expired', () => {
      render(getVoucherTableRowComponent({voucher: {...mockVoucher, state: 'expired'}}))
      expect(screen.getByText('Expired')).toBeInTheDocument()
    })

    it('should render the state as cancelled', () => {
      render(getVoucherTableRowComponent({voucher: {...mockVoucher, state: 'cancelled'}}))
      expect(screen.getByText('Cancelled')).toBeInTheDocument()
    })

    it('should render the state as issued', () => {
      render(getVoucherTableRowComponent({voucher: {...mockVoucher, state: 'issued'}}))
      expect(screen.getByText('Issued')).toBeInTheDocument()
    })
  })
})
