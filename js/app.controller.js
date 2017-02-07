(function() {
    'use strict';

    angular
        .module('app')
        .controller('MainController', MainController);

        function MainController() {
            var vm = this;

            vm.title = "Hello";
            vm.users = [
                {
                    name: 'Dima',
                    age: '27'
                },
                {
                    name: 'Oleg',
                    age: '27'
                },
            ];
            //vm.query = '';
            vm.user = {
                name: '',
                age: ''
            };

            vm.addUser = addUser;
            vm.search = search;

            function addUser() {
                vm.users.push(angular.copy(vm.user));

                vm.user.name = '';
                vm.user.age = '';
            }

            function search() {
                if(vm.query){
                    console.log(vm.query);
                }
            }
        }
})();