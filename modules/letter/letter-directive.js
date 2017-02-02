export default function letterDirective() {
  return {
    restrict: "AE",
    scope: {
      isLetterUsedAlready: "&",
      guess: "&"
    },
    controller: () => {},
    controllerAs: 'vm',
    bindToController: true,
    template: `
      <section class="letter">
        <button type="button" ng-click="vm.guess({letter: letter})"
          class="letter_{{letter}}"
          ng-repeat="letter in 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'"
          ng-disabled="vm.isLetterUsedAlready({letter: letter})">{{letter}}</button>
      </section>`
  };
}
