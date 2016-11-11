angular
  .module('app')
  .controller('PayCtrl', PayCtrl);

function PayCtrl($scope, $window, $http, Upload, $state) {
  var user = JSON.parse($window.sessionStorage.userInfo).id;

  $scope.upload = function (file) {
    var url = 'api/paymentproof/' + user;
    Upload.upload({
      url: url,
      data: {file: file, user: user}
    }).then(function (data) {
      if (data.status === 200) {
        $state.reload();
      }
    });
  };

  $http.post('api/payment', user)
  .success(function (data) {
    $scope.paymentproof = data.userinfo.paymentproofname;
    if (data.userinfo.payment === '1') {
      $scope.payment = true;
    } else {
      $scope.payment = false;
    }
    var corp;
    var corpfilms;
    var corpdate;
    var doc;
    var docfilms;
    var docdate;
    var tour;
    var tourfilms;
    var tourdate;
    var i;
    var j;
    var k;
    if (data.corporate) {
      corp = parseInt(data.corporate.nfilms, 10);
      if (data.corporate.films) {
        corpfilms = data.corporate.films.length;
      }
      corpdate = new Date(data.corporate.date);
    }
    if (data.documentary) {
      doc = parseInt(data.documentary.nfilms, 10);
      if (data.documentary.films) {
        docfilms = data.documentary.films.length;
      }
      docdate = new Date(data.documentary.date);
    }
    if (data.tourism) {
      tour = parseInt(data.tourism.nfilms, 10);
      if (data.tourism.films) {
        tourfilms = data.tourism.films.length;
      }
      tourdate = new Date(data.tourism.date);
    }
    var date = new Date('2017-01-15');
    var imp = 0;
    var n = 1;
    if (corp && corpfilms) {
      if (corp === corpfilms) {
        if (corpdate > date) {
          for (k = 0; k < corpfilms; k++) {
            if (n > 6) {
              imp += 45;
            } else {
              imp += 90;
            }
            n++;
          }
        } else {
          for (k = 0; k < corpfilms; k++) {
            if (n > 6) {
              imp += 30;
            } else {
              imp += 60;
            }
            n++;
          }
        }
      } else {
        console.log('falta info corporatius');
      }
    }
    if (doc && docfilms) {
      if (doc === docfilms) {
        if (docdate > date) {
          for (i = 0; i < docfilms; i++) {
            if (data.documentary.films[i].section === '1') {
              if (n <= 6) {
                imp += 90;
              } else {
                imp += 45;
              }
              n++;
            } else {
              imp += 150;
            }
          }
        } else {
          for (i = 0; i < docfilms; i++) {
            if (data.documentary.films[i].section === '1') {
              if (n <= 6) {
                imp += 60;
              } else {
                imp += 30;
              }
              n++;
            } else {
              imp += 150;
            }
          }
        }
      } else {
        console.log('falta info documentals');
      }
    }
    if (tour && tourfilms) {
      if (tour === tourfilms) {
        if (tourdate > date) {
          for (j = 0; j < tourfilms; j++) {
            if (data.tourism.films[j].section === '1') {
              if (n <= 6) {
                imp += 90;
              } else {
                imp += 45;
              }
              n++;
            } else {
              imp += 150;
            }
          }
        } else {
          for (j = 0; j < tourfilms; j++) {
            if (data.tourism.films[j].section === '1') {
              if (n <= 6) {
                imp += 60;
              } else {
                imp += 30;
              }
              n++;
            } else {
              imp += 150;
            }
          }
        }
      } else {
        console.log('falta info turístics');
      }
    }

    $scope.amount = imp;
  });
}
