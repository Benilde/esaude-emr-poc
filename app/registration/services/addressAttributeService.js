'use strict';

angular.module('registration')
    .factory('addressAttributeService', ['$http', function ($http) {
        var search = function(fieldName, query, parentField, parentName){
            var url = "/openmrs/module/addresshierarchy/ajax/getPossibleAddressHierarchyEntriesWithParents.form";

            return $http.get(url, {
                method: "GET",
                params: {searchString: query, addressField: fieldName ,parentField: parentField, parentName: parentName, limit: defaults.maxAutocompleteResults},
                withCredentials: true
            });
        }

        return{
            search : search
        };
    }]);
