angular.module('donations')
.controller('LoginController', loginController);

loginController.$inject = ['$state', 'connection', 'blockUI', 'growl'];

function loginController($state, connection, blockUI, growl){
	var vm = this;

	vm.$onInit = onInit;

	

	function logApp(){

		vm.loginBlockUI.start();

		connection.appInfo()
		.then(function(data){
			connection.setAppToken(data.data);
			
		})
		.catch(function(err){
			return err;
		})
		.finally(function(){
			vm.loginBlockUI.stop();
		});

		
	}

	function logUser(campaign, username, password){
		connection.donorInfo(campaign, username, password, connection.appToken).then(function(data){
			if(data.status === 200){
				vm.donorToken = data.data.Data.DonorToken;
				connection.setDonorToken(vm.donorToken);
			}
			else{
				growl.error("Invalid credentials");
			}
		}).catch(function(){
			vm.alertMessage = "Invalid credentials";
			vm.alertDisplay = "block";
		});
		
	}

	function onInit(){

		vm.logUser = logUser;
		vm.logApp = logApp;

		vm.loginBlockUI = blockUI.instances.get("loginBlock");

		vm.alertMessage = "";
		vm.alertDisplay = 'none';

		vm.logApp();
	}

}