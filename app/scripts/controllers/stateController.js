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
