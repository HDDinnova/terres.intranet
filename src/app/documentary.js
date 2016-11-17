angular
  .module('app')
  .controller('DocCtrl', DocCtrl);

function DocCtrl($scope, $window, $http, $state) {
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
    $http.post('api/savedocfilm', $scope.formdata)
    .success(function (data) {
      if (data.status === 200) {
        $state.reload();
      }
    });
  };

  $scope.editFilm = function (id) {
    $state.go('index.filmdoc', {id: id});
  };

  $http.post('api/docfilm', user)
  .success(function (data) {
    if (data.documentary) {
      $scope.category = true;
      $scope.nfilms = getNumber(data.documentary.nfilms);
      if (data.films) {
        if ($scope.nfilms.length > data.films.length) {
          $scope.rest = new Array($scope.nfilms.length - data.films.length);
        }
        $scope.films = true;
        $scope.filmsinfo = data.films;
      } else {
        $scope.films = false;
      }
      $scope.idcat = data.documentary.id;
      if (data.payment === '0') {
        $scope.payment = false;
      } else {
        $scope.payment = true;
      }
    } else {
      $scope.category = false;
    }
  });

  $scope.addFilm = function () {
    $scope.data = [];
    $scope.data.push({
      user: user,
      category: 'documentary',
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
