// simple test to check the title and heading h2 of the browser
describe('frodocms landing page', function() {  
  it('should check title of loaded landing page', function() {
    browser.get('https://frodocms.herokuapp.com/');
    expect(browser.getTitle()).toEqual('Frodocms');
  });
}); 
