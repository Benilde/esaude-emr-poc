'use strict';

angular.module('uiHelper')
    .directive('bmShow', ['$rootScope', function ($rootScope) {
    var link = function ($scope,  element, attr) {
           $scope.$watch('bmShow', function() {
            if ($rootScope.isBeingPrinted || $scope.bmShow ) {
                element.removeClass('ng-hide');
            } else {
                element.addClass('ng-hide');
            }
           })
        };

    return {
        scope:{
           bmShow:"="
        },
        link: link
    }
}]);
