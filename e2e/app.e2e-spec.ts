import { AngularBulmaPage } from './app.po';

describe('angular-bulma App', () => {
  let page: AngularBulmaPage;

  beforeEach(() => {
    page = new AngularBulmaPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
