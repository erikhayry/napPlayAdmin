  /*      
    urls for template testing 

    idea is to be able to test each sass module, template or directive by itself using phantomCss and other css testing frameworks
    
    global routeProviderReference idea based on http://blog.brunoscopelliti.com/how-to-defer-route-definition-in-an-angularjs-web-app
    script not included in the final build using the grunt preprocess task

    in the future this should probably be moved to the other tests and not be a part of the app. Need to figure out how to

  */

  app.run(['$rootScope', '$route', '$cookieStore',function($rootScope, $route, $cookieStore) {
    
    //toggle the functionality with a cookie
    if($cookieStore.get('test') === true){     
     $routeProviderReference    
      .when('/test/template/app-nav', {
          templateUrl: 'views/test/appNav.html'
        });     
    }    
    
    $route.reload();

  }]);