(function() {
    'use strict';

    angular
        .module('app')
        .controller('UserController', UserController);

        UserController.$inject = ['$stateParams', 'UserService']

        function UserController($stateParams, UserService) {
            var vm = this;
            var id = $stateParams.id;

            vm.title = '';
            vm.user = [];

            vm.getUser = getUser;


            getUser();
            function getUser() {
                vm.user = UserService.get({id: id}, function(responce) {
                    vm.title = responce.name;
                });
            }
        }
})();