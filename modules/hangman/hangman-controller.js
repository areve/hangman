
export default class HangmanController {
  constructor(hangmanService) {
    this._isWelcomeShown = true;
    this._remainingGuessCount = 0;
    this._usedLetters = '';
    this._hangmanService = hangmanService;
  }

  isWelcomeShown() {
    return this._isWelcomeShown;
  }

  startGame() {
    this._remainingGuessCount = 9;
    this._usedLetters = '';
    this._hangmanService.getNewWord({}, {}, ({ knownWord, wordId }) => {
      console.log('d');
      this._knownWord = knownWord;
      this._wordId = wordId;
      this._isWelcomeShown = false;
    },
    () => {
      alert('Could not connect to the hangman server, check README.md');
    });
  }

  quitGame() {
    this._isWelcomeShown = true;
  }

  knownWord() {
    return this._knownWord;
  }

  remainingGuessCount() {
    return this._remainingGuessCount;
  }

  guess(letter) {
    this._usedLetters += letter;
    this._hangmanService.guessLetter({
      wordId: this._wordId,
      usedLetters: this._usedLetters
    }, {}, ({correct, knownWord}) => {
      if (!correct) this._remainingGuessCount--;
      this._knownWord = knownWord;
    });
  }

  isLetterUsedAlready(letter) {
    return this._usedLetters.toUpperCase().indexOf(letter.toUpperCase()) !== -1;
  }

  gameMessage() {
    if (!this._isWelcomeShown) {
      if (!this.remainingGuessCount()) return 'Hung by the neck!';
      if (this._wordIsKnown()) return 'Clever guessing, no hanging';
    }
    return 'What word is this?';
  }

  isGameInProgress() {
    return !!this._remainingGuessCount && !this._wordIsKnown() && !this._isWelcomeShown;
  }

  _wordIsKnown() {
    return (this.knownWord() || '_').indexOf('_') === -1;
  }
}

HangmanController.$inject = ['hangmanService'];
