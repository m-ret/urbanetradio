'use strict';

angular.module('urbanet.app.controllers')

.controller('NewsCtrl', function($scope, $ionicLoading, $stateParams, FreshlyPressed) {
  $scope.posts = [];

  $ionicLoading.show({
    template: 'Cargando Noticias...<br>'+
              '<ion-spinner class="spinner-energized"'+
              'icon="android"></ion-spinner>'
  });

  $scope.doRefresh = function() {
    FreshlyPressed.getBlogs().success(function(blogs) {
      $scope.posts = blogs;
      $scope.$broadcast('scroll.refreshComplete');
      $ionicLoading.hide();
    }).error(function() {
      $ionicLoading.hide();
      console.log('error');
    });
  }
  $scope.doRefresh();
});
