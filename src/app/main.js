angular
  .module('app')
  .controller('LayoutCtrl', Layout);

Layout.$inject = ['$mdSidenav', '$state', '$mdToast', '$translate', '$rootScope'];

function Layout($mdSidenav, $state, $mdToast, $translate, $rootScope, AuthenticationSvc) {
  /* jshint validthis: true */
  var vm = this;

  vm.langs = [
    'CA',
    'ES',
    'EN'
  ];

  vm.setLang = function (lng) {
    var id = lng.toLowerCase();
    $translate.use(id);
    $rootScope.$broadcast('langChange', id);
  };

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
