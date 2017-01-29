/**
 * Reedsy Text Convert Machine app
 */
var RTCM_app = angular.module('RTCM_app', ['ngMaterial', 'ngResource']);

RTCM_app.controller('MainCtrl', ['$scope', '$resource',
    function ($scope, $resource) {

        var editor;
        var filesResource = $resource('/files/:id');
        $scope.files = filesResource.query();

        $scope.createFile = function (ev) {
            editor = new Quill('#editor', {
                theme: 'snow'
            });
            $mdDialog.show({
                controller: CreateFileCtrl,
                templateUrl: 'createFile.html',
                parent: angular.element(document.body),
                targetEvent: ev,
                clickOutsideToClose: true,
                fullscreen: false
            })
                .then(function (answer) {
                    $scope.status = 'You said the information was "' + answer + '".';
                }, function () {
                    $scope.status = 'You cancelled the dialog.';
                });
        };

        function CreateFileCtrl($scope, $mdDialog) {
            $scope.hide = function () {
                $mdDialog.hide();
            };

            $scope.cancel = function () {
                $mdDialog.cancel();
            };

            $scope.answer = function (answer) {
                $mdDialog.hide(answer);
            };
        }

    }]);
