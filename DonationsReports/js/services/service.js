angular.module('donations2')
.factory('apiService', getData);

getData.$inject = ['$http'];

function getData($http){

	var personalInfo = {};
	var paymentInfo = {};
	var requestParts = {
		method: 'GET',
		url: "http://1f734274.ngrok.io/OPPS.Web.API.Branch/api/",
		apiKey: "RTJ4+E4067P+mqIEizOkGu7nHAxRBfZzkE+/+r1/SbQ="
	}
	function getAppToken(){
		return $http({
		 "method": requestParts.method, 
		 "url": requestParts.url + "Application/Authenticate",
		 "data" : {},
		 "params" : {
		   "apiKey" : requestParts.apiKey
		 },
		 "headers": {
		   'Authorization': "Basic dmlhcm86cEBzc3dvcmQ="
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

	function getDonorToken(appToken){
		return $http({
		 "method": requestParts.method, 
		 "url": requestParts.url + "Donor/Authenticate",
		 "data" : {},
		 "params" : {
		 	"campaignCode" : "sp25camp1",
		 	"username" : "IPEDonor1",
		 	"password" : "IPEDonor1",
		    "apiKey" : requestParts.apiKey
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

	function getAgencies(appToken, donorToken){
		return $http({
		 "method": requestParts.method, 
		 "url": requestParts.url + "Configuration/IntroductoryPanel",
		 "data" : {},
		 "params" : {
		 	"donorToken" : donorToken,
		    "apiKey" : requestParts.apiKey
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

	function getCountries(appToken){
		return $http({
		 "method": requestParts.method, 
		 "url": requestParts.url + "Configuration/Countries",
		 "data" : {},
		 "params" : {
		   "apiKey" : requestParts.apiKey
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
 	
 	function getStates(appToken){
		return $http({
		 "method": requestParts.method, 
		 "url": requestParts.url + "Configuration/USStates",
		 "data" : {},
		 "params" : {
		   "apiKey" : requestParts.apiKey
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

	function getDonations(appToken, donorToken){
		return $http({
		 "method": requestParts.method, 
		 "url": requestParts.url + "Donor/GivingHistory",
		 "data" : {},
		 "params" : {
		 	"donorToken" : donorToken,
		    "apiKey" : requestParts.apiKey
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

	

	return {

		sortingOptions: ["Min to Max", "Max to min"],
		personalInfo: personalInfo,
		paymentInfo: paymentInfo,

		paymentOptions: [10, 20, 30, 40, 50],
		isAnonimus: false,
		paymentFrequencies: ['One-time','Monthly','Quarterly','Semi-annual'],

		getAppToken: getAppToken,
		getDonorToken: getDonorToken,
		getAgencies: getAgencies,
		getCountries: getCountries,
		getStates: getStates,
		getDonations: getDonations,

		setAppToken: function(appToken){
			this.appToken = appToken;
		},
		setDonorToken: function(donorToken){
			this.donorToken = donorToken;
		},
		setAgencies: function(charities){
			this.agencies = charities;
		},
		setCountries: function(countries){
			this.countries = countries;
		},
		setStates: function(states){
			this.states = states;
		},
		setDonations: function(donations){
			this.donations = donations;
		},
		setPersonInfo: function(firstName, lastName, birthDate, country, state, postalCode){
			this.firstname = firstName;
			this.lastname = lastName;
			this.birthDate = birthDate;
			this.country = country;
			this.state = state;
			this.postalCode = postalCode;
		},
		setPaymentInfo: function(info){
			this.paymentInfo = info;
		}
	};
}