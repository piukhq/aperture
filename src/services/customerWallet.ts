import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'
import {LoyaltyCard, PaymentCard, Plan} from 'types'
import type {RootState} from 'app/store'
import {BundleID, UrlEndpoint} from 'utils/enums'
import {decodeJwtToken} from 'utils/jwtToken'

const baseQuery = fetchBaseQuery({
  baseUrl: process.env.NEXT_PUBLIC_LOYALTY_API_URL,
  prepareHeaders: (headers, {getState}) => {
    const token = (getState() as RootState).customerWallet.jwtToken
    const channel = decodeJwtToken(token)?.bundle_id
    if (token) {
      headers.set('authorization', `${channel === BundleID.BARCLAYS_BUNDLE_ID ? 'Bearer' : 'Token'} ${token}`)
      headers.set('accept', 'application/json;v=1.3')
    }
    return headers
  },
})

export const customerWalletApi = createApi({
  reducerPath: 'customerWalletApi',
  baseQuery,
  endpoints: builder => ({
    getLoyaltyCards: builder.query<LoyaltyCard[], void>({
      query: () => ({
        url: `${UrlEndpoint.UBIQUITY}/membership_cards`,
        method: 'GET',
      }),
    }),
    getPaymentCards: builder.query<PaymentCard[], void>({
      query: () => ({
        url: `${UrlEndpoint.UBIQUITY}/payment_cards`,
        method: 'GET',
      }),
    }),
    getPlans: builder.query<Plan[], void>({
      query: () => ({
        url: `${UrlEndpoint.UBIQUITY}/membership_plans`,
        method: 'GET',
      }),
    }),
  }),
})

export const {useGetLoyaltyCardsQuery, useGetPaymentCardsQuery, useGetPlansQuery} = customerWalletApi
