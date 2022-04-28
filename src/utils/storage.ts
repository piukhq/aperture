import {VerificationToken} from 'utils/enums'

const areAnyVerificationTokensStored = () => [
  getDevVerificationToken(),
  getStagingVerificationToken(),
  getProdVerificationToken(),
].some(token => token !== null)


const getDevVerificationToken = () => localStorage.getItem(VerificationToken.DEV_VERIFICATION_TOKEN)
const removeDevVerificationToken = () => localStorage.removeItem(VerificationToken.DEV_VERIFICATION_TOKEN)
const setDevVerificationToken = (apiKey: string) => localStorage.setItem(VerificationToken.DEV_VERIFICATION_TOKEN, apiKey)

const getStagingVerificationToken = () => localStorage.getItem(VerificationToken.STAGING_VERIFICATION_TOKEN)
const removeStagingVerificationToken = () => localStorage.removeItem(VerificationToken.STAGING_VERIFICATION_TOKEN)
const setStagingVerificationToken = (apiKey: string) => localStorage.setItem(VerificationToken.STAGING_VERIFICATION_TOKEN, apiKey)

const getProdVerificationToken = () => localStorage.getItem(VerificationToken.PROD_VERIFICATION_TOKEN)
const removeProdVerificationToken = () => localStorage.removeItem(VerificationToken.PROD_VERIFICATION_TOKEN)
const setProdVerificationToken = (apiKey: string) => localStorage.setItem(VerificationToken.PROD_VERIFICATION_TOKEN, apiKey)

const getCachedPlanSlug = () => localStorage.getItem('cachedPlanSlug')
const removeCachedPlanSlug = () => localStorage.removeItem('cachedPlanSlug')
const setCachedPlanSlug = (cachedPlanSlug: string) => localStorage.setItem('cachedPlanSlug', cachedPlanSlug)

export {
  areAnyVerificationTokensStored,
  getDevVerificationToken,
  setDevVerificationToken,
  removeDevVerificationToken,
  getStagingVerificationToken,
  setStagingVerificationToken,
  removeStagingVerificationToken,
  getProdVerificationToken,
  setProdVerificationToken,
  removeProdVerificationToken,
  getCachedPlanSlug,
  removeCachedPlanSlug,
  setCachedPlanSlug,
}
