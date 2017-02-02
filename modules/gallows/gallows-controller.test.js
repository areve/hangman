const {inject, module} = angular.mock;

describe("Given a gallows controller", () => {
    let $compile,
      $rootScope,
      $controller,
      controller;

    beforeEach(() => {
      module('gallows');
    });

    beforeEach(inject((_$compile_, _$rootScope_, _$controller_) => {
      $compile = _$compile_;
      $controller = _$controller_;
      $rootScope = _$rootScope_;
      controller = $controller('GallowsController', {});
    }));

    it('When the controller is started only the base shows', () => {
      expect(controller.isBaseShown()).toBeTruthy();
      expect(controller.isHeadShown()).toBeFalsy();
    });

    it('When the turns remaining is 8', () => {
      controller.remaining = 8;
      expect(controller.isHeadShown()).toBeTruthy();
      expect(controller.isBodyShown()).toBeFalsy();
    });

    it('When the turns remaining is 7', () => {
      controller.remaining = 7;
      expect(controller.isBodyShown()).toBeTruthy();
      expect(controller.isLeftLegShown()).toBeFalsy();
    });

    it('When the turns remaining is 6', () => {
      controller.remaining = 6;
      expect(controller.isLeftLegShown()).toBeTruthy();
      expect(controller.isRightLegShown()).toBeFalsy();
    });

    it('When the turns remaining is 5', () => {
      controller.remaining = 5;
      expect(controller.isRightLegShown()).toBeTruthy();
      expect(controller.isLeftArmShown()).toBeFalsy();
    });

    it('When the turns remaining is 4', () => {
      controller.remaining = 4;
      expect(controller.isLeftArmShown()).toBeTruthy();
      expect(controller.isRightArmShown()).toBeFalsy();
    });

    it('When the turns remaining is 3', () => {
      controller.remaining = 3;
      expect(controller.isRightArmShown()).toBeTruthy();
      expect(controller.isPoleShown()).toBeFalsy();
    });

    it('When the turns remaining is 2', () => {
      controller.remaining = 2;
      expect(controller.isPoleShown()).toBeTruthy();
      expect(controller.isBeamShown()).toBeFalsy();
    });

    it('When the turns remaining is 1', () => {
      controller.remaining = 1;
      expect(controller.isBeamShown()).toBeTruthy();
      expect(controller.isRopeShown()).toBeFalsy();
    });

    it('When the turns remaining is 0', () => {
      controller.remaining = 0;
      expect(controller.isRopeShown()).toBeTruthy();
    });
});
