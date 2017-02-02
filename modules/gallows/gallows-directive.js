import GallowsController from './gallows-controller';

export default function gallowsDirective() {
  return {
    restrict: "E",
    scope: {
      remaining: "@"
    },
    controller: GallowsController,
    controllerAs: 'vm',
    bindToController: true,
    template: `
      <section class="gallows">
        <progress value="{{9 - vm.remaining}}" max="9"></progress>
        <div class="svg-wrap">
          <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet">
            <line ng-show="vm.isRopeShown()" id="rope" x1="75" y1="5" x2="75" y2="25" stroke-width="2" stroke="#960" stroke-linecap="round" />
            <line ng-show="vm.isBaseShown()" id="base" x1="5" y1="95" x2="95" y2="95" stroke-width="4" stroke="black" stroke-linecap="round" />
            <line ng-show="vm.isPoleShown()" id="pole" x1="20" y1="95" x2="20" y2="5" stroke-width="4" stroke="black" stroke-linecap="round" />
            <line ng-show="vm.isBeamShown()" id="beam" x1="20" y1="5" x2="78" y2="5" stroke-width="4" stroke="black" stroke-linecap="round" />
            <line ng-show="vm.isBodyShown()" id="body" x1="75" y1="25" x2="80" y2="55" stroke-width="3" stroke="black" stroke-linecap="round" />
            <line ng-show="vm.isLeftArmShown()" id="left-arm" x1="76" y1="35" x2="70" y2="50" stroke-width="3" stroke="black" stroke-linecap="round" />
            <line ng-show="vm.isRightArmShown()" id="right-arm" x1="76" y1="35" x2="90" y2="45" stroke-width="3" stroke="black" stroke-linecap="round" />
            <line ng-show="vm.isLeftLegShown()" id="left-leg" x1="80" y1="55" x2="75" y2="85" stroke-width="3" stroke="black" stroke-linecap="round" />
            <line ng-show="vm.isRightLegShown()" id="right-leg" x1="80" y1="55" x2="90" y2="80" stroke-width="3" stroke="black" stroke-linecap="round" />
            <circle ng-show="vm.isHeadShown()" id="head" cx="80" cy="25" r="8" fill="orange" stroke="black" stroke-width="3"></circle>
          </svg>
        </div>
      </section>`
  };
}
