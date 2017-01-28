/**
 * Reedsy Text Convert Machine app
 */
var RTCM_app = angular.module( 'RTCM_app', [ 'ngMaterial' ] );

RTCM_app.controller('MainCtrl', ['$scope', function($scope) {
    $scope.greeting = 'Hola!';
}]);