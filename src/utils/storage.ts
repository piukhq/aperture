const getVerificationTokenName = (isStaging) => {
  return isStaging ? 'stagingVerificationToken' : 'devVerificationToken'
}

const getVerificationToken = (isStaging:boolean) => {
  return localStorage.getItem(getVerificationTokenName(isStaging))
}

const isAnyVerificationTokenStored = () => {
  const VerificationTokens = [false, true].map(isStaging => getVerificationToken(isStaging))
  return VerificationTokens.some(token => token !== null)
}

const removeVerificationToken = (isStaging:boolean) => {
  return localStorage.removeItem(getVerificationTokenName(isStaging))
}

const storeVerificationToken = (VerificationToken: string, isStaging: boolean) => {
  if (VerificationToken !== getVerificationToken(isStaging)) {
    localStorage.setItem(getVerificationTokenName(isStaging), VerificationToken)
  }
}
export {getVerificationToken, isAnyVerificationTokenStored, storeVerificationToken, removeVerificationToken}
