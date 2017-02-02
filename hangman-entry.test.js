import './hangman-entry';
import 'angular-mocks/angular-mocks';
const context = require.context('./modules', true, /.test\.js$/);
context.keys().forEach(context);