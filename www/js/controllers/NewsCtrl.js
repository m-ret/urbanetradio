'use strict';

angular.module('urbanet.app.controllers')

.controller('NewsCtrl', function($scope, $ionicLoading, $stateParams, FreshlyPressed) {

  $ionicLoading.show({
    template: 'Cargando Noticias...<br>'+
              '<ion-spinner class="spinner-energized"'+
              'icon="android"></ion-spinner>',
    duration: 1000
  });

  $scope.doRefresh = function() {
    $scope.posts = FreshlyPressed.getBlogs($scope);
    $scope.$broadcast('scroll.refreshComplete');
  }
  $scope.doRefresh();

});
