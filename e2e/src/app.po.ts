import { browser, by, element } from 'protractor';

export class AppPage {
  navigateTo() {
    return browser.get('/');
  }

  clickButtonByText(text) {
    return element(by.buttonText(text)).click();
  }

  getNumberOfPhotos() {
    return element.all(by.css('.photo')).then(items => items.length);
  }

  getHeadingText() {
    return element(by.css('app-root h1')).getText();
  }

  photoByIdIsPresent(photoId) {
    return element(by.css(`app-photo-collection #${photoId}`)).isPresent();
  }
}
