import GallowsController from './gallows-controller';
import gallowsDirective from './gallows-directive';

angular.module('gallows', [])
  .controller("GallowsController", GallowsController)
  .directive("appGallows", gallowsDirective);
