import {VerificationToken} from 'utils/enums'

const areAnyVerificationTokensStored = () => [
  getDevVerificationToken(),
  getStagingVerificationToken(),
].some(token => token !== null)


const getDevVerificationToken = () => localStorage.getItem(VerificationToken.DEV_VERIFICATION_TOKEN)
const removeDevVerificationToken = () => localStorage.removeItem(VerificationToken.DEV_VERIFICATION_TOKEN)
const setDevVerificationToken = (apiKey: string) => localStorage.setItem(VerificationToken.DEV_VERIFICATION_TOKEN, apiKey)

const getStagingVerificationToken = () => localStorage.getItem(VerificationToken.STAGING_VERIFICATION_TOKEN)
const removeStagingVerificationToken = () => localStorage.removeItem(VerificationToken.STAGING_VERIFICATION_TOKEN)
const setStagingVerificationToken = (apiKey: string) => localStorage.setItem(VerificationToken.STAGING_VERIFICATION_TOKEN, apiKey)


export {
  areAnyVerificationTokensStored,
  getDevVerificationToken,
  setDevVerificationToken,
  removeDevVerificationToken,
  getStagingVerificationToken,
  setStagingVerificationToken,
  removeStagingVerificationToken,
}
