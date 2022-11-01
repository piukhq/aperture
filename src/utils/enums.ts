enum Url {
  DEV_BASE_URL = 'https://api.dev.gb.bink.com/',
  STAGING_BASE_URL = 'https://api.staging.gb.bink.com/',
  PROD_BASE_URL = 'https://api.gb.bink.com/',
}

enum ApiReflectorUrl {
  REFLECTOR_URL = 'https://reflector.dev.gb.bink.com/mock/',
}

enum UrlEndpoint {
  UBIQUITY = '/ubiquity',
  USERS = '/users',
  PLANS = '/api/v1/plans',
  COMMENTS = '/api/v1/directory_comments',
}

enum ClientID {
  DEV_CLIENT_ID = 'kudr77sTA0t5cvleNquOFUMHl68NMcqoCqRWrjlc3ZO60NFI3s',
  STAGING_CLIENT_ID = 'joqEeXTSKaWTj9rdifFRtbIJD7vWN2YaueJ4zfOnEEO5dPoqcg',
  PROD_CLIENT_ID = 'igvAWkhM3FbmdjX7Cx09Oa5QGFtmo1KVWDnHyO5LI7kCiaP4g1',
}

enum BundleID {
  BINK_INTERNAL_BUNDLE_ID = 'com.bink.portal.internal',
  BINK_WALLET_BUNDLE_ID = 'com.bink.wallet',
  BARCLAYS_BUNDLE_ID = 'com.barclays.bmb',
}

enum VerificationToken {
  DEV_VERIFICATION_TOKEN = 'devVerificationToken',
  STAGING_VERIFICATION_TOKEN = 'stagingVerificationToken',
  PROD_VERIFICATION_TOKEN = 'prodVerificationToken',
}

enum EnvironmentName {
  DEV = 'Development',
  STAGING = 'Staging',
  SANDBOX = 'Sandbox',
  PROD = 'Production',
}

enum EnvironmentShortName {
  DEV = 'dev',
  STAGING = 'staging',
  SANDBOX = 'sandbox',
  PROD = 'prod',
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

const DirectorySingleViewEntities = {
  'mids': 'MID',
  'locations': 'Location',
  'secondary-mids': 'Secondary MID',
  'psimis': 'PSIMI',
}

enum DirectorySingleViewTabs {
  DETAILS = 'Details',
  MIDS = 'MIDs',
  SECONDARY_MIDS = 'Secondary MIDs',
  COMMENTS = 'Comments',
  LOCATIONS = 'Locations'
}

enum DirectoryNavigationTab {
  MIDS = 'mids',
  LOCATIONS = 'locations',
  SECONDARY_MIDS ='secondary-mids',
  PSIMIS ='psimis'
}

enum RouteDisplayNames {
  'asset-comparator' = 'Asset Comparator',
  'plan-comparator' = 'Plan Comparator',
  'mid-management' = 'MID Management',
  'customer-wallets' = 'Customer Wallets',
  'style-guide' = 'Style Guide',
}

enum ModalType {
  NO_MODAL = 'NO_MODAL',
  LOGOUT = 'LOGOUT',
  ASSET_COMPARATOR_CREDENTIALS = 'ASSET_COMPARATOR_CREDENTIALS',
  ASSET_COMPARATOR_ASSET = 'ASSET_COMPARATOR_ASSET',
  MID_MANAGEMENT_DIRECTORY_PLAN = 'MID_MANAGEMENT_DIRECTORY_PLAN',
  MID_MANAGEMENT_DIRECTORY_PLAN_DELETE = 'MID_MANAGEMENT_DIRECTORY_PLAN_DELETE',
  MID_MANAGEMENT_DIRECTORY_MERCHANT = 'MID_MANAGEMENT_DIRECTORY_MERCHANT',
  MID_MANAGEMENT_DIRECTORY_MERCHANT_DELETE = 'MID_MANAGEMENT_DIRECTORY_MERCHANT_DELETE',
  MID_MANAGEMENT_DIRECTORY_MID = 'MID_MANAGEMENT_DIRECTORY_MID',
  MID_MANAGEMENT_DIRECTORY_MIDS_DELETE = 'MID_MANAGEMENT_DIRECTORY_MIDS_DELETE',
  MID_MANAGEMENT_DIRECTORY_SECONDARY_MIDS_DELETE = 'MID_MANAGEMENT_DIRECTORY_SECONDARY_MIDS_DELETE',
  MID_MANAGEMENT_DIRECTORY_LOCATIONS_DELETE = 'MID_MANAGEMENT_DIRECTORY_LOCATIONS_DELETE',
  MID_MANAGEMENT_DIRECTORY_PSIMIS_DELETE = 'MID_MANAGEMENT_DIRECTORY_PSIMIS_DELETE',
  MID_MANAGEMENT_DIRECTORY_SINGLE_VIEW = 'MID_MANAGEMENT_DIRECTORY_SINGLE_VIEW',
  MID_MANAGEMENT_COMMENTS = 'MID_MANAGEMENT_COMMENTS',
  MID_MANAGEMENT_BULK_COMMENT = 'MID_MANAGEMENT_BULK_COMMENT'
}

enum ModalStyle {
  WIDE = 'wide',
  CENTERED_HEADING = 'centredHeading',
  COMPACT = 'compact'
}

enum PaymentSchemeName {
  VISA = 'VISA',
  MASTERCARD = 'Mastercard',
  AMEX = 'AMEX'
}

enum PaymentSchemeSlug {
  VISA = 'visa',
  MASTERCARD = 'mastercard',
  AMEX = 'amex'
}

enum LinkableEntities {
  MID = 'MID',
  SECONDARY_MID = 'Secondary MID',
  LOCATION = 'Location'
}

enum DirectoryTxmStatus {
  ONBOARDED = 'onboarded',
  NOT_ONBOARDED = 'not_onboarded',
  ONBOARDING = 'onboarding',
  OFFBOARDING = 'offboarding',
  OFFBOARDED = 'offboarded',
}

enum DirectoryTxmStatusDisplayValue {
  'onboarded' = 'Onboarded',
  'not_onboarded'= 'Not Onboarded',
  'onboarding'= 'Onboarding',
  'offboarding'= 'Offboarding',
  'offboarded'= 'Offboarded',
}

enum CommentsOwnerTypes {
  PLAN = 'plan',
  MERCHANT = 'merchant',
}

enum CommentsSubjectTypes {
  PLAN = 'plan',
  MERCHANT = 'merchant',
  MID = 'mid',
  LOCATION = 'location',
  SECONDARY_MID = 'secondary_mid',
  PSIMI = 'psimi',
}

export {
  Url,
  ApiReflectorUrl,
  UrlEndpoint,
  ClientID,
  BundleID,
  VerificationToken,
  EnvironmentName,
  EnvironmentShortName,
  ImageTypes,
  RouteDisplayNames,
  ModalType,
  ModalStyle,
  DirectoryNavigationTab,
  PaymentSchemeName,
  PaymentSchemeSlug,
  DirectorySingleViewEntities,
  DirectorySingleViewTabs,
  LinkableEntities,
  DirectoryTxmStatus,
  DirectoryTxmStatusDisplayValue,
  CommentsOwnerTypes,
  CommentsSubjectTypes,
}
