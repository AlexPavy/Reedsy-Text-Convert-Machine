/**
 * Reedsy Text Convert Machine app
 */
var RTCM_app = angular.module('RTCM_app', ['ngMaterial', 'ngResource', 'ngRoute', 'md.data.table']);

RTCM_app.config(['$mdThemingProvider', function ($mdThemingProvider) {
    $mdThemingProvider.theme('default').primaryPalette('blue');
}]);

RTCM_app.controller('MainCtrl', ['$scope', '$resource', '$mdDialog', '$document', '$http',
    function ($scope, $resource, $mdDialog, $document, $http) {
        var filesEndpoint = '/files';

        var editor;
        var File = $resource(filesEndpoint + '/:id', {id: '@_id'});
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

        $scope.deleteFile = function (file) {
            file.$delete().then(refreshFiles);
        };

        function CreateFileCtrl($scope, $mdDialog) {
            var editor;
            $scope.name = "";
            $scope.hide = function () {
                $mdDialog.hide();
            };

            $scope.cancel = function () {
                $mdDialog.cancel();
            };

            $scope.save = function () {
                var newFile = new File();
                newFile.name = $scope.name;
                newFile.content = editor.root.innerHTML;
                $mdDialog.hide(newFile);
            };
            setTimeout(function () {
                editor = new Quill($document[0].querySelector('#editor'), {
                    theme: 'snow'
                });
            }, 500);

        }

        $scope.limitOptions = [5, 10, 20];
        $scope.query = {
            order: 'name',
            limit: 5,
            page: 1
        };

        $scope.actionForFile = function (file, fileFormat) {
            if (file[fileFormat + "Export"] == "Done") {
                // will download
            } else {
                $http.put(filesEndpoint + '/' + file._id + '/convert', {
                    type: fileFormat
                }).then(function () {
                    file[fileFormat + "Export"] = "In progress";
                }, function () {
                    file[fileFormat + "Export"] = undefined;
                });
            }
        };

        var socket = io.connect('http://localhost:8081');
        socket.on('conversion_finished_html', function(id) {
            $scope.files.find(function(file) {
                return file._id == id;
            }).htmlExport = "Done";
            $scope.$apply();
        });
        socket.on('conversion_finished_pdf', function(id) {
            $scope.files.find(function(file) {
                return file._id == id;
            }).pdfExport = "Done";
            $scope.$apply();
        });

    }]);