// eslint-disable-next-line @typescript-eslint/no-var-requires
const {withSentryConfig} = require('@sentry/nextjs')

const moduleExports = {
  webpack (config) {
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: ['@svgr/webpack'],
    })

    return config
  },
  images: {
    domains: ['api.dev.gb.bink.com', 'api.staging.gb.bink.com', 'api.gb.bink.com'],
  },
  i18n: {
    locales: ['en'],
    defaultLocale: 'en',
  },
}

const sentryWebpackPluginOptions = {
  // Additional config options for the Sentry Webpack plugin. Keep in mind that
  // the following options are set automatically, and overriding them is not
  // recommended:
  //   release, url, org, project, authToken, configFile, stripPrefix,
  //   urlPrefix, include, ignore
  silent: true, // Suppresses all logs
  // For all available options, see:
  // https://github.com/getsentry/sentry-webpack-plugin#options.
}

// Make sure adding Sentry options is the last code to run before exporting, to
// ensure that your source maps include changes from all other Webpack plugins
module.exports = withSentryConfig(moduleExports, sentryWebpackPluginOptions)
