import { browser, by, element } from 'protractor';

export class AppPage {
  navigateTo() {
    return browser.get('/');
  }

  clickButtonByText(text) {
    return this.getButtonByText(text).click();
  }

  getButtonByText(text) {
    return element(by.buttonText(text));
  }

  getNumberOfPhotos() {
    return element.all(by.css('.photo')).then(items => items.length);
  }

  getHeadingText() {
    return element(by.css('app-root h1')).getText();
  }

  getPaginationSummaryText() {
    return element(by.css('app-pagination .summary')).getText();
  }

  photoByIdIsPresent(photoId) {
    return element(by.css(`app-photo-collection #${photoId}`)).isPresent();
  }
}
