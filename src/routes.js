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
            console.log(userInfo);
          } else {
            window.location = "http://terres.info/login";
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
    })
    .state('index.filmtour', {
      url: '',
      params: {
        id: null
      },
      templateUrl: 'app/tourfilm/film.html',
      controller: 'FilmTourCtrl'
    })
    .state('index.filmcorp', {
      url: '',
      params: {
        id: null
      },
      templateUrl: 'app/corpfilm/film.html',
      controller: 'FilmCorpCtrl'
    })
    .state('index.filmdoc', {
      url: '',
      params: {
        id: null
      },
      templateUrl: 'app/docfilm/film.html',
      controller: 'FilmDocCtrl'
    });
}
