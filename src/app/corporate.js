angular
  .module('app')
  .controller('CorpCtrl', CorpCtrl);

function CorpCtrl($scope, $window, $http, $state) {
  var user = JSON.parse($window.sessionStorage.userInfo).id;
  $scope.formdata = {};
  $scope.category = false;
  $scope.films = false;
  $scope.idcat = 0;
  $scope.filmsinfo = {};
  var getNumber = function (num) {
    num = parseInt(num, 10);
    return new Array(num);
  };

  $scope.saveFilm = function () {
    $scope.formdata.idcat = $scope.idcat;
    $http.post('api/savecorpfilm', $scope.formdata)
    .success(function (data) {
      if (data.status === 200) {
        $state.reload();
      }
    });
  };

  $http.post('api/corporate', user)
  .success(function (data) {
    if (data.corporate) {
      $scope.category = true;
      $scope.nfilms = getNumber(data.corporate.nfilms);
      if (data.films) {
        if ($scope.nfilms.length > data.films.length) {
          $scope.rest = new Array($scope.nfilms.length - data.films.length);
        }
        $scope.films = true;
        $scope.filmsinfo = data.films;
      } else {
        $scope.films = false;
      }
      $scope.idcat = data.corporate.id;
    } else {
      $scope.category = false;
    }
  });

  $scope.addFilm = function () {
    $scope.data = [];
    $scope.data.push({
      user: user,
      category: 'corporate',
      nfilms: $scope.form.nfilms
    });
    $http.post('api/addfilm', $scope.data)
    .success(function (data) {
      if (data.status === 200) {
        $state.reload();
      }
    });
  };
}
