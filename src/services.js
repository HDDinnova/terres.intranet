angular
  .module('app')
  .factory('AuthenticationSvc', AuthenticationSvc);

function AuthenticationSvc($http, $q, $window) {
  var userInfo;

  function logout() {
    console.log(logout);
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
