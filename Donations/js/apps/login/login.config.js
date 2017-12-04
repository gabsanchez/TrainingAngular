angular.module('Login')
.config(config);

config.$inject = ['$stateProvider'];

function config($stateProvider){
	var loginState = {
		name: 'login',
		url: '/login',
		templateUrl: 'js/apps/login/login-app-user/login.html',
		controller: 'LoginController as login'
	};

	$stateProvider.state(loginState);
}