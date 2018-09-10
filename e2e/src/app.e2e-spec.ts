import { AppPage } from './app.po';

describe('workspace-project App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should display correct heading', () => {
    page.navigateTo();
    expect(page.getHeadingText()).toEqual('Photo Search');
  });

  it('should display just 10 photos per page from the search by default',
    () => {
      page.navigateTo();
      page.clickButtonByText('Go');
      expect(page.getNumberOfPhotos()).toEqual(10);
    });
});
