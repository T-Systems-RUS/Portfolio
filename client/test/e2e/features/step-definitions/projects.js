import {client} from 'nightwatch-cucumber';
import {Given, Then} from 'cucumber';

Given('I open project page', async () =>
  client
    .url(client.globals.devServerURL)
    .waitForElementVisible('#app', 5000));

Then('project is present', async () =>
  client.waitForElementVisible('.project-card', 5000));
