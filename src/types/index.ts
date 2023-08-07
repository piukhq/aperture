import {ReactNode} from 'react'
import {CommentsOwnerTypes, CommentsSubjectTypes, PaymentSchemeName, PaymentSchemeSlug, UserPermissions} from 'utils/enums'
import {UserProfile} from '@auth0/nextjs-auth0'

type PlanAccount = {
  add_fields: Array<unknown>,
  authorise_fields: Array<unknown>,
  category: string,
  company_name: string,
  company_url: string,
  enrol_fields: Array<unknown>,
  fees: Array<unknown>,
  plan_documents: Array<unknown>,
  plan_name: string,
  plan_url: string,
  registration_fields: Array<unknown>,
  tiers: Array<unknown>,
}

export type Plan = {
  id: number,
  account: PlanAccount,
  feature_set: Record<string, string | number | boolean | Array<unknown>>,
  card: Record<string, string | number>,
  uid: string,
  status: string,
  balances: Array<Record<string, unknown>>,
  images: PlanImage[],
  slug: string,
} | null

export type HydratedPlan = Plan & {
  isDev: boolean,
  isStaging: boolean,
  isProd: boolean,
  devImages: PlanImage[],
  stagingImages: PlanImage[],
  prodImages: PlanImage[],
  balances: Array<Record<string, unknown>>
  images: Array<Record<string, unknown>>
  slug: string
  devPlan: Plan,
  stagingPlan: Plan,
  prodPlan: Plan,
}

export type AssetType = {
  heading: string
  dev: Array<PlanImage>,
  staging: Array<PlanImage>,
  prod: Array<PlanImage>,
  longestAssetArray: Array<PlanImage>,
  hasMultipleImagesOfThisType: boolean,
}

export type PlanImage = {
  id: number,
  type: number,
  url: string,
  encoding: string,
  description: string,
  cta_url?: string | null,
}

export type PlanAsset = { // Plan Image with additional metadata used for Asset Modal
  image: PlanImage,
  hasMultipleImagesOfThisType: boolean
  typeIndex: number,
  heading: string,
  environment: string,
}

export type SelectedPlanImages = Record<string, PlanImage[]>

export type SelectedAssetGroup = Record<string, PlanAsset | null>

export type SelectedPlans = Record<string, Plan>

export type SelectedAssetEnvironment = string

export type PaymentSchemeNameType = PaymentSchemeName.VISA | PaymentSchemeName.MASTERCARD | PaymentSchemeName.AMEX

export type PaymentScheme = { // This object is different depending if its a plan or merchant. Consider changing the api to be consistent
  slug?: PaymentSchemeSlug,
  count?: number,
  mids?: number,
  secondary_mids?: number,
  psimis?: number,
}

export type PlanPaymentScheme = {
  slug: PaymentSchemeSlug,
  count: number,
}

export type MerchantPaymentScheme = {
  slug: PaymentSchemeSlug,
  mids: number,
  secondary_mids: number,
  psimis: number,
}

export type DirectoryCommentSubject = {
  display_text: string,
  subject_ref: string
  icon_slug?: string
}

export type DirectoryCommentMetadata = {
  owner_ref: string,
  owner_type: CommentsOwnerTypes,
  text: string
}

export type DirectoryComment = {
  comment_ref: string,
  created_at: string,
  created_by: string,
  is_edited: boolean,
  is_deleted: boolean,
  subjects: Array<DirectoryCommentSubject>,
  metadata: DirectoryCommentMetadata,
  responses: Array<DirectoryComment>
}

export type DirectoryCommentHighLevel = {
  subject_type: CommentsSubjectTypes,
  comments: Array<DirectoryComment>
}

export type DirectoryComments = {
  entity_comments: DirectoryCommentHighLevel
  lower_comments: Array<DirectoryCommentHighLevel>,
}

export type DirectoryPlan = {
  plan_ref: string,
  plan_metadata: DirectoryPlanMetadata,
  plan_counts?: DirectoryPlanCounts | null,
  total_mid_count?: number | null,
}

export type DirectoryPlanDetails = {
  plan_ref: string,
  plan_metadata: DirectoryPlanMetadata,
  merchants: Array<DirectoryMerchant>,
}

export type DirectoryPlanMetadata = {
  name: string,
  icon_url: string | null,
  slug?:string,
  plan_id?: number | null,
}

export type DirectoryPlanCounts = {
  merchants: number,
  locations: number,
  payment_schemes: Array<PlanPaymentScheme>,
}

export type DirectorySingleMerchant = { // Matches the response from GET Merchant
  merchant_ref: string,
  plan_metadata: DirectoryPlanMetadata,
  merchant_metadata: DirectoryMerchantMetadata,
  merchant_counts: DirectorySingleMerchantCounts,
}

export type DirectoryMerchant = { // Matches the response from GET Merchants
  merchant_ref: string,
  merchant_metadata: DirectoryMerchantMetadata,
  merchant_counts: DirectoryMerchantCounts
}

export type DirectoryMerchantMetadata = {
  name: string,
  icon_url: string,
  location_label: string,
}

export type DirectoryMerchantCounts = { // The counts found in the response from GET Merchants
  locations: number,
  payment_schemes: Array<MerchantPaymentScheme>,
}

export type DirectorySingleMerchantCounts = { // The counts via the GET Merchant response
  locations: number,
  sub_locations: number,
  total_locations: number,
  payment_schemes: DirectorySingleMerchantCountsPaymentScheme[],
}

export type DirectorySingleMerchantCountsPaymentScheme = {
  slug: PaymentSchemeSlug,
  mids: number,
  secondary_mids: number,
  psimis: number,
}

export type DirectoryMidMetadata = {
  payment_scheme_slug: PaymentSchemeSlug,
  mid: string,
  visa_bin?: string,
  payment_enrolment_status?: string // TODO: could be an enum/union type
}

export type DirectoryMerchantMidLocation = {
  link_ref: string,
  location_ref: string,
  location_title: string,
}

export type DirectoryMerchantLocationMid = {
  mid_ref: string,
  mid_value: string,
  payment_scheme_slug?: PaymentSchemeSlug,
  link_ref: string,
}

export type DirectoryMerchantLocationSecondaryMid = {
  link_ref: string,
  secondary_mid_ref: string,
  secondary_mid_value: string
  payment_scheme_slug?: PaymentSchemeSlug,
}

export type DirectoryMerchantLocationAvailableMid = {
  locationLink: DirectoryMerchantMidLocation,
  mid: DirectoryMerchantLocationMid
}

export type DirectoryMerchantLocationAvailableMids = DirectoryMerchantLocationAvailableMid[]

export type DirectoryMerchantMid = {
  location: DirectoryMerchantMidLocation,
  mid: DirectoryMid
}

export type DirectoryMids = Array<DirectoryMid>

export type DirectoryMid = {
  mid_ref: string,
  mid_metadata: DirectoryMidMetadata,
  mid_status?: string
  date_added: string // TODO: Change this depending on API value
  txm_status: string // TODO: could be an enum, union type
}

export type DirectoryPsimis = Array<DirectoryPsimi>

export type DirectoryPsimi = {
  psimi_ref: string,
  psimi_metadata: DirectoryPsimiMetadata,
  psimi_status?: string, // Is only present when calling API endpoint for a single PSIMI.
  date_added: string // TODO: Change this depending on API value
  txm_status: string
}

export type DirectoryPsimiMetadata = {
  value: string,
  payment_scheme_merchant_name: string,
  payment_scheme_slug: PaymentSchemeSlug,
}

export type DirectorySecondaryMids = Array<DirectorySecondaryMid>

export type DirectorySecondaryMid = {
  secondary_mid_ref: string,
  secondary_mid_metadata: DirectorySecondaryMidMetadata,
  date_added: string // TODO: Change this depending on API value
  txm_status: string // TODO: could be an enum, union type
}

export type DirectorySecondaryMidMetadata = {
  payment_scheme_slug: PaymentSchemeSlug,
  secondary_mid: string,
  payment_scheme_store_name?: string,
  payment_enrolment_status: string // TODO: could be an enum/union type
}

export type DirectoryLocations = Array<DirectoryLocation>

export type DirectoryLocationMetadata = {
  name?: string,
  location_id: string,
  merchant_internal_id?: string,
  is_physical_location: boolean,
  address_line_1?: string,
  address_line_2?: string,
  town_city?: string,
  county?: string,
  country?: string,
  postcode: string,
}

export type DirectoryLocation = {
  isSubLocation?: boolean,
  location_ref: string,
  location_metadata: DirectoryLocationMetadata,
  location_status: string,
  date_added: string // TODO: Change this depending on API value
  payment_schemes?: Array<PaymentScheme>,
  linked_mids_count?: number,
  linked_secondary_mids_count?: number,
  sub_locations?: DirectoryLocations
}

export type DirectorySubLocation = {
  parent_location: {
    location_ref: string,
    location_title: string,
  },
  sub_location: DirectoryLocation
}

export type DirectoryEntity = DirectoryPsimi | DirectoryLocation | DirectorySubLocation | DirectoryMid | DirectoryMerchantMid | DirectorySecondaryMid

export type DirectoryEntities = Array<DirectoryEntity>

export type DirectoryMerchantEntitySelectedItem = {
  entityRef: string,
  entityValue: string,
  paymentSchemeSlug?: PaymentSchemeSlug
  entitySchemeStatus?: string
}

export type OptionsMenuItem = {
  label: string,
  icon: ReactNode,
  isRed?: boolean,
  requiredPermission?: UserPermissions,
  clickHandler: VoidFunction
}

export type OptionsMenuItems = Array<OptionsMenuItem>

export type RTKQueryErrorResponse = {
  status: string,
  data: APIErrorResponse
}

export type APIErrorResponse = {
  detail: Array<
    {
      loc: string,
      msg: string,
      type: string,
    }
  >
}

export type DirectoryMerchantDetailsTableHeader = {
  additionalStyles?: string,
  isPaymentIcon?: boolean,
  displayValue?: string
}

export type DirectoryMerchantDetailsTableCell = {
  paymentSchemeSlug?: PaymentSchemeSlug,
  physicalLocation?: {
    isPhysicalLocation: boolean
  },
  additionalStyles?: string,
  displayValue?: string
  icon?: ReactNode
}

export type AuthUser = UserProfile & {
  permissions?: Array<UserPermissions>
}

export type DecodedUserJWTToken = {
  bundle_id: string,
  user_id: string,
  sub: number,
  iat: number,
}

export type DecodedUserAuthToken = {
  iss: string,
  sub: string,
  aud: Array<string>,
  iat: number,
  exp: number,
  azp: string,
  scope: string,
  permissions?: Array<UserPermissions>
}

export type LoyaltyTransaction = {
  id: number,
  status: string,
  amounts: Array<{
    currency: string,
    suffix: string,
    value: number,
  }>,
  timestamp: number,
  description: string,
}

export type LoyaltyBalance = {
  value: number,
  prefix?: string,
  suffix: string,
  currency: string,
  updated_at: number
}

export type LoyaltyVoucher = { // TODO: May require adjustment for different voucher types
  burn: {
    type: string,
    prefix: string,
    suffix: string,
  },
  code?: string,
  earn: {
    type: string,
    value: number,
    prefix?: string,
    suffix: string,
    target_value: number,
  },
  state: string,
  headline: string
  date_issued: number,
  expiry_date: number,
  barcode_type: number,
}

export type LoyaltyCard = {
  id: number,
  membership_plan: number,
  payment_cards: Array<{
    id: number
    link_active: boolean
  }>,
  membership_transactions: Array<LoyaltyTransaction>,
  status: {
    state: string
    reason_codes: Array<string>
  }
  card: {
    membership_id: string,
    colour: string,
  },
  images: Array<PlanImage>,
  account: {
    tier: number,
  },
  balances: Array<LoyaltyBalance>,
  vouchers: Array<LoyaltyVoucher>,
}

export type PaymentCard = {
  id: number,
    membership_cards: Array<{
      id: number
      link_active: boolean
    }>,
    status: string,
    card: {
      last_four_digits: string,
      first_six_digits: string,
      month: number,
      year: number,
      country: string,
      currency_code: string,
      name_on_card: string,
      provider: string,
      issuer_name: string,
      type: string,
    },
    images: Array<PlanImage>,
    account: {
      status: number,
      verification_in_progress: boolean,
      consents: Array<{
          type: number,
          latitude: number,
          longitude: number,
          timestamp: number,
        }
      >,
    }
}

export type Service = {
  consent: {
    email: string,
    latitude: number,
    longitude: number,
    timestamp: number,
  }
}

export type LookupUserHistoryEntity = {
  user: {
    user_id: number | string,
    channel: string,
    display_text: string
  },
  lookup: {
    type: string,
    criteria: string,
    datetime: string
  }
}


// API v2 types - At some point these can exist without v2 suffix
type PaymentAccountApi2 = {
  id: number,
  provider: string,
  issuer: string,
  status: string,
  expiry_month: string,
  expiry_year: string,
  name_on_card: string,
  card_nickname: string,
  type: string,
  currency_code: string,
  country: string,
  last_four_digits: string,
  images: PlanImage[],
  pll_links: {
    loyalty_card_id: number,
    loyalty_plan: string,
    status: StatusApi2,
  }[]
}

type StatusApi2 = {
  state: string | null,
  slug: string | null,
  description: string| null,
}

export type LoyaltyVoucherApi2 = {
  barcode_type: number | null,
  body_text: string,
  conversion_date: string | null,
  current_value: string,
  earn_type: 'accumulator' | 'stamps',
  expiry_date: string | null,
  headline: string,
  issued_date: string | null,
  prefix: string | null,
  progress_display_text: string,
  redeemed_date: string | null,
  reward_text: string,
  state: 'issued' | 'pending' | 'redeemed' | 'expired' | 'inprogress' | 'cancelled',
  suffix: string | null,
  target_value: string,
  terms_and_conditions: string,
  voucher_code: string | null,
}

export type LoyaltyTransactionApi2 = {
  id: string,
  status: string,
  amounts: Array<{
    currency: string,
    prefix: string,
    value: number,
  }>,
  timestamp: number,
  description: string,
}


export type LoyaltyCardApi2 = {
  id: number,
  loyalty_plan_id: number,
  loyalty_plan_name: string,
  is_fully_pll_linked: boolean,
  pll_linked_payment_accounts: number,
  total_payment_accounts: number,
  status: StatusApi2,
  balance: {
    updated_at: number,
    current_display_value: string,
    loyalty_currency_name: string,
    prefix: string | null,
    suffix: string | null,
    current_value: string,
    target_value: string,
  }
  transactions: LoyaltyTransactionApi2[]
  vouchers: LoyaltyVoucherApi2[]
  card: {
    barcode: string | null,
    barcode_type: number | null,
    card_number: string | null,
    colour: string,
    text_colour: string | null,
  }
  reward_available: boolean,
  images: PlanImage[],
  pll_links: {
    payment_account_id: number,
    payment_scheme: string,
    status: StatusApi2,
  }[]
}


export type WalletApi2 = {
  joins: string[], // check what to expect here
  loyalty_cards: LoyaltyCardApi2[],
  payment_accounts: PaymentAccountApi2[],
} | null
