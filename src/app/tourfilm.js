angular
  .module('app')
  .controller('TourCtrl', TourCtrl);

function TourCtrl($scope, $window, $http, $state) {
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
    $http.post('api/savetourfilm', $scope.formdata)
    .success(function (data) {
      if (data.status === 200) {
        $state.reload();
      }
    });
  };

  $scope.editFilm = function (id) {
    $state.go('index.filmtour', {id: id});
  };

  $http.post('api/tourfilm', user)
  .success(function (data) {
    if (data.tourism) {
      $scope.category = true;
      $scope.nfilms = getNumber(data.tourism.nfilms);
      if (data.films) {
        if ($scope.nfilms.length > data.films.length) {
          $scope.rest = new Array($scope.nfilms.length - data.films.length);
        }
        $scope.films = true;
        $scope.filmsinfo = data.films;
      } else {
        $scope.films = false;
      }
      $scope.idcat = data.tourism.id;
    } else {
      $scope.category = false;
    }
  });

  $scope.addFilm = function () {
    $scope.data = [];
    $scope.data.push({
      user: user,
      category: 'tourism',
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
