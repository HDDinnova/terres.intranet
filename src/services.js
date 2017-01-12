angular
  .module('app')
  .directive('paypal', [function () {
    return {
      scope: {},
      link: function ($scope, element) {
        $scope.$on(
          "paypalAmount",
          function handlePingEvent(event, amount) {
            var scriptElem = angular.element(document.createElement('script'));
            scriptElem.attr({
              src: 'https://www.paypalobjects.com/js/external/paypal-button.min.js?merchant=info@filmsnomades.com',
              'data-button': 'buynow',
              'data-name': 'terres Catalunya fee',
              'data-amount': amount,
              'data-currency': 'EUR',
              'data-tax': (amount * 0.21),
              'data-callback': 'http://terres.info/intranet/paymentok'
            });
            element.append(scriptElem);
          }
        );
      }
    };
  }])
  .factory('AuthenticationSvc', AuthenticationSvc);

function AuthenticationSvc($http, $q, $window) {
  var userInfo;

  function logout() {
    console.log('logout');
    $window.sessionStorage.userInfo = null;
    $window.location.href = '/login';
  }

  function getUserInfo() {
    return userInfo;
  }

  function init() {
    if ($window.sessionStorage.userInfo) {
      userInfo = JSON.parse($window.sessionStorage.userInfo);
    }
  }
  init();

  return {
    logout: logout,
    getUserInfo: getUserInfo
  };
}
