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

  it('should fetch and display all photos when you click the search button',
    () => {
      page.navigateTo();
      page.clickButtonByText('Go');
      expect(page.getNumberOfPhotos()).toEqual(20);
    });
});
