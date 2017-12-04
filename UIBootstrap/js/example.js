angular.module('UIbootstrapExample', ['ngAnimate', 'ngSanitize', 'ui.router', 'ui.bootstrap'])
.config(configure);

function configure($stateProvider){
	var firstState = {
		name: "Tab1",
		url: "/tab1",
		templateUrl: "views/alerts.html"
	};
	var secondState = {
		name: "Tab2",
		url: "/tab2",
		templateUrl: "views/popover.html"
	};

	$stateProvider.state(firstState);
	$stateProvider.state(secondState);
}