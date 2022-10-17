import {useCallback, useEffect, useState} from 'react'
import type {NextPage} from 'next'
import Image from 'next/image'
import {ContentTile, PageLayout} from 'components'
import {withPageAuthRequired} from '@auth0/nextjs-auth0'

const PlanComparatorPage: NextPage = withPageAuthRequired(() => {
  return (
    <>
      {modalRequested === ModalType.ASSET_COMPARATOR_CREDENTIALS && <CredentialsModal removeTokenHandler={handleTokenRemoval} />}
      {modalRequested === ModalType.ASSET_COMPARATOR_ASSET && <AssetModal />}
      <PageLayout>
        <div data-testid='header' className='flex gap-[20px] h-[40px] justify-end'>
          {renderHeaderTools()}
        </div>
        <ContentTile>
          {determineContentToRender()}
        </ContentTile>
      </PageLayout>
    </>
  )
})

export default AssetComparatorPage
