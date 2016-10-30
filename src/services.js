angular
  .module('app')
  .factory('AuthenticationSvc', AuthenticationSvc);

function AuthenticationSvc($http, $q, $window) {
  var userInfo;

  function logout() {
    var deferred = $q.defer();

    $http({
      method: "POST",
      url: "/api/logout",
      headers: {
        accessToken: userInfo.accessToken
      }
    }).then(function (result) {
      userInfo = null;
      $window.sessionStorage.userInfo = null;
      deferred.resolve(result);
    }, function (error) {
      deferred.reject(error);
    });

    return deferred.promise;
  }

  function getUserInfo() {
    return userInfo;
  }

  function init() {
    $window.sessionStorage.userInfo = '{"status":200,"message":"Login successful","id":"b088afbd10d116593082c299d4d841dd"}';
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
