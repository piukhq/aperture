// Dummy location data, placeholder for future ticket. Unsure of exact date format is leaving as string for now till required.

import {DirectoryLocations} from 'types'

export const mockLocationData: DirectoryLocations = [
  {
    name: 'HARVEY NICHOLS',
    location_ref: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
    location_id: '0018',
    merchant_internal_id: '1234',
    is_physical_location: true,
    address_line_1: '16 Manesty\'s Lane',
    town_city: 'Liverpool',
    postcode: 'L1 3D',
    date_added: 'Mar 21, 2019, 3:30pm',
    payment_schemes: [
      {
        label: 'VISA',
        scheme_code: 1,
        count: 1,
      },
      {
        label: 'MASTERCARD',
        scheme_code: 2,
        count: 2,
      },
      {
        label: 'AMEX',
        scheme_code: 3,
        count: 1,
      },
    ],
  },
  {
    name: 'HARVEY NICHOLS',
    location_ref: '3fa85f64-5717-4562-b3fc-2c963f66afa7',
    location_id: '0006',
    merchant_internal_id: '1234',
    is_physical_location: true,
    address_line_1: '21 New Cathedral St',
    town_city: 'Manchester',
    postcode: 'M1 1AD',
    date_added: 'Mar 21, 2019, 3:30pm',
    payment_schemes: [
      {
        label: 'VISA',
        scheme_code: 1,
        count: 1,
      },
      {
        label: 'MASTERCARD',
        scheme_code: 2,
        count: 2,
      },
      {
        label: 'AMEX',
        scheme_code: 3,
        count: 1,
      },
    ],
  },
  {
    name: 'HARVEY NICHOLS',
    location_ref: '3fa85f64-5717-4562-b3fc-2c963f66afa8',
    location_id: '0001',
    merchant_internal_id: '1234',
    is_physical_location: false,
    address_line_1: '109-125 Knightsbridge',
    town_city: 'London',
    postcode: 'SW1X 7RJ',
    date_added: 'Mar 21, 2019, 3:30pm',
    payment_schemes: [
      {
        label: 'VISA',
        scheme_code: 1,
        count: 1,
      },
      {
        label: 'MASTERCARD',
        scheme_code: 2,
        count: 2,
      },
      {
        label: 'AMEX',
        scheme_code: 3,
        count: 1,
      },
    ],
  },
]
