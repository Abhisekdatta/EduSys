import { EduSysPage } from './app.po';

describe('edu-sys App', () => {
  let page: EduSysPage;

  beforeEach(() => {
    page = new EduSysPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
