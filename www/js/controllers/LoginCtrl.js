'use strict';

angular.module('urbanet.app.controllers', [])

.controller("LoginCtrl", function($scope, $ionicLoading, $ionicModal,
                                  $timeout, $firebaseAuth, $state, $ionicPopup) {

  var ref = new Firebase('https://urbanetapp.firebaseio.com/'),
      auth = $firebaseAuth(ref);

  $ionicModal.fromTemplateUrl('templates/modal-login.html', function($scope, $ionicModal) {
    $scope.modal = $ionicModal;
  }, {
    id: '1',
    scope: $scope,
    backdropClickToClose: false,
    animation: 'slide-in-up'
  }).then(function(modal) {
      $scope.oModal1 = modal;
    });;

  $ionicModal.fromTemplateUrl('templates/tab-signup.html', function($scope, $ionicModal) {
    $scope.modal = $ionicModal;
  }, {
    id: '2',
    scope: $scope,
    backdropClickToClose: false,
    animation: 'slide-in-up'
  }).then(function(modal) {
      $scope.oModal2 = modal;
    });

  $scope.signUpErrorShow = false;
  $scope.signInErrorShow = false;

  $scope.openModal = function(index) {
    if(index == 1) {
     $scope.oModal1.show();
    }else {
    $scope.oModal2.show();
    }
  };

  $scope.closeModal = function(index) {
    if(index == 1) {
     $scope.oModal1.hide();
    }else {
      $scope.oModal2.hide();

    }
  };

  $scope.createUser = function(user) {
    $ionicLoading.show({
      template: 'Creando cuenta'
    });
    $scope.validationError = false;
    if (user && user.email && user.name ) {
      if (user.password === user.confirm ) {
        auth.$createUser({
          email: user.email,
          password: user.password
        }).then(function (userData) {
          ref.child("users").child(userData.uid).set({
            email: user.email,
            displayName: user.name
          });
          $ionicLoading.hide();
          $ionicPopup.show({
            template: 'Cuenta creada exitosamente',
            scope: $scope,
            buttons: [
              {
                text: 'Aceptar',
                type: 'button-positive',
                onTap: function() {
                  $state.transitionTo('tabs.news');
                }
              }
            ]
          });
        }).catch(function (error) {
            $scope.signUpErrorShow = true;
            $scope.signUpErrorMsg = 'E-mail ya esta registrado ' + error;
            $ionicLoading.hide();
        });
        $ionicLoading.hide();
        console.log('here2');
      }else {
        $ionicLoading.hide();
        $scope.signUpErrorShow = true;
        $scope.signUpErrorMsg = "Error al confirmar contraseña";
      }
    }else {
      $ionicLoading.hide();
      $scope.signUpErrorShow = true;
      $scope.signUpErrorMsg = "Falta espacio requerido";
    }
  };

  $scope.signIn = function (user) {
    $scope.signInErrorShow = false;
    if (user && user.email && user.pwdForLogin) {
      $ionicLoading.show({
        template: 'Ingresando...<br>'+
                  '<ion-spinner class="spinner-assertive"'+
                  'icon="android"></ion-spinner>',
        duration: 1000
      });
      auth.$authWithPassword({
        email: user.email,
        password: user.pwdForLogin
      }).then(function (authData) {
        console.log("Logged in as:" + authData.password.email);
        ref.child("users").child(authData.uid).once('value', function (snapshot) {
          var val = snapshot.val();
          $scope.$apply(function () {
            $rootScope.displayName = val;
          });
        });
        $scope.userLogin = true;
        $ionicLoading.hide();
        $scope.closeModal();
      }).catch(function (error) {
        $scope.signInErrorMsg = error.message;
        $scope.signInErrorShow = true;
        $ionicLoading.hide();
      });
    } else
    $scope.signInErrorShow = true;
    $scope.signInErrorMsg = 'E-mail y Contraseña son requeridos';
  };

  $scope.logOut = function() {
    console.log('login out');
    ref.unauth();
  };

});
