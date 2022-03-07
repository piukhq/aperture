enum Url {
  DEV_BASE_URL = 'https://api.dev.gb.bink.com/',
  STAGING_BASE_URL = 'https://api.staging.gb.bink.com/',
}

enum ClientID {
  DEV_CLIENT_ID = 'kudr77sTA0t5cvleNquOFUMHl68NMcqoCqRWrjlc3ZO60NFI3s',
  STAGING_CLIENT_ID = 'joqEeXTSKaWTj9rdifFRtbIJD7vWN2YaueJ4zfOnEEO5dPoqcg',
}

enum BundleID {
  DEV_BUNDLE_ID = 'com.bink.portal.internal',
  STAGING_BUNDLE_ID = 'com.bink.portal.internal',
}

enum VerificationToken {
  DEV_VERIFICATION_TOKEN = 'devVerificationToken',
  STAGING_VERIFICATION_TOKEN = 'stagingVerificationToken',
}

enum EnvironmentName {
  DEV = 'Development',
  STAGING = 'Staging',
  SANDBOX = 'Sandbox',
  PROD = 'Production',
}

enum ImageTypes {
  HERO = 0,
  BANNER = 1,
  OFFER = 2,
  ICON = 3,
  ASSET = 4,
  REFERENCE = 5,
  PERSONAL_OFFERS = 6,
  PROMOTIONS = 7,
  TIER = 8,
  ALTERNATIVE = 9
}

export {Url, ClientID, BundleID, VerificationToken, EnvironmentName, ImageTypes}
