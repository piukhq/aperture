import {WalletApi2} from 'types'

const getDemoWalletResponse:WalletApi2 = {
  'joins': [],
  'loyalty_cards': [
    {
      'id': 351941,
      'loyalty_plan_id': 292,
      'loyalty_plan_name': 'Viator Discounts',
      'is_fully_pll_linked': true,
      'pll_linked_payment_accounts': 1,
      'total_payment_accounts': 1,
      'status': {
        'state': 'authorised',
        'slug': null,
        'description': null,
      },
      'balance': {
        'updated_at': 1690378214,
        'current_display_value': '£0',
        'loyalty_currency_name': 'GBP',
        'prefix': '£',
        'suffix': null,
        'current_value': '0',
        'target_value': '200',
      },
      'transactions': [
        {
          'id': '134',
          'timestamp': 1690378214,
          'status': 'authorised',
          'description': 'Viator Test Transation ',
          'amounts': [
            {
              'value': 100,
              'prefix': '£',
              'currency': 'GBP',
            },
          ],

        },
      ],
      'vouchers': [
        {
          'state': 'inprogress',
          'earn_type': 'accumulator',
          'reward_text': '10% off discount',
          'headline': 'Spend £200 to get a 10% off Viator voucher code',
          'voucher_code': null,
          'barcode_type': null,
          'progress_display_text': '£0/£200',
          'current_value': '0',
          'target_value': '200',
          'prefix': '£',
          'suffix': null,
          'body_text': 'Spend £200 to get a 10% off Viator voucher code.',
          'terms_and_conditions': 'https://policies.staging.gb.bink.com/Viator/rewardtc.html',
          'issued_date': null,
          'expiry_date': null,
          'redeemed_date': null,
          'conversion_date': null,
        },
        {
          'state': 'issued',
          'earn_type': 'accumulator',
          'reward_text': '10% off discount',
          'headline': 'Spend £200 to get a 10% off Viator voucher code',
          'voucher_code': 'VIATOR10',
          'barcode_type': null,
          'progress_display_text': '£200/£200',
          'current_value': '200',
          'target_value': '200',
          'prefix': '£',
          'suffix': null,
          'body_text': 'Spend £200 to get a 10% off Viator voucher code.',
          'terms_and_conditions': 'https://policies.staging.gb.bink.com/Viator/rewardtc.html',
          'issued_date': 1690378214,
          'expiry_date': 1790378214,
          'redeemed_date': null,
          'conversion_date': null,
        },
      ],
      'card': {
        'barcode': null,
        'barcode_type': null,
        'card_number': 'VIAT6972005562',
        'colour': '#246b6c',
        'text_colour': '#FFFFFF',
      },
      'reward_available': false,
      'images': [
        {
          'id': 1411,
          'type': 3,
          'url': 'https://api.staging.gb.bink.com/content/media/hermes/schemes/Logo1-280x280.png',
          'description': 'Viator Logo',
          'encoding': 'png',
          'cta_url': null,
        },
        {
          'id': 1409,
          'type': 0,
          'url': 'https://api.staging.gb.bink.com/content/media/hermes/schemes/Loyalty_Card_V2_1312x800.png',
          'description': 'Viator Loyalty Card',
          'encoding': 'png',
          'cta_url': null,
        },
        {
          'id': 1412,
          'type': 7,
          'url': 'https://api.staging.gb.bink.com/content/media/hermes/schemes/Viator_Barclays_Promotional_Image.png',
          'description': 'Viator Promotion',
          'encoding': 'png',
          'cta_url': null,
        },
      ],
      'pll_links': [
        {
          'payment_account_id': 89160,
          'payment_scheme': 'Visa',
          'status': {
            'state': 'active',
            'slug': null,
            'description': null,
          },
        },
      ],
    },
  ],
  'payment_accounts': [
    {
      'id': 89160,
      'provider': 'Visa',
      'issuer': 'Barclays',
      'status': 'active',
      'expiry_month': '12',
      'expiry_year': '25',
      'name_on_card': 'lukie',
      'card_nickname': 'My card',
      'type': 'debit',
      'currency_code': 'GBP',
      'country': 'GB',
      'last_four_digits': '5019',
      'images': [
        {
          'id': 55,
          'type': 0,
          'url': 'https://api.staging.gb.bink.com/content/media/hermes/schemes/Visa-Payment_Eq81MWN.png',
          'description': 'Visa Card Image',
          'encoding': 'png',
        },
      ],
      'pll_links': [
        {
          'loyalty_card_id': 351941,
          'loyalty_plan': 'Viator Discounts',
          'status': {
            'state': 'active',
            'slug': null,
            'description': null,
          },
        },
      ],
    },
  ],
}

export const useBankViewport = () => {


  return {
    // Temporary demo wallet
    getDemoWalletResponse,
  }
}

