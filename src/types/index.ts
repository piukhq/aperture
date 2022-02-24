type PlanImage = {
  type: number,
  url: string,
}

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
}
