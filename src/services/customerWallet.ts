import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'
import {LoyaltyCard, PaymentCard, Plan} from 'types'
import type {RootState} from 'app/store'

const endpointPrefix = '/ubiquity'


const baseQuery = fetchBaseQuery({
  baseUrl: process.env.NEXT_PUBLIC_LOYALTY_API_URL,
  prepareHeaders: (headers, {getState}) => {
    const token = (getState() as RootState).customerWallet.jwtToken

    console.log('token is ' + token)
    // If we have a token set in state, let's assume that we should be passing it.
    if (token) {
      headers.set('authorization', `Token ${token}`)
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
        url: `${endpointPrefix}/membership_cards`,
        method: 'GET',
      }),
    }),
    getPaymentCards: builder.query<PaymentCard[], void>({
      query: () => ({
        url: `${endpointPrefix}/payment_cards`,
        method: 'GET',
      }),
    }),
    getPlans: builder.query<Plan[], void>({
      query: () => ({
        url: `${endpointPrefix}/membership_plans`,
        method: 'GET',
      }),
    }),
  }),
})

export const {useGetLoyaltyCardsQuery, useGetPaymentCardsQuery, useGetPlansQuery} = customerWalletApi
