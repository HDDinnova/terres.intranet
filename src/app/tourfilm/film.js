angular
  .module('app')
  .controller('FilmTourCtrl', FilmTourCtrl);

function FilmTourCtrl($scope, $state, $stateParams, $http, Upload) {
  $scope.isData = false;
  $scope.isUpload = false;
  $scope.film = {};
  var edited = {};
  var modified = {
    title: false,
    synopsi: false,
    short: false,
    directorPhoto: false,
    producerPhoto: false,
    screenshot1: false,
    screenshot2: false,
    screenshot3: false,
    film: false,
    travel: false,
    sports: false,
    expedition: false,
    hotels: false,
    events: false,
    health: false,
    rural: false,
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
