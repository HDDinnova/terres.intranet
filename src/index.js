angular
  .module('app', ['ui.router', 'ngAnimate', 'ngFileUpload', 'ngMaterial', 'ngResource', 'pascalprecht.translate', 'ngCookies', 'ngSanitize', 'ngMdIcons', 'naif.base64'])
  .config(function ($mdThemingProvider, $translateProvider) {
    $mdThemingProvider.theme('default')
      .primaryPalette('blue-grey', {
        'default': '400',
        'hue-1': '50'
      })
      .accentPalette('light-blue');
    $translateProvider
      .registerAvailableLanguageKeys(['en', 'es', 'ca'], {
        'en_*': 'en',
        'es_*': 'es',
        'ca_*': 'ca'
      })
      .determinePreferredLanguage()
      .fallbackLanguage('ca')
      .useLocalStorage()
      .useStaticFilesLoader({
        prefix: 'i18n/locale-',
        suffix: '.json'
      })
      .useSanitizeValueStrategy(null);
  })
  .run(["$rootScope", "$location", function ($rootScope, $location) {
    $rootScope.$on("$routeChangeSuccess", function (userInfo) {
      console.log(userInfo);
    });

    $rootScope.$on("$routeChangeError", function (event, current, previous, eventObj) {
      if (eventObj.authenticated === false) {
        $location.path("http://terres.info/login");
      }
    });
  }]);
