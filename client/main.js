/**
 * Reedsy Text Convert Machine app
 */
var RTCM_app = angular.module('RTCM_app', ['ngMaterial', 'ngResource', 'ngRoute']);

RTCM_app.controller('MainCtrl', ['$scope', '$resource', '$mdDialog', '$document',
    function ($scope, $resource, $mdDialog, $document) {

        var editor;
        var File = $resource('/files/:id', { id:'@_id' });
        refreshFiles();

        function refreshFiles() {
            $scope.files = File.query();
        }

        $scope.createFile = function (ev) {
            $mdDialog.show({
                controller: CreateFileCtrl,
                templateUrl: 'createFile.html',
                parent: angular.element($document[0].body),
                targetEvent: ev,
                fullscreen: false,
                clickOutsideToClose: false
            })
                .then(function (file) {
                    file.$save().then(refreshFiles);
                }, function () {
                    $scope.status = 'You cancelled the dialog.';
                });
        };

        $scope.deleteFile = function(file) {
            file.$delete().then(refreshFiles);
        };

        function CreateFileCtrl($scope, $mdDialog) {
            var editor;
            $scope.name = "untitled";
            $scope.hide = function () {
                $mdDialog.hide();
            };

            $scope.cancel = function () {
                $mdDialog.cancel();
            };

            $scope.save = function () {
                var newFile = new File();
                newFile.name = $scope.name;
                newFile.content = editor.getContents();
                $mdDialog.hide(newFile);
            };
            setTimeout(function () {
                editor = new Quill($document[0].querySelector('#editor'), {
                    theme: 'snow'
                });
            }, 500);

        }

    }]);
