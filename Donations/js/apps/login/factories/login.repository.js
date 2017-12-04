angular.module('Login')
.factory('LoginRepository', loginRepo);

loginRepo.$inject = ['$http', '$q', 'MasterService'];

function loginRepo($http, $q, MasterService){

	function getAppToken(){
		return $http({
			"method": "GET", 
			"url": MasterService.urls.ApplicationAuthenticate,
			"data" : {},
			"params" : {
				"apiKey" : MasterService.apiKey
			},
			"headers": {
				'Authorization': "Basic dmlhcm86cEBzc3dvcmQ="
			}
		})
		.then(function (data) {
       		return data.data;
	   	})
		.catch(function (err) {
	       return $q.reject(err);
	   	});
	};

	function getDonorToken(campaign, username, password){

		return $http({
			"method": "GET", 
			"url": MasterService.urls.DonorAuthenticate,
			"data" : {},
			"params" : {
			"campaignCode" : campaign,
			"username" : username,
			"password" : password,
				"apiKey" : MasterService.apiKey
			},
			"headers": {
				"Accept" : "application/json",
			'Authorization': "Bearer " + MasterService.appToken
			}
		})
		.then(function (data) {
			return data.data.Data.DonorToken;
		})
		.catch(function (err) {
			return $q.reject(err);
		});

	};

	return {
		getAppToken: getAppToken,
		getDonorToken: getDonorToken
	}

}