angular
  .module('app')
  .config(routesConfig);

function routesConfig($stateProvider, $urlRouterProvider, $locationProvider) {
  $locationProvider.html5Mode(true);
  $urlRouterProvider.otherwise('/');

  $stateProvider
    .state('index', {
      url: '/',
      templateUrl: 'app/main.html',
      controller: 'IntraCtrl',
      resolve: {
        auth: function ($q, AuthenticationSvc) {
          var userInfo = AuthenticationSvc.getUserInfo();
          if (userInfo) {
            return $q.when(userInfo);
          } else {
            return $q.reject({authenticated: false});
          }
        }
      }
    });
}
