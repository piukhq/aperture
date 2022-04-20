// Dummy data from a GET '/merchant_data/v1.0/plans/{plan_ref}' API call
export const mockPlanDetailsData = {
  plan_ref: 's3fa85f64-5717-4562-b3fc-2c963f66afa6',
  plan_metadata: {
    name: 'SquareMeal',
    icon_url: 'https://api.staging.gb.bink.com/content/media/hermes/schemes/SquareMeal_Icon.png',
    slug: 'squaremeal',
    plan_id: 286,
  },
  merchants: [
    {
      merchant: {
        merchant_ref: '3fa85f64-5717-4562-b3fc-2c963f66afa5',
        merchant_metadata: {
          name: 'Cada Bardotti',
          icon_url: 'https://api.staging.gb.bink.com/content/media/hermes/schemes/trenette-con.png',
          location_label: 'Locations',
        },
        merchant_counts: {
          locations: 6,
          payment_schemes: [
            {
              label: 'VISA',
              scheme_code: 1,
              count: 54,
            },
            {
              label: 'MASTERCARD',
              scheme_code: 2,
              count: 62,
            },
            {
              label: 'AMEX',
              scheme_code: 3,
              count: 38,
            },
          ],
        },
      },
    },
    {
      merchant: {
        merchant_ref: '3fa85f64-5717-4562-b3fc-2c963f66afa7',
        merchant_metadata: {
          name: 'Yuu Kitchen',
          icon_url: 'https://api.staging.gb.bink.com/content/media/hermes/schemes/trenette-con.png',
          location_label: 'Stores',
        },
        merchant_counts: {
          locations: 17,
          payment_schemes: [
            {
              label: 'VISA',
              scheme_code: 1,
              count: 54,
            },
            {
              label: 'MASTERCARD',
              scheme_code: 2,
              count: 62,
            },
            {
              label: 'AMEX',
              scheme_code: 3,
              count: 38,
            },
          ],
        },
      },
    },
    {
      merchant: {
        merchant_ref: '3fa85f64-5717-4562-b3fc-2c963f66afa8',
        merchant_metadata: {
          name: 'Cada Bardotti',
          icon_url: 'https://api.staging.gb.bink.com/content/media/hermes/schemes/trenette-con.png',
          location_label: 'Restaurants',
        },
        merchant_counts: {
          locations: 4,
          payment_schemes: [
            {
              label: 'VISA',
              scheme_code: 1,
              count: 54,
            },
            {
              label: 'MASTERCARD',
              scheme_code: 2,
              count: 62,
            },
            {
              label: 'AMEX',
              scheme_code: 3,
              count: 38,
            },
          ],
        },
      },
    },
    {
      merchant: {
        merchant_ref: '3fa85f64-5717-4562-b3fc-2c963f66afa9',
        merchant_metadata: {
          name: 'Yuu Kitchen',
          icon_url: 'https://api.staging.gb.bink.com/content/media/hermes/schemes/trenette-con.png',
          location_label: 'Cafes',
        },
        merchant_counts: {
          locations: 3,
          payment_schemes: [
            {
              label: 'VISA',
              scheme_code: 1,
              count: 54,
            },
            {
              label: 'MASTERCARD',
              scheme_code: 2,
              count: 62,
            },
            {
              label: 'AMEX',
              scheme_code: 3,
              count: 38,
            },
          ],
        },
      },
    },
    {
      merchant: {
        merchant_ref: '3fa85f64-5717-4562-b3fc-2c963f66afa0',
        merchant_metadata: {
          name: 'Cada Bardotti',
          icon_url: 'https://api.staging.gb.bink.com/content/media/hermes/schemes/trenette-con.png',
          location_label: 'Shops',
        },
        merchant_counts: {
          locations: 18,
          payment_schemes: [
            {
              label: 'VISA',
              scheme_code: 1,
              count: 54,
            },
            {
              label: 'MASTERCARD',
              scheme_code: 2,
              count: 62,
            },
            {
              label: 'AMEX',
              scheme_code: 3,
              count: 38,
            },
          ],
        },
      },
    },
  ],
}
