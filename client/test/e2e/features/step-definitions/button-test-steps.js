import {client} from 'nightwatch-cucumber';
import {Given, Then, When} from 'cucumber';

Given('I open button test page', async () =>
  client
    .url(client.globals.devServerURL)
    .waitForElementVisible('#app', 5000));

When('test button is present', async () =>
  client.assert.visible('button'));

Then('button text is {string}', async text =>
  client.assert.containsText('button', text));

Then('and button is green', async () => {
  client.click('button');
  await client.assert.visible('.green');
});
