(function() {
    'use strict';

    angular
        .module('app')
        .controller('ModalController', ModalController);

        ModalController.$inject = ['$uibModalInstance', 'user'];

        function ModalController($uibModalInstance, user) {
            var vm = this;

            vm.user = angular.copy(user);

            vm.ok = ok;
            vm.cancel = cancel;

            function ok() {
                $uibModalInstance.close({
                    name: vm.user.name,
                    age: vm.user.age,
                    id: vm.user.id
                });
            }

            function cancel() {
                console.log('cancel');
            }

            console.log(vm);
        }
})();