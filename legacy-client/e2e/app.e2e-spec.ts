import {PortfolioPage} from './app.po';
import {browser, by, element} from 'protractor';

describe('portfolio App', () => {
  let page: PortfolioPage;

  beforeEach(() => {
    page = new PortfolioPage();
  });

  it('should at least 1 project', () => {
    browser.waitForAngularEnabled(false); // TODO: remove when app is optimized for e2e

    page.navigateTo();

    browser.sleep(1000); // TODO: remove when app is optimized for e2e

    expect(element.all(by.css('project-item')).count()).toBeGreaterThan(0);

    browser.waitForAngularEnabled(true); // TODO: remove when app is optimized for e2e
  });
});
