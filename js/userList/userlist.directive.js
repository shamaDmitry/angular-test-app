(function() {
    'use strict';

    angular
        .module('app')
        .directive('userList', userList);

        function userList() {
            var directive = {
                link: link,
                templateUrl: '/js/userList/userlist.html',
                restrict: 'EA',
                scope: {
                    users: '='
                },
                controller: UserListController,
                controllerAs: 'vm',
                bindToController: true
            };

            return directive;

            function link(scope, element, attrs) {
                console.log('scope', scope);
                console.log('element', element);
                console.log('attrs', attrs);
            }

            function UserListController() {
                var vm = this;
            }
        }

})();