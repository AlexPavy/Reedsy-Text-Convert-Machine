RTCM_app.directive('downloadFile', function ($compile) {
    return {
        restrict: 'E',
        scope: {
            id: '=',
            name: '=',
            type: '='
        },
        link: function (scope, elm) {
            elm.append($compile(
                '<a class="btn" download="' + scope.name + '.' + scope.type + '" ' +
                'href="/converted-files/' + scope.type + '/' + scope.id + '.' + scope.type + '">' +
                '<md-icon md-svg-src="img/ic_file_download_black_24px.svg" aria-label="Download">' +
                '</md-icon>' +
                '</a>'
            )(scope));
        }
    };
});