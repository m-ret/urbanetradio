'use strict';

angular.module('urbanet.app.controllers')

.controller('NewsCtrl', function($scope,
                                 $ionicLoading,
                                 FreshlyPressed, $stateParams) {

  $scope.posts = [];

  $scope.doRefresh = function() {
    $scope.posts = FreshlyPressed.getBlogs($scope);
    $scope.$broadcast('scroll.refreshComplete');
  }
  $scope.doRefresh();

});
