'use strict';

angular.module('urbanet.app.directives', [])

.directive('audioPlay', function() {
  return {
    restrict: 'E',
    link: function(scope, element, attr) {

      scope.playOrPause = true;

      var player = element.children('.player')[0];

      scope.playMusic = function() {
        scope.playOrPause = false;
        player.play();
      }

      scope.stopMusic = function() {
        scope.playOrPause = true;
        player.pause();
      }

      scope.changeVolume = function(event) {
        player.volume = scope.volume;
      }

    }
  };
});
