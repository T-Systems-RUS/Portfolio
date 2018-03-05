var reporter = require('cucumber-html-reporter');
var fs = require('fs');

// Copy custom template to the reporter
fs.createReadStream('test/e2e/templates/custom.tmpl')
  .pipe(fs.createWriteStream('./node_modules/cucumber-html-reporter/templates/bootstrap/index.html'));

var options = {
  theme: 'bootstrap',
  jsonFile: 'test/e2e/reports/cucumber.json',
  output: 'test/e2e/reports/html/cucumber_report.html',
  reportSuiteAsScenarios: true,
  launchReport: true,
  metadata: {
    "App Version":"0.3.2",
    "Test Environment": "STAGING",
    "Browser": "Chrome  54.0.2840.98",
    "Platform": "Windows 10",
    "Parallel": "Scenarios",
    "Executed": "Remote"
  }
};

reporter.generate(options);
