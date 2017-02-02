import wordDirective from './word-directive';

const word = angular.module('word', [])
  .directive("appWord", wordDirective);

export default word.name;