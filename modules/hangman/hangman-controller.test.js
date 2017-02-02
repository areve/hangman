const {inject, module} = angular.mock;

describe("Hangman controller", () => {
  let $compile,
    $rootScope,
    $controller,
    $httpBackend,
    controller,
    mockGetNewWord;

  beforeEach(module('hangman'));

  beforeEach(inject(function(_$compile_, _$rootScope_, _$controller_, _$httpBackend_){
    $compile = _$compile_;
    $controller = _$controller_;
    $rootScope = _$rootScope_;
    $httpBackend = _$httpBackend_;

    mockGetNewWord = {
      knownWord: '______',
      wordId: 12
    };
    controller = $controller('HangmanController');
  }));

  describe("Initialize", () => {
    it('Should show the welcome message', () => {
      expect(controller.isWelcomeShown()).toBe(true);
    });
    it('Should show the start button', () => {
      expect(controller.isGameInProgress()).toBe(false);
    });
    it('Should show in game message when no guesses have been used', () => {
      expect(controller.gameMessage()).toBe('What word is this?');
    });
    it('Should have no word id', () => {
      expect(controller._wordId).toBeFalsy();
    });
  });

  describe("Playing", () => {
    beforeEach(() => {
      $httpBackend.expectPOST('http://localhost:3000/getNewWord').respond(mockGetNewWord);
      controller.startGame();
      $httpBackend.flush();
    });
    it('Should not show the welcome message', () => {
      expect(controller.isWelcomeShown()).toBe(false);
    });
    it('Should not show the start button', () => {
      expect(controller.isGameInProgress()).toBe(true);
    });
    it('Should show in game message when no guesses have been used', () => {
      expect(controller.gameMessage()).toBe('What word is this?');
    });
    it('Should have 9 remaining guesses', () => {
      expect(controller.remainingGuessCount()).toBe(9);
    });
    it('Should say that "A" has not already been guessed', () => {
      expect(controller.isLetterUsedAlready('A')).toBe(false);
    });
    it('Should have a word id', () => {
      expect(controller._wordId).toBeTruthy();
    });
    it('Should decrement the remaining guess count when incorrect guesses are made', () => {
      $httpBackend.expectPOST('http://localhost:3000/guessLetter?usedLetters=Z&wordId=12').respond({
        correct: false,
        knownWord: '______'
      });
      controller.guess('Z');
      $httpBackend.flush();

      expect(controller.remainingGuessCount()).toBe(8);
    });
    it('Should not decrement the remaining guess count when correct guesses are made', () => {
      $httpBackend.expectPOST('http://localhost:3000/guessLetter?usedLetters=O&wordId=12').respond({
        correct: true,
        knownWord: '______'
      });
      controller.guess('O');
      $httpBackend.flush();

      expect(controller.remainingGuessCount()).toBe(9);
    });
    it('Should have a known word populated with blanks', () => {
      expect(controller.knownWord()).toBe('______');
    });
    it('Should have a known word populated with correctly guessed letters', () => {
      $httpBackend.expectPOST('http://localhost:3000/guessLetter?usedLetters=O&wordId=12').respond({
        knownWord: '_OO_A_',
        wordId: '1232314'
      });
      controller.guess('O');
      $httpBackend.flush();
      expect(controller.knownWord()).toBe('_OO_A_');
    });
    it('Should say that "A" has has been guessed after it has been tried', () => {
      const mockResponse = {
        knownWord: '_OO_A_',
        wordId: '1232314'
      };

      $httpBackend.expectPOST('http://localhost:3000/guessLetter?usedLetters=A&wordId=12').respond(mockResponse);
      controller.guess('A');
      $httpBackend.flush();

      expect(controller.isLetterUsedAlready('A')).toBe(true);
    });
    describe('Lost game', () => {
      beforeEach(() => {
        const mockResponse = {
          knownWord: '_OO_A_',
          wordId: '1232314'
        };

        $httpBackend.expectPOST('http://localhost:3000/guessLetter?usedLetters=Q&wordId=12').respond(mockResponse);
        controller.guess('Q');
        $httpBackend.flush();

        $httpBackend.expectPOST('http://localhost:3000/guessLetter?usedLetters=QW&wordId=12').respond(mockResponse);
        controller.guess('W');
        $httpBackend.flush();

        $httpBackend.expectPOST('http://localhost:3000/guessLetter?usedLetters=QWT&wordId=12').respond(mockResponse);
        controller.guess('T');
        $httpBackend.flush();

        $httpBackend.expectPOST('http://localhost:3000/guessLetter?usedLetters=QWTP&wordId=12').respond(mockResponse);
        controller.guess('P');
        $httpBackend.flush();

        $httpBackend.expectPOST('http://localhost:3000/guessLetter?usedLetters=QWTPS&wordId=12').respond(mockResponse);
        controller.guess('S');
        $httpBackend.flush();

        $httpBackend.expectPOST('http://localhost:3000/guessLetter?usedLetters=QWTPSD&wordId=12').respond(mockResponse);
        controller.guess('D');
        $httpBackend.flush();

        $httpBackend.expectPOST('http://localhost:3000/guessLetter?usedLetters=QWTPSDG&wordId=12').respond(mockResponse);
        controller.guess('G');
        $httpBackend.flush();

        $httpBackend.expectPOST('http://localhost:3000/guessLetter?usedLetters=QWTPSDGH&wordId=12').respond(mockResponse);
        controller.guess('H');
        $httpBackend.flush();

        $httpBackend.expectPOST('http://localhost:3000/guessLetter?usedLetters=QWTPSDGHJ&wordId=12').respond(mockResponse);
        controller.guess('J');
        $httpBackend.flush();
      });
      it('Should show game over message when all guesses have been used', () => {
        expect(controller.gameMessage()).toBe('Hung by the neck!');
      });
      it('Should not show the start button', () => {
        expect(controller.isGameInProgress()).toBe(false);
      });
    });
    describe('Won game', () => {
      beforeEach(() => {
        const mockResponse = {
          knownWord: 'FOOBAR',
          wordId: '1232314'
        };

        $httpBackend.expectPOST('http://localhost:3000/guessLetter?usedLetters=R&wordId=12').respond(mockResponse);
        controller.guess('R');
        $httpBackend.flush();
      });
      it('Should show game over message when all guesses have been used', () => {
        expect(controller.gameMessage()).toBe('Clever guessing, no hanging');
      });
      it('Should not show the start button', () => {
        expect(controller.isGameInProgress()).toBe(false);
      });
    });
  });

  describe("Quitting", () => {
    beforeEach(() => {
      $httpBackend.expectPOST('http://localhost:3000/getNewWord').respond(mockGetNewWord);
      controller.startGame();
      $httpBackend.flush();

      controller.quitGame();
    });
    it('Should show the welcome message', () => {
      expect(controller.isWelcomeShown()).toBe(true);
    });
    it('Should show the start button', () => {
      expect(controller.isGameInProgress()).toBe(false);
    });
  });

  describe('Second game after a game after incorrect guess is made', () => {
    beforeEach(() => {
      $httpBackend.expectPOST('http://localhost:3000/getNewWord').respond(mockGetNewWord);
      controller.startGame();
      $httpBackend.flush();

      const mockResponse = {
        knownWord: 'FOOBAR',
        wordId: '1232314'
      };

      $httpBackend.expectPOST('http://localhost:3000/guessLetter?usedLetters=Q&wordId=12').respond(mockResponse);
      controller.guess('Q');
      $httpBackend.flush();

      $httpBackend.expectPOST('http://localhost:3000/getNewWord').respond(mockGetNewWord);
      controller.startGame();
      $httpBackend.flush();
    });
    it('Should have 9 remaining guesses', () => {
      expect(controller.remainingGuessCount()).toBe(9);
    });
    it('Should say that "Q" has not already been guessed', () => {
      expect(controller.isLetterUsedAlready('Q')).toBe(false);
    });
    it('Should have a known word populated with blanks', () => {
      expect(controller.knownWord()).toBe('______');
    });
  });
});
