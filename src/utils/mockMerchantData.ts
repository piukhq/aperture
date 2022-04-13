// Dummy merchant data, placeholder for future ticket

export const mockMerchantData = [
  {
    merchant_ref: 's13fa85f64-5717-4562-b3fc-2c963f66afa6',
    merchant_metadata: {
      name: 'Aberdeen Asian',
      icon_url: 'https://api.staging.gb.bink.com/content/media/hermes/schemes/SquareMeal_Icon.png',
      location_label: 'restaurant',
    },
    merchant_counts: {
      locations: 33,
      payment_schemes: [
        {
          label: 'VISA',
          scheme_code: 1,
          count: 16,
        },
        {
          label: 'MASTERCARD',
          scheme_code: 2,
          count: 29,
        },
        {
          label: 'AMEX',
          scheme_code: 3,
          count: 54,
        },
      ],
    },
  },
  {
    merchant_ref: 's23fa85f64-5717-4562-b3fc-2c963f66afa6',
    merchant_metadata: {
      name: 'Birmingham Burgers',
      icon_url: 'https://api.staging.gb.bink.com/content/media/hermes/schemes/SquareMeal_Icon.png',
      location_label: 'cafe',
    },
    merchant_counts: {
      locations: 3,
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
          count: 5,
        },
      ],
    },
  },
  {
    merchant_ref: 's33fa85f64-5717-4562-b3fc-2c963f66afa6',
    merchant_metadata: {
      name: 'Cork Crabshacks',
      icon_url: 'https://api.staging.gb.bink.com/content/media/hermes/schemes/SquareMeal_Icon.png',
      location_label: 'crabshack',
    },
    merchant_counts: {
      locations: 3,
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
          count: 3,
        },
      ],
    },
  },
]
