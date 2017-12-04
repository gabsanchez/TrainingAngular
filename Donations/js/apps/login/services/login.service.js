angular.module('Login')
.service('LoginService', loginServ);

loginServ.$inject = ['$q', 'LoginRepository', 'MasterService'];

function loginServ($q, LoginRepository, MasterService){

	return {

		authenticateApp: authenticateApp,
		authenticateDonor: authenticateDonor
	};

	function authenticateApp(){
		return LoginRepository.getAppToken()
		.then(function(data){
			MasterService.setAppToken(data);
			return data;
		})
		.catch(function(err){
			return err;
		});
	};

	function authenticateDonor(campaign, username, password){
		return LoginRepository.getDonorToken(campaign, username, password)
		.then(function(data){
			MasterService.setDonorToken(data);
			return data;
		})
		.catch(function(err){
			return $q.reject(err);
		})
	};
}