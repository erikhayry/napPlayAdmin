  /*      
    urls for template testing 
    
    global routeProviderReference idea based on http://blog.brunoscopelliti.com/how-to-defer-route-definition-in-an-angularjs-web-app
    script not included in the final build using the grunt preprocess task  
  */

  app.run(['$rootScope', '$route', '$cookieStore',function($rootScope, $route, $cookieStore) {
    
    //toggle the functionality with a cookie
    if($cookieStore.get('test') === true){
     $routeProviderReference    
      .when('/test/', {
          templateUrl: 'templates/test.html'
          //need a controller to add dummy data
        });     
    }    
    
    $route.reload();

  }]);