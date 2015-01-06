'use strict';

describe('Controller: MainCtrl', function () {

  // load the controller's module
  beforeEach(function(){
    module('mytodoApp'),
    module('LocalStorageModule')
  });

  var MainCtrl,
    scope,
    localStorageService,
    store;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope, _localStorageService_) {
    scope = $rootScope.$new();

    store = []; // clean store for each test
    localStorageService = _localStorageService_;

    spyOn(localStorageService, 'get').and.callFake(function(key) {
      return store[key];
    });
    spyOn(localStorageService, 'set').and.callFake(function(key, value){
      store[key] = value;
    });

    MainCtrl = $controller('MainCtrl', {
      $scope: scope,
      localStorageService: localStorageService
    });
  }));

  it('in the beginning, the todos list should be empty', function () {
    expect(scope.todos.length).toBe(0);
  });

  it('should add items to the list, and synch with the local storage', function(){
    scope.todo = 'Test 1';
    scope.addTodo();
    expect(scope.todos.length).toBe(1);
    expect(store['todos'].length).toBe(1);
  });

  it('should add and then remove an item and synch with the local storage', function(){
    scope.todo = 'Test 2';
    scope.addTodo();
    scope.removeTodo(0);
    expect(scope.todos.length).toBe(0);
    expect(store['todos'].length).toBe(0);
  });
});
