const Encore = require('@symfony/webpack-encore');
const dotenv = require('dotenv');

if (!Encore.isRuntimeEnvironmentConfigured()) {
  Encore.configureRuntimeEnvironment(process.env.NODE_ENV || 'dev');
}

Encore
  .setOutputPath('public/build/')
  .setPublicPath('/build')
  .addEntry('app', './assets/js/app.js')
  .splitEntryChunks()
  .enableSassLoader()
  .enableSingleRuntimeChunk()
  .cleanupOutputBeforeBuild()
  .enableBuildNotifications()
  .enableSourceMaps(!Encore.isProduction())
  .enableVersioning()
  .configureBabelPresetEnv((config) => {
    config.useBuiltIns = 'usage';
    config.corejs = 3;
  })
  .configureDefinePlugin(options => {
    const env = dotenv.config();

    if (env.error) {
      throw env.error;
    }

    options['process.env'].APP_WS_PORT = JSON.stringify(env.parsed.APP_WS_PORT);
    options['process.env'].APP_WS_HOST = JSON.stringify(env.parsed.APP_WS_HOST);
  })

module.exports = Encore.getWebpackConfig();
