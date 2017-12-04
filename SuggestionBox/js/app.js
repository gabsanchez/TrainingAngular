angular.module('SuggestionBox', ['ngRoute'])
	.config(Config);

function Config($routeProvider){
	$routeProvider
	.when('/',{
		controller: 'HomeController',
		controllerAs: 'homeController',
		templateUrl: 'views/home.html'
	})
	.when('/suggestion/:id',{
		controller: 'SuggestionController',
		controllerAs: 'suggestionController',
		templateUrl: 'views/suggestion.html'
	})
	.otherwise({
		redirectTo: '/'
	});
};