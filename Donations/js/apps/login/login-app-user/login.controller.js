angular.module('Login')
.controller('LoginController', loginController);

loginController.$inject = ['$state', 'LoginService', 'blockUI', 'growl'];

function loginController($state, LoginService, blockUI, growl){
	var vm = this;

	vm.$onInit = onInit;

	

	function logApp(){

		vm.loginBlockUI.start();

		LoginService.authenticateApp()
		.then(function(data){
			vm.loginBlockUI.stop();
		})
		.catch(function(err){
			return err;
		})

		
	}

	function logUser(campaign, username, password){

		if(campaign && username && password){
			LoginService.authenticateDonor(campaign, username, password)
			.then(function(){
				growl.success("Welcome", {ttl: 3500});
				$state.go('payment');
			})
			.catch(function(){
				growl.error("Invalid credentials");
			});
		}
		else{
			growl.error("Please fill all the fields");
		}
	}

	function onInit(){

		vm.logUser = logUser;
		vm.logApp = logApp;

		vm.loginBlockUI = blockUI.instances.get("loginBlock");

		vm.logApp();
	}

}