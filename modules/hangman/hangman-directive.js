import HangmanController from './hangman-controller';

export default function hangmanDirective() {
  return {
    restrict: "E",
    scope: {},
    controller: HangmanController,
    controllerAs: 'vm',
    bindToController: true,
    template: `
      <nav>
        <button type="button" ng-click="vm.startGame()" class="start-button"
          ng-show="!vm.isGameInProgress()">Start Game</button>
        <button type="button" ng-click="vm.quitGame()" ng-show="vm.isGameInProgress()">Quit Game</button>
      </nav>
      <section class="messages">
        <p class="welcome-message" ng-show="vm.isWelcomeShown()">Hangman</p>
        <p class="game-message" ng-show="vm.gameMessage() && !vm.isWelcomeShown()">{{vm.gameMessage()}}</p>
      </section>
      <section class="play-area">
        <app-gallows remaining="{{vm.remainingGuessCount()}}"></app-gallows>
        <app-word ng-show="vm.isGameInProgress()" word="{{vm.knownWord()}}"></app-word>
        <app-letter ng-show="vm.isGameInProgress()"
          is-letter-used-already="vm.isLetterUsedAlready(letter)"
          guess="vm.guess(letter)"></app-letter>
        <button type="button" ng-click="vm.startGame()" class="start-button"
            ng-show="!vm.isGameInProgress()">Start Game</button>
      </section>
    `
  };
}
