export type Plan = {
  id: number,
  account: Record<string, string | Array<unknown>>,
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

export type PlanImage = {
  id: number,
  type: number,
  url: string,
  encoding: string,
  description: string,
  cta_url: string,
}

export type SelectedPlanAssets = Record<string, PlanImage[]>

export type SelectedPlanAssetGroup = Array<Record<string, unknown>>
