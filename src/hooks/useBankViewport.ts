import {WalletApi2} from 'types'


const demoApiResponse = JSON.parse(`{
  "id": 358151,
  "loyalty_plan_id": 292,
  "loyalty_plan_name": "Viator Discounts",
  "is_fully_pll_linked": false,
  "pll_linked_payment_accounts": 0,
  "total_payment_accounts": 1,
  "status": {
      "state": "pending",
      "slug": "WALLET_ONLY",
      "description": "No authorisation provided"
  },
  "balance": {
      "updated_at": null,
      "current_display_value": null,
      "loyalty_currency_name": null,
      "prefix": null,
      "suffix": null,
      "current_value": null,
      "target_value": null
  },
  "transactions": [],
  "vouchers": [],
  "card": {
      "barcode": null,
      "barcode_type": null,
      "card_number": "6332040000000000002",
      "colour": "#246b6c",
      "text_colour": "#FFFFFF"
  },
  "reward_available": false,
  "images": [
      {
          "id": 1411,
          "type": 3,
          "url": "https://api.staging.gb.bink.com/content/media/hermes/schemes/Logo1-280x280.png",
          "description": "Viator Logo",
          "encoding": "png",
          "cta_url": null
      },
      {
          "id": 1409,
          "type": 0,
          "url": "https://api.staging.gb.bink.com/content/media/hermes/schemes/Loyalty_Card_V2_1312x800.png",
          "description": "Viator Loyalty Card",
          "encoding": "png",
          "cta_url": null
      },
      {
          "id": 1412,
          "type": 7,
          "url": "https://api.staging.gb.bink.com/content/media/hermes/schemes/Viator_Barclays_Promotional_Image.png",
          "description": "Viator Promotion",
          "encoding": "png",
          "cta_url": null
      }
  ],
  "pll_links": [
      {
          "payment_account_id": 89160,
          "payment_scheme": "Visa",
          "status": {
              "state": "inactive",
              "slug": "UBIQUITY_COLLISION",
              "description": "There is already a Loyalty Card from the same Loyalty Plan linked to this Payment Account."
          }
      }
  ]
}`)

export const useBankViewport = () => {


  const getDemoWalletResponse: WalletApi2 = demoApiResponse

  return {
    // Temporary demo wallet
    getDemoWalletResponse,
  }
}

