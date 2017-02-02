const {inject, module} = angular.mock;

describe("Given a letter directive", () => {
    let $compile, $rootScope;

    beforeEach(module('letter'));

    beforeEach(inject((_$compile_, _$rootScope_) => {
      $compile = _$compile_;
      $rootScope = _$rootScope_;
    }));

    it('When loaded with Then HTML is initalized', () => {
      let element = $compile('<app-letter></app-letter>')($rootScope);
      $rootScope.$digest();
      expect(element.html()).toContain('>M</button>');
    });
});
