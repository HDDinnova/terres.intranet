angular
  .module('app')
  .controller('LayoutCtrl', Layout);

Layout.$inject = ['$mdSidenav', '$state', '$mdToast'];

function Layout($mdSidenav, $state, $mdToast, AuthenticationSvc) {
  /* jshint validthis: true */
  var vm = this;

  vm.toggleSidenav = function (menuId) {
    $mdSidenav(menuId).toggle();
  };

  vm.logOut = function () {
    AuthenticationSvc.logout();
  };

  var originatorEv;
  vm.openMenu = function ($mdOpenMenu, ev) {
    originatorEv = ev;
    $mdOpenMenu(originatorEv);
  };
}
