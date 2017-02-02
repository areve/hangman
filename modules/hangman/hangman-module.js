import '../gallows/gallows-module';
import '../word/word-module';
import '../letter/letter-module';
import HangmanController from './hangman-controller';
import hangmanDirective from './hangman-directive';
import hangmanService from './hangman-service';

angular
  .module('hangman', ['gallows', 'word', 'letter', 'ngResource', 'ngAnimate'])
  .controller("HangmanController", HangmanController)
  .directive("appHangman", hangmanDirective)
  .factory("hangmanService", hangmanService);

