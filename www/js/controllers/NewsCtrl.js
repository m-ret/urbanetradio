'use strict';

angular.module('urbanet.app.controllers')

.controller('NewsCtrl', function($scope, $ionicLoading, $rootScope, $timeout, NewsFactory) {

	$scope.doRefresh = function() {
	  $ionicLoading.show({
	    template: 'Cargando noticias...<br>'+
	    					'<ion-spinner class="spinner-energized"'+
	    					'icon="android"></ion-spinner>',
	    duration: 1000
	  });
	  $scope.stories = NewsFactory.all();
    $scope.$broadcast('scroll.refreshComplete');
  };
  $scope.doRefresh();
});
