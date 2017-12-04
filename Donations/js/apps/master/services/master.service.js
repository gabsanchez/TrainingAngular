angular.module('Master')
.service('MasterService', masterServ);

function masterServ(){
	return {

		urls: {
			ApplicationAuthenticate: "http://1f734274.ngrok.io/OPPS.Web.API.Branch/api/Application/Authenticate",
			DonorAuthenticate: "http://1f734274.ngrok.io/OPPS.Web.API.Branch/api/Donor/Authenticate",
			PaymentTypeConfiguration: "http://1f734274.ngrok.io/OPPS.Web.API.Branch/api/Configuration/PaymentTypeConfiguration",
			ConfigurationCountries: "http://1f734274.ngrok.io/OPPS.Web.API.Branch/api/Configuration/Countries",
			ConfigurationUSStates: "http://1f734274.ngrok.io/OPPS.Web.API.Branch/api/Configuration/USStates",
			ConfigurationIntroductoryPanel: "http://1f734274.ngrok.io/OPPS.Web.API.Branch/api/Configuration/IntroductoryPanel",
			DonationSave: "http://1f734274.ngrok.io/OPPS.Web.API.Branch/api/Donation/Save",
			DonorGivingHistory: "http://1f734274.ngrok.io/OPPS.Web.API.Branch/api/Donor/GivingHistory"
		},

		apiKey: "RTJ4+E4067P+mqIEizOkGu7nHAxRBfZzkE+/+r1/SbQ=",
		appToken: '',
		donorToken: '',

		setAppToken: setAppToken,
		setDonorToken: setDonorToken

	};

	//Setters
	function setAppToken(token){
		this.appToken = token;
	};

	function setDonorToken(token){
		this.donorToken = token;
	};

}