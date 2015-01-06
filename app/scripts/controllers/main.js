'use strict';

/**
 * @ngdoc function
 * @name mytodoApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the mytodoApp
 */
angular.module('mytodoApp')
  .controller('MainCtrl', function ($scope, localStorageService) {
    $scope.todos = localStorageService.get('todos') || [];

    $scope.addTodo = function () {
      $scope.todos.push($scope.todo);
      $scope.todo = '';
      updateLocalStorage();
    };

    $scope.removeTodo = function (index) {
      $scope.todos.splice(index, 1);
      updateLocalStorage();
      event.preventDefault();
    };

    $scope.sortableOptions = {
      stop: function(){
        updateLocalStorage();
      }
    };

    function updateLocalStorage() {
      localStorageService.set('todos', $scope.todos);
    }
  });
