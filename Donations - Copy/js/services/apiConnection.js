angular.module('donations')
.factory('connection', getData);

getData.$inject = ['$http','$state', '$q'];

function getData($http, $state, $q){


	var donationHistory = [];
	var selectedDonation = {};
	
	function appInfo(){
		return $http({
			"method": "GET", 
			"url": "http://1f734274.ngrok.io/OPPS.Web.API.Branch/api/Application/Authenticate",
			"data" : {},
			"params" : {
				"apiKey" : "RTJ4+E4067P+mqIEizOkGu7nHAxRBfZzkE+/+r1/SbQ="
			},
			"headers": {
				'Authorization': "Basic dmlhcm86cEBzc3dvcmQ="
			}
		})
	   .then(function (data) {
       		return data;
	   })
	   .catch(function (err) {
	       return err;
	   });
				
	};
	function donorInfo(campaign, username, password, token){
		return $http({
		 "method": "GET", 
		 "url": "http://1f734274.ngrok.io/OPPS.Web.API.Branch/api/Donor/Authenticate",
		 "data" : {},
		 "params" : {
		 	"campaignCode" : campaign,
		 	"username" : username,
		 	"password" : password,
		    "apiKey" : "RTJ4+E4067P+mqIEizOkGu7nHAxRBfZzkE+/+r1/SbQ="
		 },
		 "headers": {
		 	"Accept" : "application/json",
		   'Authorization': "Bearer " + token
		 }
		})
	   .then(function (data) {
	   	   this.donorToken = data.data.Data.DonorToken;
	   	   $state.go('payment');
	       return data;
	   })
	   .catch(function (err) {
	       return $q.reject(err);
	   });
	};

	function paymentInfo(appToken, donorToken){
		return $http({
		 "method": "GET", 
		 "url": "http://1f734274.ngrok.io/OPPS.Web.API.Branch/api/Configuration/PaymentTypeConfiguration",
		 "data" : {},
		 "params" : {
		 	"donorToken" : donorToken,
		    "apiKey" : "RTJ4+E4067P+mqIEizOkGu7nHAxRBfZzkE+/+r1/SbQ=",
		    "paymentType" : "2"
		 },
		 "headers": {
		 	"Accept" : "application/json",
		   'Authorization': "Bearer " + appToken
		 }
		})
	   .then(function (data) {
	       return data;
	   })
	   .catch(function (err) {
	       console.log(err);
	       return err;
	   });
	};

	function countryInfo(appToken){
		return $http({
		 "method": "GET", 
		 "url": "http://1f734274.ngrok.io/OPPS.Web.API.Branch/api/Configuration/Countries",
		 "data" : {},
		 "params" : {
		   "apiKey" : "RTJ4+E4067P+mqIEizOkGu7nHAxRBfZzkE+/+r1/SbQ="
		 },
		 "headers": {
		 	"Accept" : "application/json",
		   'Authorization': "Bearer " + appToken
		 }
		})
	   .then(function (data) {
	       return data;
	   })
	   .catch(function (err) {
	       console.log(err);
	       return err;
	   });
	};

	function usStateInfo(appToken){
		return $http({
		 "method": "GET", 
		 "url": "http://1f734274.ngrok.io/OPPS.Web.API.Branch/api/Configuration/USStates",
		 "data" : {},
		 "params" : {
		   "apiKey" : "RTJ4+E4067P+mqIEizOkGu7nHAxRBfZzkE+/+r1/SbQ="
		 },
		 "headers": {
		 	"Accept" : "application/json",
		   'Authorization': "Bearer " + appToken
		 }
		})
	   .then(function (data) {
	       return data;
	   })
	   .catch(function (err) {
	       return err;
	   });
	};

	function agenciesInfo(appToken, donorToken){
		return $http({
		 "method": "GET", 
		 "url": "http://1f734274.ngrok.io/OPPS.Web.API.Branch/api/Configuration/IntroductoryPanel",
		 "data" : {},
		 "params" : {
		 	"donorToken" : donorToken,
		    "apiKey" : "RTJ4+E4067P+mqIEizOkGu7nHAxRBfZzkE+/+r1/SbQ="
		 },
		 "headers": {
		 	"Accept" : "application/json",
		   'Authorization': "Bearer " + appToken
		 }
		})
	   .then(function (data) {
	       return data;
	   })
	   .catch(function (err) {
	       console.log(err);
	       return err;
	   });
	};

	function sendDonation(req){
		return $http(req).then(function(data){
			return data
		}).catch(function (err) {
	       return err;
	   });
	};

	function givingHistory(appToken, donorToken){
		return $http({
		 "method": "GET", 
		 "url": "http://1f734274.ngrok.io/OPPS.Web.API.Branch/api/Donor/GivingHistory",
		 "data" : {},
		 "params" : {
		 	"donorToken" : donorToken,
		    "apiKey" : "RTJ4+E4067P+mqIEizOkGu7nHAxRBfZzkE+/+r1/SbQ="
		 },
		 "headers": {
		 	"Accept" : "application/json",
		   'Authorization': "Bearer " + appToken
		 }
		})
	   .then(function (data) {
	       return data;
	   })
	   .catch(function (err) {
	       return err;
	   });
	};

	function getToday(){
		var today = new Date();
		var month = today.getMonth() + 1;
		var year = today.getFullYear();
		if(month < 10){
		    month = '0' + month;
		}
		return year + "-" + month;
	};

	return {

		donationHistory: donationHistory,
		selectedDonation: selectedDonation,

		appInfo: appInfo,
		donorInfo: donorInfo,
		paymentInfo: paymentInfo,
		setDonations: function(donations){
			this.donations = donations;
		},
		countryInfo: countryInfo,
		usStateInfo: usStateInfo,
		agenciesInfo: agenciesInfo,
		sendDonation: sendDonation,
		givingHistory: givingHistory,
		getToday: getToday,

		setAppToken: function(token){
			this.appToken = token;
		},
		setDonorToken: function(token){
			this.donorToken = token;
		},
		setDonor: function(campaign, username, password){
			this.donorCampaign = campaign;
			this.donorUsername = username;
			this.donorPassword = username;
		},

	}
}