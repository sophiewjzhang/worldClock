'use strict';

/**
 * @ngdoc module
 * @name  application configuration and run setup
 * @description
 * worldClock is a single page application.
 */
angular
    .module('worldClock', [
        'ngRoute',
        'ngTouch',
        'ui.router'
    ])
  .config([ '$stateProvider', '$urlRouterProvider',
    function ( $stateProvider, $urlRouterProvider) {
      //Define the redirecting for all invalid urls.
       $urlRouterProvider
       .otherwise('/clock');


       $stateProvider
       .state('status', {
       name: 'status',
       url: '/status',
       templateUrl: 'views/status.html'
       })
       .state('clock', {
       name: 'clock',
       url: '/clock',
       controller: 'clockCtrl',
       templateUrl: 'views/clock.html'
       });


    }])
    .run( function ( $rootScope, $log) {
        //define a shorthand to extend a scope.
        angular.extend($rootScope.constructor.prototype, {
            $extend: function (extension) {
                angular.extend(this, extension);
                return this;
            }
        });
        $log.debug( 'App is up running!');
    });

