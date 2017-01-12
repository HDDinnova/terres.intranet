angular
  .module('app')
  .controller('FilmTourCtrl', FilmTourCtrl);

function FilmTourCtrl($scope, $state, $stateParams, $http, Upload) {
  $scope.max = 3;
  $scope.checked = 0;
  $scope.isData = false;
  $scope.isUpload = false;
  $scope.film = {};
  $scope.checkChanged = function (item) {
    if (item === '1') {
      ++$scope.checked;
    } else {
      --$scope.checked;
    }
  };
  var edited = {};
  var modified = {
    id: false,
    title: false,
    synopsi: false,
    director: false,
    producer: false,
    screenshot1: false,
    screenshot2: false,
    screenshot3: false,
    film: false,
    travel: false,
    cultural: false,
    sports: false,
    expedition: false,
    hotels: false,
    events: false,
    health: false,
    rural: false,
    naturaltour: false,
    enotourism: false,
    destinations: false,
    animation: false
  };
  $scope.film.modified = modified;
  $http.get('api/film/tourismfilms/' + $stateParams.id)
  .success(function (data) {
    $scope.film.formdata = data;
    $scope.isData = true;
    $scope.urlfilm = 'film/' + $scope.film.formdata.film;
    if ($scope.film.formdata.travel === '1') {
      ++$scope.checked;
    }
    if ($scope.film.formdata.sports === '1') {
      ++$scope.checked;
    }
    if ($scope.film.formdata.expedition === '1') {
      ++$scope.checked;
    }
    if ($scope.film.formdata.hotels === '1') {
      ++$scope.checked;
    }
    if ($scope.film.formdata.events === '1') {
      ++$scope.checked;
    }
    if ($scope.film.formdata.health === '1') {
      ++$scope.checked;
    }
    if ($scope.film.formdata.enotourism === '1') {
      ++$scope.checked;
    }
    if ($scope.film.formdata.destinations === '1') {
      ++$scope.checked;
    }
    if ($scope.film.formdata.animation === '1') {
      ++$scope.checked;
    }
    if ($scope.film.formdata.rural === '1') {
      ++$scope.checked;
    }
    if ($scope.film.formdata.cultural === '1') {
      ++$scope.checked;
    }
    if ($scope.film.formdata.naturaltour === '1') {
      ++$scope.checked;
    }
  });

  $scope.modifyFilm = function () {
    $scope.isUpload = true;
    edited.id = $scope.film.formdata.id;
    angular.forEach($scope.film.modified, function (value, key) {
      if (value) {
        edited[key] = $scope.film.formdata[key];
      }
    });
    $http.post('api/film/addtourism/', edited)
    .success(function (data) {
      if (data.status === 200) {
        $state.reload();
      }
    });
  };

  $scope.del = function (field) {
    $scope.film.modified[field] = true;
    $scope.film.formdata[field] = "";
    $scope.modifyFilm();
  };

  $scope.upload = function (file) {
    var url = 'api/uploadFilm/tourismfilms/' + $scope.film.formdata.id;
    Upload.upload({
      url: url,
      data: {file: file}
    }).then(function (data) {
      if (data.status === 200) {
        $state.reload();
      }
    });
  };
}
