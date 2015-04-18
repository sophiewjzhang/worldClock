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


'use strict';

/**
 * @ngdoc controller
 * @name clockCtrl
 * @description
 */
angular.module('worldClock')
  .controller('clockCtrl', ['$rootScope', '$scope', '$timeout', '$filter', function ($rootScope, $scope, $timeout, $filter) {

    $scope.$extend({
      zoneDiffs:[],
      inputTime:null,
      tickInterval:1000,
      timeToronto: new Date(2015, 4, 18, 16, 25, 51),
      otherCities: [{
        name: 'London',
        timeDifference: -6,
        time:null
      },
      {
        name: 'Sydney',
        timeDifference: -13,
        time:null
      }
      ],
      setTime: function(){

      },
      setOtherCityTimes: function(city){
        city.time = new Date($scope.timeToronto.getTime() + city.timeDifference * 3600 * 1000);
      },
      tick:function(){
        $scope.timeToronto = new Date( $scope.timeToronto.getTime() + $scope.tickInterval);
        $scope.updateTimes();
        $timeout( $scope.tick, $scope.tickInterval );
      },
      updateTimes: function(){
        for( var i= 0, l= $scope.otherCities.length; i<l;i++){
          $scope.setOtherCityTimes($scope.otherCities[i]);
        }
      }
    });
    for( var i= 1, l=24; i< l; i++){
      $scope.zoneDiffs.push(i);
      $scope.zoneDiffs.push(-i);
    }
    $scope.zoneDiffs.sort(function(a,b){return a-b;});
    $scope.updateTimes();
    $scope.tick();
  }]);
