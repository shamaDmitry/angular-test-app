(function() {
    'use strict';

    angular
        .module('app')
        .config(Router);

        Router.$inject = ['$stateProvider', '$urlRouterProvider'];

        function Router($stateProvider, $urlRouterProvider) {
            $urlRouterProvider.when("", "/");

            $urlRouterProvider.otherwise("/");

            $stateProvider
            .state('landing', {
                abstract: true,
                templateUrl: 'templates/landing/index.html'
            })
            .state('landing.main', {
                url: '/',
                templateUrl: 'templates/landing/main.html'
            })
            .state('landing.about', {
                url: '/about',
                templateUrl: 'templates/landing/about.html'
            })

            .state('dashboard', {
                abstract: true,
                templateUrl: 'templates/dashboard/index.html'
            })
            .state('dashboard.main', {
                templateUrl: 'templates/dashboard/main.html'
            })
        }

})();