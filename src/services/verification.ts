import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'
import {Url, ClientID, BundleID} from 'utils/enums'

type VerificationBody = {
  email: string,
  password: string,
}

type VerificationResponse = {
  email: string,
  api_key: string,
  uid: string,
}

// Define a service using a base URL and expected endpoints
export const devLoginApi = createApi({
  reducerPath: 'devLoginApi',
  baseQuery: fetchBaseQuery({baseUrl: Url.DEV_BASE_URL}),
  endpoints: builder => ({
    verifyDevCredentials: builder.query<VerificationResponse, VerificationBody>({
      query: ({email, password}) => ({
        url: 'users/login',
        method: 'POST',
        body: {
          email,
          password,
          client_id: ClientID.DEV_CLIENT_ID,
          bundle_id: BundleID.DEV_BUNDLE_ID,
        },
      }),
    }),
  }),
})

export const stagingLoginApi = createApi({
  reducerPath: 'stagingLoginApi',
  baseQuery: fetchBaseQuery({baseUrl: Url.STAGING_BASE_URL}),
  endpoints: builder => ({
    verifyStagingCredentials: builder.query<VerificationResponse, VerificationBody>({
      query: ({email, password}) => ({
        url: 'users/login',
        method: 'POST',
        body: {
          email,
          password,
          client_id: ClientID.STAGING_CLIENT_ID,
          bundle_id: BundleID.STAGING_BUNDLE_ID,
        },
      }),
    }),
  }),
})


// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {useVerifyDevCredentialsQuery} = devLoginApi
export const {useVerifyStagingCredentialsQuery} = stagingLoginApi
