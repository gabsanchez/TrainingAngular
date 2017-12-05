angular.module('Payment')
.service('PaymentService', paymentServ);

paymentServ.$inject = ['$q', 'PaymentRepository', 'AgenciesModel'];

function paymentServ($q, PaymentRepository, AgenciesModel){

	return {

		tabs: [],
		currentTab: {
			value: 0
		},
		cardPatterns: {
			Visa: /^(?:4[0-9]{12}(?:[0-9]{3})?)$/,
			MasterCard: /^(?:5[1-5][0-9]{14})$/,
			AE: /^(?:3[47][0-9]{13})$/,
			Discover: /^(?:6(?:011|5[0-9][0-9])[0-9]{12})$/,
			DinersClub: /^(?:3(?:0[0-5]|[68][0-9])[0-9]{11})$/
		},
		paymentOptions: {},
		countries: [],
		states: [],
		agenciesInformation: {},

		donnationData: {
			address: {},
			charity: {}
		},
		annualAmount: 0,

		setTabs: setTabs,
		setPaymentInformation: setPaymentInformation,
		setCreditCardInformation: setCreditCardInformation,
		setAddressInformation: setAddressInformation,
		setCharity: setCharity,

		getPaymentOptions: getPaymentOptions,
		getCountries: getCountries,
		getStates: getStates,
		getAgencies: getAgencies,
		sendDonation: sendDonation,
		getCurrentTab: getCurrentTab,

		alertDisplay: 'none',
		alertMessage: '',

		getAlertDisplay: getAlertDisplay,
		getAlertMessage: getAlertMessage,

		getToday: getToday
		
	};

	//Agencies module
	

	//Setters
	function setTabs(){
		this.tabs.push({
			state: 'payment.type',
			step: 1,
			title: this.paymentOptions.PaymentTypeLabel
		},{
			state: 'payment.creditCard',
			step: 2,
			title: this.paymentOptions.PaymentTypeLabel + ' Information',
		},{
			state: 'payment.country',
			step: 3,
			title: this.paymentOptions.PaymentTypeLabel + ' Billing address'
		},{
			state: 'payment.agency',
			step: 4,
			title: this.agenciesInformation.PanelTitle
	
		},{
			state: 'payment.preview',
			step: 5,
			title: 'Donation Preview'
		});
	};


	function setPaymentInformation(type, amount, frequency){

		this.donnationData.paymentType = type;
		this.donnationData.paymentAmount = amount;
		this.donnationData.paymentFrequency = frequency;
	};

	function setCreditCardInformation(type, cardNumber, cardVerif, cardName, expDate, email){//credit card form
		this.donnationData.cardType = type;
		this.donnationData.cardNumber = cardNumber;
		this.donnationData.cardVerificationNumber = cardVerif;
		this.donnationData.cardName = cardName;
		this.donnationData.cardExpirationDate = expDate;
		this.donnationData.email = email;
	};

	function setAddressInformation(address){//countries form
		this.donnationData.address = address;
	};

	function setCharity(charity){
		this.donnationData.charity = angular.copy(charity);
	}

	//Getters
	function getPaymentOptions(){
		return PaymentRepository.getPaymentOptions()
		.then(function(data){
			//this.paymentOptions = data;
			return data;
		});
	};

	function getCountries(){
		return PaymentRepository.getCountries()
		.then(function(data){
			return data;
		})
	};

	function getStates(){
		return PaymentRepository.getStates()
		.then(function(data){
			return data;
		})
	};

	function getAgencies(){
		var agenciesModel = new AgenciesModel();
		if(agenciesModel.data.PanelTitle && agenciesModel.data.Agencies){
			return agenciesModel.getData();
		}
		else{
			return PaymentRepository.getAgencies()
			.then(function(data){
				agenciesModel.setData(data);
				return agenciesModel.getData();
			});
		}
		
	};

	function sendDonation(){

		var data = {
			"CAddOnList": [], //None
            "AddonTotalList": [], //None
            "AddOnTotalValue": 0, //No value
            "CampaignId": "c4f85b7e-54eb-4194-bcb1-b0a072217e09",
            "CustomField1": this.donnationData.cardType,
            "CustomField2": this.donnationData.cardName,
            "CustomField3": this.donnationData.cardNumber,
            "CustomField4": this.donnationData.cardExpirationDate,
            "CustomField5": this.donnationData.email,
            "CustomField6": this.donnationData.cardVerificationNumber,
            "DesignationAmountType": 1,
            "DesignationList": [{
                "DesignateableEntityType": this.donnationData.charity.DesignationEntityType,
                "DesignationAmount": this.donnationData.paymentAmount,
                "DisplayName": "",
                "EIN":  this.donnationData.charity.EIN,
                "EntityId":  this.donnationData.charity.EntityId,
                "IsDefaultPanelItem": false,
                "IsRejected": false,
                "MinimumDonation":  this.donnationData.charity.MinimumDonation,
                "MinimumTotalDonationForDesignation":  this.donnationData.charity.MinimumTotalDonationForDesignation,
                "Name":  this.donnationData.charity.Name,
                "OrganizationNumber":  this.donnationData.charity.ProfileOrganizationNumber,
                "StandardAccountCode":  this.donnationData.charity.StandardAccountCode
            }],
            "DesignationWriteInList": [], //None
            "DonationSourceType": 9,
            "FrequencyType": 1, //paymentConfig.donationFrequency; send 1 because payment type is cash,
            "ImpersonatedUser": "",
            "IsConfirmed": "true",
            "IsImpersonated": false,
            "NegativeDesignation": "", //None
            "Payment": { /*Empty because cash doesn't accept billing data*/ },
            "PaymentAmount": this.donnationData.paymentAmount,
            "PaymentAmountType": 1,
            "PaymentIncreaseAmount": 0,
            "PaymentIncreaseAmountType": 1,
            "PaymentTotalValue": this.donnationData.paymentAmount,
            "PaymentType": 5,
            "PledgeStatusType": 0,
            "TotalValue": this.donnationData.paymentAmount,
		};

		return PaymentRepository.sendDonation(data)
		.then(function(response){
			return response;
		})
	};

	function getCurrentTab(){
		return this.currentTab;
	}

	//Actions
	function getAlertDisplay(){
		return this.alertDisplay;
	};

	function getAlertMessage(){
		return this.alertMessage;
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

}