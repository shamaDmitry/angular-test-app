(function() {
    'use strict';

    angular
        .module('app')
        .controller('MainController', MainController);

        MainController.$inject = ['$uibModal', '$log', '$http', 'UserService']

        function MainController($uibModal, $log, $http, UserService) {
            var vm = this;
            var endpoint = 'https://jsonplaceholder.typicode.com';

            vm.title = "Hello";
            //vm.query = '';

            vm.user = {};
            vm.users = [];

            vm.search = search;
            vm.openModal = openModal;

            vm.addUser = addUser;
            vm.editUser = editUser;
            vm.saveUser = saveUser;
            vm.deleteUser = deleteUser;
            vm.activate = activate;

            function deleteUser(id) {
                var status = confirm('Are you sure?');
                if(status) {
                    /*$http.delete(endpoint + '/users/' + id)
                    .then(function(responce) {
                        alert(responce.status);

                        var index = _.findIndex(vm.users, function(o) {
                            return o.id == id;
                        });

                        vm.users.splice(index, 1);
                    })
                    .catch(function() {
                        var index = _.findIndex(vm.users, function(o) {
                            return o.id == id;
                        });

                        vm.users.splice(index, 1);
                    });*/

                    UserService.delete({id: id}, function() {
                        /*var index = _.findIndex(vm.users, function(o) {
                            return o.id == id;
                        });

                        vm.users.splice(index, 1);*/

                        vm.activate();
                    });
                }
            }

            function addUser(user) {

                /*$http.post(endpoint + '/users', user)
                    .then(function(responce) {
                        if(responce.status == 201) {
                            vm.users.push(responce.data);
                        }

                        vm.user.name = '';
                        vm.user.email = '';
                    });*/

                if(!vm.user.name || !vm.user.email) {
                    return false;
                }

                UserService.save(user, function() {
                    vm.user.name = '';
                    vm.user.email = '';
                },
                function(error) {
                    console.log(error);
                });
            }

            function editUser(user) {
                user.edit = true;
            }

            function saveUser(user) {
                var id = user.id;

                //$http.put(endpoint + '/users/' + id, user);

                UserService.update(id, user);
                user.edit = false;
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

            function activate() {
                /*$http
                .get(endpoint + '/users')
                .then(function(responce) {
                    vm.users = responce.data;
                })*/

                vm.users = UserService.query();
            }
        }
})();



/*angular.module('mongolabResource', [])
    .factory('mongolabResource', function ($http, MONGOLAB_CONFIG) {
        return function (collectionName) {

            // основные настройки
            var collectionUrl =
                'https://api.mongolab.com/api/1/databases/' +
                MONGOLAB_CONFIG.DB_NAME +
                '/collections/' + collectionName;

            var defaultParams = {
                apiKey: MONGOLAB_CONFIG.API_KEY
            };

            // вспомогательные методы
            var getId = function(data) {
                return data._id.$oid;
            };

            // конструктор для создания новых ресурсов
            var Resource = function(data) {
                angular.extend(this, data);
            };

            Resource.query = function(params) {
                return $http.get(collectionUrl, {
                    params:angular.extend({q:JSON.stringify({} || params)}, defaultParams)
                }).then(function (response) {
                    var result = [];
                    angular.forEach(response.data, function (value, key) {
                        result[key] = new Resource(value);
                    });
                    return result;
                });
            };

            Resource.save = function (data) {
                return $http.post(collectionUrl, data, {params:defaultParams})
                .then(function (response) {
                    return new Resource(data);
                });
            };

            Resource.prototype.$save = function (data) {
                return Resource.save(this);
            };

            Resource.remove = function (data) {
                return $http.delete(collectionUrl + '', defaultParams)
                    .then(function (response) {
                        return new Resource(data);
                });
            };

            Resource.prototype.$remove = function (data) {
                return Resource.remove(this);
            };

            // здесь находится реализация других методов CRUD
            // дополнительные методы
            Resource.prototype.$id = function () {
                return getId(this);
            };

            return Resource;
        };
    });*/











