export type Plan = {
  id: number,
  account: Record<string, string | Array<unknown>>,
  feature_set: Record<string, string | number | boolean | Array<unknown>>,
  card: Record<string, string | number>,
  uid: string,
  status: string,
  balances: Array<Record<string, unknown>>,
  images: Array<Record<string, unknown>>,
  slug: string
}
