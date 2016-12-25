angular.module('myApp', [
  'myApp.services',
  'myApp.form',
  'myApp.validated',
  'ngRoute'
  ])

.config(function($routeProvider, $httpProvider) {
  $routeProvider
    .otherwise({
      redirectTo: '/form'
    });
})
