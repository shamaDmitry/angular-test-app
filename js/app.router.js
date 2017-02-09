(function() {
    'use strict';

    angular
        .module('app')
        .config(router);

        router.$inject = ['$stateProvider', '$urlProvider'];

        function router($stateProvider, $urlProvider) {
            $stateProvider
            .state('home', {
                url: '/' ,
                templateUrl: 'templates/home.html',
                controller: MainController,
                controllerAs: main
            })
        }

})();