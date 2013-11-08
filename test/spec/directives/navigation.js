'use strict';

describe('Directive: navigation', function () {

  // load the directive's module
  beforeEach(module('napPlayAdminApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope, $templateCache, $compile) {
    $templateCache.put('templates/appNav.html', '.<template-goes-here />');
    scope = $rootScope.$new();
    element = angular.element('<ul class="m-app-nav"> <li class="m-app-nav-item"><a id="notifications-page-link" href="#/notifications">Notifications</a></li> <li class="m-app-nav-item"><a id="stats-page-link" href="#/stats">Stats</a></li> </ul>');
    element = $compile(element)(scope);
  }));

  it('should show a navigation', inject(function () {
    expect(element.text()).toBe(' Notifications Stats ');
  }));
});
