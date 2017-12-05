angular.module('Payment')
.factory('PaymentRepository', paymentRepo);

paymentRepo.$inject = ['$http', '$q', 'MasterService'];

function paymentRepo($http, $q, MasterService){

	function getPaymentOptions(){
		return $http({
			"method": "GET", 
			"url": MasterService.urls.PaymentTypeConfiguration,
			"data" : {},
			"params" : {
				"donorToken" : MasterService.donorToken,
				"apiKey" : MasterService.apiKey,
			"paymentType" : "2"
			},
			"headers": {
				"Accept" : "application/json",
				'Authorization': "Bearer " + MasterService.appToken
			}
		})
		.then(function (data) {
			return data.data.Data;
		})
		.catch(function (err) {
			return $q.reject(err);
		});
	};

	function getCountries(){
		return $http({
			"method": "GET", 
			"url": MasterService.urls.ConfigurationCountries,
			"data" : {},
			"params" : {
				"apiKey" : MasterService.apiKey
			},
			"headers": {
				"Accept" : "application/json",
				'Authorization': "Bearer " + MasterService.appToken
			}
		})
		.then(function (data) {
			return data.data.Data;
		})
		.catch(function (err) {
			return $q.reject(err);
		});
	};

	function getStates(){
		return $http({
			"method": "GET", 
			"url": MasterService.urls.ConfigurationUSStates,
			"data" : {},
			"params" : {
				"apiKey" : MasterService.apiKey
			},
			"headers": {
				"Accept" : "application/json",
				'Authorization': "Bearer " + MasterService.appToken
			}
		})
		.then(function (data) {
			return data.data.Data;
		})
		.catch(function (err) {
			return $q.reject(err);
		});
	};

	function getAgencies(){
		return $http({
			"method": "GET", 
			"url": MasterService.urls.ConfigurationIntroductoryPanel,
			"data" : {},
			"params" : {
			"donorToken" : MasterService.donorToken,
				"apiKey" : MasterService.apiKey
			},
			"headers": {
				"Accept" : "application/json",
				'Authorization': "Bearer " + MasterService.appToken
			}
		})
		.then(function (data) {
			return data.data.Data;
		})
		.catch(function (err) {
			return $q.reject(err);
		});
	};

	function sendDonation(data){
		return $http({
			"method": "POST", 
		 	"url": MasterService.urls.DonationSave,
		 	"headers": {
				"Accept" : "application/json",
				'Authorization': "Bearer " + MasterService.appToken
			},
			"params" : {
				"donorToken" : MasterService.donorToken,
				"apiKey" : MasterService.apiKey,
				"ipAddress" : ""
			},
			"data": data
		})
		.then(function (data) {
			return data;
		})
		.catch(function (err) {
			return $q.reject(err);
		});
	};

	return {
		getPaymentOptions: getPaymentOptions,
		getCountries: getCountries,
		getStates: getStates,
		getAgencies: getAgencies,
		sendDonation: sendDonation
	}
}