export default class GallowsController {
  constructor($interval) {}

  isBaseShown() { return true; }
  isHeadShown() { return this.remaining < 9; }
  isBodyShown() { return this.remaining < 8; }
  isLeftLegShown() { return this.remaining < 7; }
  isRightLegShown() { return this.remaining < 6; }
  isLeftArmShown() { return this.remaining < 5; }
  isRightArmShown() { return this.remaining < 4; }
  isPoleShown() { return this.remaining < 3; }
  isBeamShown() { return this.remaining < 2; }
  isRopeShown() { return this.remaining < 1; }
}

GallowsController.$inject = [];

