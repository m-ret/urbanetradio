'use strict';

angular.module('urbanet.app.controllers')

.controller('NewsCtrl', function($scope, $timeout, FreshlyPressed) {

  $scope.doRefresh = function() {
    FreshlyPressed.getBlogs($scope);
    $scope.$broadcast('scroll.refreshComplete');
  };
  $scope.doRefresh();

});
