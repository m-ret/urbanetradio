// Ionic Starter backButton.text
// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('urbanet.app', ['ionic',
                               'firebase',
                               'ngCookies',
                               'urbanet.app.directives',
                               'urbanet.app.controllers',
                               'urbanet.app.service',
                               'urbanet.app.services'])

// do all the things ionic needs to get going
.run(function($ionicPlatform) {
  var ref = new Firebase("https://urbanetapp.firebaseio.com");
    $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider, $ionicConfigProvider) {

  $ionicConfigProvider.navBar.alignTitle('center');
  $ionicConfigProvider.tabs.position('bottom');
  $ionicConfigProvider.backButton.text('');

  $stateProvider

    .state('tabs', {
      url: "/tabs",
      abstract: true,
      templateUrl: "templates/tabs.html"
    })

    .state('tabs.news', {
        url: '/news',
        views: {
          'tab-news': {
            templateUrl: 'templates/tab-news.html',
            controller: 'NewsCtrl'
          }
        }
      })

    .state('tabs.post-detail', {
      url: '/news/:postId',
      views: {
        'tab-news': {
          templateUrl: 'templates/tab-post-detail.html',
          controller: 'PostDetailCtrl'
        }
      }
    })

    .state('tabs.promotions', {
      url: '/promotions',
      views: {
        'tab-promotions': {
          templateUrl: 'templates/tab-promotions.html',
          controller: 'PromosCtrl'
        }
      }
    })

    .state('tabs.promo-detail', {
      url: '/promotions/:promotionsId',
      views: {
        'tab-promotions': {
          templateUrl: 'templates/tab-promo-detail.html',
          controller: 'PromoDetailCtrl'
        }
      }
    })

    // .state('tabs.sign-signup', {
    //   url: '/signup',
    //   views: {
    //     'signup': {
    //       templateUrl: 'templates/tab-signup.html',
    //       controller: 'LoginCtrl'
    //     }
    //   }
    // })

    .state('tabs.admin-accnt', {
      url: '/admin-accnt',
      views: {
        'admin-accnt': {
          templateUrl: 'templates/tab-admin-account.html',
          controller: 'LoginCtrl'
        }
      }
    })

    .state('tabs.about-us', {
      url: '/about-us',
      views: {
        'about-us': {
          templateUrl: 'templates/tab-about.html',
          controller: 'AboutCtrl'
        }
      }
    });

  $urlRouterProvider.otherwise('/tabs/news');

})

.run(function($http) {
  $http.defaults.headers.common.Accept = 'application/json, text/html',
  'Acess-Allow-Control-Origin: *';
});

