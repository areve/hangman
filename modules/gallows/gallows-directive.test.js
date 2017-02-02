const {inject, module} = angular.mock;

describe("Given a gallows directive", () => {
    let $compile, $rootScope;

    beforeEach(module('gallows'));

    beforeEach(inject((_$compile_, _$rootScope_) => {
      $compile = _$compile_;
      $rootScope = _$rootScope_;
    }));

    it('When loaded with Then HTML is initalized', () => {
      let element = $compile('<app-gallows></app-gallows>')($rootScope);
      $rootScope.$digest();
      expect(element.html()).toContain('<progress');
    });
});
