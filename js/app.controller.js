(function() {
    'use strict';

    angular
        .module('app')
        .controller('MainController', MainController);

        MainController.$inject = ['$uibModal', '$log']

        function MainController($uibModal, $log) {
            var vm = this;

            vm.title = "Hello";
            vm.query = '';
            vm.users = [
                {
                    name: 'Dima',
                    age: 27,
                    edit: false,
                    id:1
                },
                {
                    name: 'Oleg',
                    age: 33,
                    edit: false,
                    id:2
                },
            ];
            vm.user = {
                name: '',
                age: '',
                edit: false
            };

            vm.addUser = addUser;
            vm.search = search;
            vm.editUser = editUser;
            vm.saveUser = saveUser;
            vm.openModal = openModal;

            function addUser() {
                vm.users.push(angular.copy(vm.user));

                vm.user.name = '';
                vm.user.age = '';
            }

            function editUser(user) {
                user.edit = true;
                console.log(user);

            }

            function saveUser(user) {
                user.edit = false;
                console.log(user);
            }

            function search() {
                if(vm.query){
                    console.log(vm.query);
                }
            }

            function openModal(user) {
                var modalInstance = $uibModal.open({
                    animation: true,
                    controller: 'ModalController',
                    controllerAs: 'modal',
                    templateUrl: 'templates/modal.html',
                    //templateUrl: 'myModalContent.html',
                    //windowTemplateUrl: 'myModalContent.html',
                    //bindToController: true,
                    //windowTemplateUrl: 'templates/modal.html',
                    resolve: {
                        user: function() {
                            return user;
                        }
                    }
                });

                modalInstance.result
                .then(
                    function(result) {
                        var index = _.findIndex(vm.users, function(o) {
                            return o.id == result.id;
                        });

                        vm.users.splice(index, 1, result);
                    },

                    function () {
                        $log.info('modal-component dismissed at: ' + new Date());
                    }
                );
            }
        }
})();