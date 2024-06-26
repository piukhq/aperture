enum Admin {
  EMAIL = 'cmorrow@bink.com',
  FIRST_NAME = 'Chris'
}

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
  USER_LOOKUP = '/api/v1/customer_wallet/user_lookups',
  CSV_UPLOAD = '/api/v1/plans/csv_upload',
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
  PROD = 'Production',
}

enum EnvironmentShortName {
  DEV = 'dev',
  STAGING = 'staging',
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
  SUB_LOCATIONS = 'Sub-Locations',
  COMMENTS = 'Comments',
  LOCATIONS = 'Locations'
}

enum DirectoryNavigationTab {
  MIDS = 'mids',
  LOCATIONS = 'locations',
  SECONDARY_MIDS = 'secondary-mids',
  PSIMIS = 'psimis'
}

enum RouteDisplayNames {
  'mid-management' = 'MID Directory',
  'asset-comparator' = 'Asset Comparator',
  'plan-comparator' = 'Plan Comparator',
  // 'customer-wallets' = 'Customer Wallets', // TODO: Uncomment this when the Customer Wallets page is ready.
  // 'bank-viewport' = 'Bank Viewport',
}

enum BulkActionButtonStyle {
  HARMONIA = 'HARMONIA',
  COMMENT = 'COMMENT',
  DELETE = 'DELETE',
}

enum ModalType {
  NO_MODAL = 'NO_MODAL',
  LOGOUT = 'LOGOUT',
  ASSET_COMPARATOR_CREDENTIALS = 'ASSET_COMPARATOR_CREDENTIALS',
  ASSET_COMPARATOR_ASSET = 'ASSET_COMPARATOR_ASSET',
  MID_MANAGEMENT_DIRECTORY_PLAN = 'MID_MANAGEMENT_DIRECTORY_PLAN',
  MID_MANAGEMENT_SCHEME_STATUS = 'MID_MANAGEMENT_SCHEME_STATUS',
  MID_MANAGEMENT_DIRECTORY_PLAN_DELETE = 'MID_MANAGEMENT_DIRECTORY_PLAN_DELETE',
  MID_MANAGEMENT_DIRECTORY_MERCHANT = 'MID_MANAGEMENT_DIRECTORY_MERCHANT',
  MID_MANAGEMENT_DIRECTORY_MERCHANT_DELETE = 'MID_MANAGEMENT_DIRECTORY_MERCHANT_DELETE',
  MID_MANAGEMENT_DIRECTORY_MID = 'MID_MANAGEMENT_DIRECTORY_MID',
  MID_MANAGEMENT_DIRECTORY_SECONDARY_MID = 'MID_MANAGEMENT_DIRECTORY_SECONDARY_MID',
  MID_MANAGEMENT_DIRECTORY_LOCATION = 'MID_MANAGEMENT_DIRECTORY_LOCATION',
  MID_MANAGEMENT_DIRECTORY_PSIMI = 'MID_MANAGEMENT_DIRECTORY_PSIMI',
  MID_MANAGEMENT_DIRECTORY_MIDS_DELETE = 'MID_MANAGEMENT_DIRECTORY_MIDS_DELETE',
  MID_MANAGEMENT_DIRECTORY_SECONDARY_MIDS_DELETE = 'MID_MANAGEMENT_DIRECTORY_SECONDARY_MIDS_DELETE',
  MID_MANAGEMENT_DIRECTORY_LOCATIONS_DELETE = 'MID_MANAGEMENT_DIRECTORY_LOCATIONS_DELETE',
  MID_MANAGEMENT_DIRECTORY_PSIMIS_DELETE = 'MID_MANAGEMENT_DIRECTORY_PSIMIS_DELETE',
  MID_MANAGEMENT_DIRECTORY_SINGLE_VIEW = 'MID_MANAGEMENT_DIRECTORY_SINGLE_VIEW',
  MID_MANAGEMENT_DIRECTORY_PLAN_FILE_UPLOAD = 'MID_MANAGEMENT_DIRECTORY_PLAN_FILE_UPLOAD',
  MID_MANAGEMENT_DIRECTORY_MERCHANT_FILE_UPLOAD = 'MID_MANAGEMENT_DIRECTORY_MERCHANT_FILE_UPLOAD',
  MID_MANAGEMENT_COMMENTS = 'MID_MANAGEMENT_COMMENTS',
  MID_MANAGEMENT_BULK_COMMENT = 'MID_MANAGEMENT_BULK_COMMENT',
  MID_MANAGEMENT_BULK_HARMONIA = 'MID_MANAGEMENT_BULK_HARMONIA',
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
  'not_onboarded' = 'Not Onboarded',
  'onboarding' = 'Onboarding',
  'offboarding' = 'Offboarding',
  'offboarded' = 'Offboarded',
}

enum PaymentSchemeStatus {
  UNKNOWN = 'unknown',
  ENROLLING = 'enrolling',
  ENROLLED = 'enrolled',
  NOT_ENROLLED = 'not_enrolled',
  REMOVED = 'removed',
  FAILED = 'failed',
}

enum PaymentSchemeStatusDisplayValue {
  'unknown' = 'Unknown',
  'enrolling' = 'Enrolling',
  'enrolled' = 'Enrolled',
  'not_enrolled' = 'Not Enrolled',
  'removed' = 'Removed',
  'failed' = 'Failed',
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

enum UserPermissions {
  MERCHANT_DATA_READ_ONLY = 'merchant_data:ro',
  MERCHANT_DATA_READ_WRITE = 'merchant_data:rw',
  MERCHANT_DATA_READ_WRITE_DELETE = 'merchant_data:rwd',
  CUSTOMER_WALLET_READ_ONLY = 'customer_wallet:ro',
  CUSTOMER_WALLET_READ_WRITE = 'customer_wallet:rw',
  CUSTOMER_WALLET_READ_WRITE_DELETE = 'customer_wallet:rwd',
}

enum PlanCategory {
  ACCOUNT = 'account',
  BALANCES = 'balances',
  CARD = 'card',
  CONTENT = 'content',
  FEATURE_SET = 'feature_set',
  IMAGES = 'images',
}

enum HarmoniaActionTypes {
  ONBOARD = 'onboard',
  OFFBOARD = 'offboard',
  UPDATE = 'update',
  NONE = '',
}

export {
  Admin,
  Url,
  ApiReflectorUrl,
  UrlEndpoint,
  BulkActionButtonStyle,
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
  PaymentSchemeStatus,
  PaymentSchemeStatusDisplayValue,
  CommentsOwnerTypes,
  CommentsSubjectTypes,
  UserPermissions,
  PlanCategory,
  HarmoniaActionTypes,
}
