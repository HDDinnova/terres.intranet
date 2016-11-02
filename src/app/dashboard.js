angular
  .module('app')
  .controller('DashCtrl', DashCtrl);

function DashCtrl($scope, $window, $http) {
  var user = JSON.parse($window.sessionStorage.userInfo).id;
  $http.post('api/main', user)
  .success(function (data) {
    $scope.user = data.user.fullName;
    if (data.tourism) {
      $scope.tournfilms = data.tourism.nfilms;
    } else {
      $scope.tournfilms = 0;
    }
    if (data.corporate) {
      $scope.cornfilms = data.corporate.nfilms;
    } else {
      $scope.cornfilms = 0;
    }
    if (data.documentary) {
      $scope.docnfilms = data.documentary.nfilms;
    } else {
      $scope.docnfilms = 0;
    }
  });
}
