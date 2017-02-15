(function() {
    'use strict';

    angular
        .module('app')
        .controller('UserListController', UserListController);

        UserListController.$inject = ['UserService']

        function UserListController(UserService) {
            var vm = this;

            vm.title = "List of user";
            vm.users = [];

            vm.activate = activate;

            activate();
            function activate() {
                return vm.users = UserService.query();
            }
        }
})();