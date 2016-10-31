angular
  .module('app')
  .controller('IntraCtrl', Intranet)
  .controller('LayoutCtrl', Layout);

function Intranet($scope, $window, $http) {
  var user = JSON.parse($window.sessionStorage.userInfo).id;
  $http.post('api/main',user)
  .success(function (data) {
    console.log(data);
  });
}

Layout.$inject = ['$mdSidenav', '$cookies', '$state', '$mdToast', '$mdDialog'];

function Layout($mdSidenav, $cookies, $state, $mdToast, $mdDialog) {
  /* jshint validthis: true */
  var vm = this;

  vm.toggleSidenav = function (menuId) {
    $mdSidenav(menuId).toggle();
  };

  vm.changePassword = function () {
    $mdToast.show(
      $mdToast.simple()
      .content('Password clicked!')
      .position('top right')
      .hideDelay(2000)
    );
  };

  vm.changeProfile = function (ev) {
    $mdDialog.show({
      controller: DialogController,
      templateUrl: 'tabDialog.tmpl.html',
      parent: angular.element(document.body),
      targetEvent: ev,
      clickOutsideToClose: true
    })
    .then(function (answer) {
      $mdToast.show(
        $mdToast.simple()
        .content('You said the information was "' + answer + '".')
        .position('top right')
        .hideDelay(2000)
      );
    }, function () {
      $mdToast.show(
        $mdToast.simple()
        .content('You cancelled the dialog.')
        .position('top right')
        .hideDelay(2000)
      );
    });

    function DialogController($scope, $mdDialog) {
      $scope.hide = function () {
        $mdDialog.hide();
      };

      $scope.cancel = function () {
        $mdDialog.cancel();
      };

      $scope.answer = function (answer) {
        $mdDialog.hide(answer);
      };
    }
  };

  vm.logOut = function () {
    alert('Implement your Function Here');
  };

  var originatorEv;
  vm.openMenu = function ($mdOpenMenu, ev) {
    originatorEv = ev;
    $mdOpenMenu(ev);
  };
}
