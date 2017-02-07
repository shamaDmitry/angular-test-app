(function() {
    'use strict';

    angular
        .module('app')
        .controller('MainController', MainController);

        function MainController() {
            var vm = this;

            vm.title = "Hello";
            vm.users = [];
            vm.query = '';
            vm.userName = '';

            vm.addUser = addUser;
            vm.search = search;

            function addUser() {
                if(vm.userName) {
                    vm.users.push({name: vm.userName});
                    vm.userName = '';
                }
            }

            function search() {
                if(vm.query){
                    console.log(vm.query);
                }
            }
        }
})();