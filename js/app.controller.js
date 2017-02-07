(function() {
    'use strict';

    angular
        .module('app')
        .controller('MainController', MainController);

        function MainController() {
            var vm = this;

            vm.title = "Hello";
            vm.users = [];
            vm.userName = '';

            vm.addUser = addUser;

            function addUser(name) {
                if(name) {
                    vm.users.push(name);
                    vm.userName = '';
                }
            }
        }
})();