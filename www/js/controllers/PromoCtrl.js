'use strict';

angular.module('urbanet.app.controllers')

.controller('PromosCtrl', function($scope, $ionicLoading, $timeout, PromoFactory) {
  $ionicLoading.show({
    template: 'Cargando promociones...<br>'+
              '<ion-spinner class="spinner-energized"'+
              'icon="android"></ion-spinner>',
    duration: 1000
  });
  $scope.doRefresh = function() {
    $scope.promotions = PromoFactory.all();
    $scope.$broadcast('scroll.refreshComplete');
  };
  $scope.doRefresh();
});
