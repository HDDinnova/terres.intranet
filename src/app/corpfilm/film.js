angular
  .module('app')
  .controller('FilmCorpCtrl', FilmCorpCtrl);

function FilmCorpCtrl($scope, $state, $stateParams, $http, Upload) {
  $scope.max = 3;
  $scope.isData = false;
  $scope.isUpload = false;
  $scope.film = {};
  var edited = {};
  var modified = {
    id: false,
    title: false,
    synopsi: false,
    short: false,
    directorPhoto: false,
    producerPhoto: false,
    screenshot1: false,
    screenshot2: false,
    screenshot3: false,
    film: false,
    category: false
  };
  $scope.film.modified = modified;
  $http.get('api/film/corporatefilms/' + $stateParams.id)
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
    $http.post('api/film/addcorporate/', edited)
    .success(function (data) {
      if (data.status === 200) {
        $state.reload();
      }
      console.log(data);
    });
  };

  $scope.del = function (field) {
    $scope.film.modified[field] = true;
    $scope.film.formdata[field] = "";
    $scope.modifyFilm();
  };

  $scope.upload = function (file) {
    var url = 'api/uploadFilm/corporatefilms/' + $scope.film.formdata.id;
    Upload.upload({
      url: url,
      data: {file: file}
    }).then(function (data) {
      $scope.isUpload = true;
      if (data.status === 200) {
        $state.reload();
      }
    });
  };
}
