const {inject, module} = angular.mock;

describe("Given a word directive", () => {
    let $compile, $rootScope;

    beforeEach(module('word'));

    beforeEach(inject((_$compile_, _$rootScope_) => {
      $compile = _$compile_;
      $rootScope = _$rootScope_;
    }));

    it('When loaded Then HTML is initialized', () => {
      let element = $compile('<app-word></app-word>')($rootScope);
      $rootScope.$digest();
      expect(element.html()).toContain('<section class="word">');
    });
});
