process.env.BABEL_ENV = 'test';
require('babel-register');
require('nightwatch-cucumber')({
  cucumberArgs: [
    '--format', 'snippets:test/e2e/features/undefined-steps.js',
    '--format-options', '{"snippetInterface": "async-await"}',
    '--format', 'node_modules/cucumber-pretty',
    '--format', 'json:test/e2e/reports/cucumber.json',
    '--require', 'test/e2e/features/step-definitions',
    'test/e2e/features',
  ]
});
const config = require('../../config');

// http://nightwatchjs.org/gettingstarted#settings-file
module.exports = {
  output_folder: 'test/e2e/reports',
  custom_assertions_path: ['test/e2e/custom-assertions'],

  selenium: {
    start_process: true,
    server_path: require('selenium-server').path,
    host: '127.0.0.1',
    port: 4444,
    cli_args: {
      'webdriver.chrome.driver': require('chromedriver').path
    }
  },

  test_settings: {
    default: {
      screenshots: {
        enabled: true,
        on_failure: true,
        path: 'test/e2e/reports/screenshots'
      },
      selenium_port: 4444,
      selenium_host: 'localhost',
      silent: true,
      globals: {
        devServerURL: 'http://localhost:' + (process.env.PORT || config.dev.port)
      }
    },

    chrome: {
      desiredCapabilities: {
        browserName: 'chrome',
        javascriptEnabled: true,
        acceptSslCerts: true,
        chromeOptions: {
          args: [
            '--headless'
          ]
        }
      }
    },

    firefox: {
      desiredCapabilities: {
        browserName: 'firefox',
        javascriptEnabled: true,
        acceptSslCerts: true
      }
    }
  }
}
