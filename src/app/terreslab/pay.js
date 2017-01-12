angular
  .module('app')
  .controller('tlPayCtrl', tlPayCtrl);

function tlPayCtrl($window, $http) {
  var user = JSON.parse($window.sessionStorage.userInfo).id;
  var url = 'api/tlpayment/' + user;
  $http.post(url)
  .success(function (data) {
    console.log(data);
  });
}
