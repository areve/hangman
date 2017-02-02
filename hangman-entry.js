import angular from 'angular';
import 'angular-animate';
import './modules/hangman/hangman-module';

require("style!css!sass!import-glob!./modules/hangman/hangman.scss");
document.write(require('raw!./modules/hangman/hangman.html'));
angular.module('app', ['hangman']);
