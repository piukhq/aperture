import {ReactNode} from 'react'
import {PaymentSchemeName} from 'utils/enums'

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
  slug: string
}

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
  cta_url: string,
}

export type PlanAsset = { // Plan Image with additional metadata used for Asset Modal
  image: PlanImage,
  hasMultipleImagesOfThisType: boolean
  typeIndex: number,
  heading: string,
  environment: string,
}

export type SelectedPlanImages = Record<string, PlanImage[]>

export type SelectedAssetGroup = Record<string, PlanAsset>

export type SelectedAssetEnvironment = string

export type PaymentSchemeNameType = PaymentSchemeName.VISA | PaymentSchemeName.MASTERCARD | PaymentSchemeName.AMEX

export type PaymentScheme = {
  label: string,
  scheme_code: number,
  count: number,
}

export type DirectoryPlan = {
  plan_ref: string,
  plan_metadata: DirectoryPlanMetadata,
  plan_counts: DirectoryPlanCounts
}

export type DirectoryPlanDetails = {
  plan_ref: string,
  plan_metadata: DirectoryPlanMetadata,
  merchants: Array<DirectoryMerchantDetails>,
}

export type DirectoryPlanMetadata = {
  name: string,
  icon_url: string,
  slug?:string,
  plan_id?: number,
}

export type DirectoryPlanCounts = {
  merchants: number,
  locations: number,
  payment_schemes: Array<PaymentScheme>,
}

export type DirectoryMerchantDetails = {
  merchant: DirectoryMerchant,
}

export type DirectoryMerchant = {
  merchant_ref: string,
  merchant_metadata: DirectoryMerchantMetadata,
  merchant_counts: DirectoryMerchantCounts
}

export type DirectoryMerchantMetadata = {
  name: string,
  icon_url: string,
  location_label: string,
}

export type DirectoryMerchantCounts = {
  locations: number,
  payment_schemes: Array<PaymentScheme>,
}

export type DirectoryMids = Array<DirectoryMid>

export type DirectoryMid = {
  mid_ref: string,
  mid_metadata: {
    payment_scheme_code: number,
    mid: string,
    visa_bin?: string,
    payment_enrolment_status: string // TODO: could be an enum/union type
  },
  date_added: string // TODO: Change this depending on API value
  txm_status: string // TODO: could be an enum, union type
}

export type DirectoryIdentifiers = Array<DirectoryIdentifier>

export type DirectoryIdentifier = {
  identifier_ref: string,
  identifier_metadata: {
    value: string,
    payment_scheme_merchant_name: string,
    payment_scheme_code: number
  },
  date_added: string // TODO: Change this depending on API value
}

export type DirectorySecondaryMids = Array<DirectorySecondaryMid>

export type DirectorySecondaryMid = {
  secondary_mid_ref: string,
  secondary_mid_metadata: {
    payment_scheme_code: number,
    secondary_mid: string,
    payment_scheme_store_name: string,
    payment_enrolment_status: string // TODO: could be an enum/union type
  },
  date_added: string // TODO: Change this depending on API value
  txm_status: string // TODO: could be an enum, union type
}

export type DirectoryLocations = Array<DirectoryLocation>

export type DirectoryLocation = {
  name: string,
  location_ref: string,
  location_id: string,
  merchant_internal_id: string,
  is_physical_location: boolean,
  address_line_1: string,
  town_city: string,
  postcode: string,
  date_added: string // TODO: Change this depending on API value
  payment_schemes: Array<PaymentScheme>
}

export type OptionsMenuItem = {
  label: string,
  icon: ReactNode,
  isRed?: boolean,
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
