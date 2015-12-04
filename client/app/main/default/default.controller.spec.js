'use strict';

describe('Controller: DefaultCtrl', function () {

  // load the controller's module
  beforeEach(module('weebyChatApp'));

  var DefaultCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    DefaultCtrl = $controller('DefaultCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
