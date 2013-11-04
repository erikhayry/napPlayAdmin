describe('angularjs homepage', function() {
  it('should greet the named user', function() {
    browser.get('http://127.0.0.1:9000/#/notifications');

    var greeting = element(by.binding('pageName'));

    expect(greeting.getText()).toEqual('Notification Page');
  });
});