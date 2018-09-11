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

  it('should navigate between pages', () => {
    page.navigateTo();
    page.clickButtonByText('Go');
    expect(page.getNumberOfPhotos()).toEqual(10);
    expect(page.getPaginationSummaryText()).toContain('Showing 1 to 10');
    expect(page.getPaginationSummaryText()).toContain('18 photos');
    expect(page.photoByIdIsPresent('photo-10')).toBeTruthy();
    expect(page.photoByIdIsPresent('photo-11')).toBeFalsy();
    expect(page.getButtonByText('Next').getAttribute('disabled')).toBeFalsy();
    expect(page.getButtonByText('Previous').getAttribute('disabled'))
      .toBeTruthy();

    page.clickButtonByText('Next');
    expect(page.getNumberOfPhotos()).toEqual(8);
    expect(page.getPaginationSummaryText()).toContain('Showing 11 to 18');
    expect(page.photoByIdIsPresent('photo-10')).toBeFalsy();
    expect(page.photoByIdIsPresent('photo-11')).toBeTruthy();
    expect(page.getButtonByText('Next').getAttribute('disabled')).toBeTruthy();
    expect(page.getButtonByText('Previous').getAttribute('disabled'))
      .toBeFalsy();

    page.clickButtonByText('Previous');
    expect(page.getNumberOfPhotos()).toEqual(10);
    expect(page.getPaginationSummaryText()).toContain('Showing 1 to 10');
    expect(page.photoByIdIsPresent('photo-10')).toBeTruthy();
    expect(page.photoByIdIsPresent('photo-11')).toBeFalsy();
    expect(page.getButtonByText('Next').getAttribute('disabled')).toBeFalsy();
    expect(page.getButtonByText('Previous').getAttribute('disabled'))
      .toBeTruthy();
  });
});
