import type {NextPage} from 'next'
import {withPageAuthRequired} from '@auth0/nextjs-auth0'
import {PageNotFound} from 'components'


const Custom404: NextPage = withPageAuthRequired(() => (
  <PageNotFound />
))

export default Custom404
