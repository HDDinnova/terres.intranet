angular
  .module('app')
  .config(routesConfig);

function routesConfig($stateProvider, $urlRouterProvider, $locationProvider) {
  $locationProvider.html5Mode(true);
  $urlRouterProvider.otherwise('/');

  $stateProvider
    .state('index', {
      url: '/',
      abstract: true,
      templateUrl: 'app/main.html',
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
    })
    .state('index.dashboard', {
      url: '',
      templateUrl: 'app/dashboard.html',
      controller: 'DashCtrl',
      controllerAs: 'dash'
    })
    .state('index.tourfilm', {
      url: '',
      templateUrl: 'app/tourfilm.html',
      controller: 'TourCtrl'
    })
    .state('index.documentary', {
      url: '',
      templateUrl: 'app/documentary.html',
      controller: 'DocCtrl'
    })
    .state('index.corporate', {
      url: '',
      templateUrl: 'app/corporate.html',
      controller: 'CorpCtrl'
    })
    .state('index.payment', {
      url: '',
      templateUrl: 'app/payment.html',
      controller: 'PayCtrl'
    });
}
