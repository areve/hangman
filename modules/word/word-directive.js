export default function wordDirective() {
  return {
    restrict: "AE",
    scope: {
      word: "@"
    },
    controller: () => {},
    controllerAs: 'vm',
    bindToController: true,
    template: `
      <section class="word">
        <p><span ng-repeat="letter in vm.word track by $index">{{letter}}</span></p>
      </section>`
  };
}
