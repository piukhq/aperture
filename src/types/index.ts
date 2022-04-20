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
  devImages: PlanImage[],
  stagingImages: PlanImage[],
  balances: Array<Record<string, unknown>>
  images: Array<Record<string, unknown>>
  slug: string
}

export type AssetType = {
  heading: string
  dev: Array<PlanImage>,
  staging: Array<PlanImage>,
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
  plan_id: number,
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


