(function() {
    'use strict';

    angular.module('app')
    .factory('UserService', UserService);

    UserService.$inject = ['$resource'];

    function UserService($resource) {
        var UserService = $resource('https://jsonplaceholder.typicode.com/users/:id',
        {id: '@id'},
        {
            update: {
                method: 'PUT'
            },
        });

        return UserService;
    }

})();