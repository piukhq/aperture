// Dummy data from a GET '/merchant_data/v1.0/plans' API call
export const mockPlanData = [
  {
    plan_ref: 'a3fa85f64-5717-4562-b3fc-2c963f66afa6',
    plan_metadata: {
      name: 'ASOS',
      icon_url: 'https://api.staging.gb.bink.com/content/media/hermes/schemes/App_icon.png',
      slug: 'bpl-asos',
      plan_id: 999,
    },
    plan_counts: {
      merchants: 1,
      locations: 1,
      payment_schemes: [
        {
          label: 'VISA',
          scheme_code: 1,
          count: 1,
        },
        {
          label: 'MASTERCARD',
          scheme_code: 2,
          count: 0,
        },
        {
          label: 'AMEX',
          scheme_code: 3,
          count: 0,
        },
      ],
    },
  },
  {
    plan_ref: 's3fa85f64-5717-4562-b3fc-2c963f66afa6',
    plan_metadata: {
      name: 'SquareMeal',
      icon_url: 'https://api.staging.gb.bink.com/content/media/hermes/schemes/SquareMeal_Icon.png',
      slug: 'squaremeal',
      plan_id: 286,
    },
    plan_counts: {
      merchants: 21,
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
    plan_ref: 't3fa85f64-5717-4562-b3fc-2c963f66afa6',
    plan_metadata: {
      name: 'Trenette',
      icon_url: 'https://api.staging.gb.bink.com/content/media/hermes/schemes/trenette-con.png',
      slug: 'bpl-trenette',
      plan_id: 284,
    },
    plan_counts: {
      merchants: 1,
      locations: 12,
      payment_schemes: [
        {
          label: 'VISA',
          scheme_code: 1,
          count: 32,
        },
        {
          label: 'MASTERCARD',
          scheme_code: 2,
          count: 54,
        },
        {
          label: 'AMEX',
          scheme_code: 3,
          count: 0,
        },
      ],
    },
  },
  {
    plan_ref: 'w3fa85f64-5717-4562-b3fc-2c963f66afa6',
    plan_metadata: {
      name: 'Wasabi',
      icon_url: 'https://api.staging.gb.bink.com/content/media/hermes/schemes/Wasabi_Logo.png',
      slug: 'wasabi-club',
      plan_id: 281,
    },
    plan_counts: {
      merchants: 1,
      locations: 53,
      payment_schemes: [
        {
          label: 'VISA',
          scheme_code: 1,
          count: 31,
        },
        {
          label: 'MASTERCARD',
          scheme_code: 2,
          count: 71,
        },
        {
          label: 'AMEX',
          scheme_code: 3,
          count: 99,
        },
      ],
    },
  },
  {
    plan_ref: 'i3fa85f64-5717-4562-b3fc-2c963f66afa6',
    plan_metadata: {
      name: 'Iceland',
      icon_url: 'https://api.staging.gb.bink.com/content/media/hermes/schemes/Iceland-icon4_o9OHvob.png',
      slug: 'iceland-bonus-card',
      plan_id: 240,
    },
    plan_counts: {
      merchants: 1,
      locations: 89,
      payment_schemes: [
        {
          label: 'VISA',
          scheme_code: 1,
          count: 133,
        },
        {
          label: 'MASTERCARD',
          scheme_code: 2,
          count: 22,
        },
        {
          label: 'AMEX',
          scheme_code: 3,
          count: 8,
        },
      ],
    },
  },
]
