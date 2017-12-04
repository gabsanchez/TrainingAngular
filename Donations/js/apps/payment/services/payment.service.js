angular.module('Payment')
.service('PatmentService', paymentServ);

paymentServ.$inject = ['$q', 'PaymentRepository', 'DonationModel'];

function paymentServ($q, PaymentRepository, DonationModel){

	return {

		tabs: [],
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
		agencies: {},
		
	};


	function setTabs(){
		this.tabs.push({
				state: 'payment.type',
				step: 1,
				title: this.paymentOptions.PaymentTypeLabel
			},
			{
				state: 'payment.creditCard',
				step: 2,
				title: this.paymentOptions.PaymentTypeLabel + ' Information',
			},
			{
				state: 'payment.country',
				step: 3,
				title: this.paymentOptions.PaymentTypeLabel + ' Billing address'
			},
			{
				state: 'payment.agency',
				step: 4,
				title: this.agencies.PanelTitle
		
			},
			{
				state: 'payment.preview',
				step: 5,
				title: 'Donation Preview'
			});
	}

	function getPaymentOptions(){
		return PaymentRepository.getPaymentOptions()
		.then(function(data){
			this.paymentOptions = data;
		})
	};

	function getCountries(){
		return PaymentRepository.getCountries()
		.then(function(data){
			this.countries = data;
		})
	};

	function getStates(){
		return PaymentRepository.getStates()
		.then(function(data){
			this.states = data;
		})
	};

	function getAgencies(){
		return PaymentRepository.getAgencies()
		.then(function(data){
			this.agencies = data;
		})
	};

	function sendDonation(){

		var model = DonationModel.getDonationModel();

		var data = {
			"CAddOnList": [], //None
            "AddonTotalList": [], //None
            "AddOnTotalValue": 0, //No value
            "CampaignId": "c4f85b7e-54eb-4194-bcb1-b0a072217e09",
            "CustomField1": model.creditCard.type,
            "CustomField2": model.creditCard.name,
            "CustomField3": model.creditCard.number,
            "CustomField4": model.creditCard.expirationDate,
            "CustomField5": model.creditCard.email,
            "CustomField6": model.creditCard.verificationNumber,
            "DesignationAmountType": 1,
            "DesignationList": [{
                "DesignateableEntityType": model.charity.DesignationEntityType,
                "DesignationAmount": model.amount,
                "DisplayName": "",
                "EIN": model.charity.EIN,
                "EntityId": model.charity.EntityId,
                "IsDefaultPanelItem": false,
                "IsRejected": false,
                "MinimumDonation": model.charity.MinimumDonation,
                "MinimumTotalDonationForDesignation": model.charity.MinimumTotalDonationForDesignation,
                "Name": model.charity.Name,
                "OrganizationNumber": model.charity.ProfileOrganizationNumber,
                "StandardAccountCode": model.charity.StandardAccountCode
            }],
            "DesignationWriteInList": [], //None
            "DonationSourceType": 9,
            "FrequencyType": 1, //paymentConfig.donationFrequency; send 1 because payment type is cash,
            "ImpersonatedUser": "",
            "IsConfirmed": "true",
            "IsImpersonated": false,
            "NegativeDesignation": "", //None
            "Payment": { /*Empty because cash doesn't accept billing data*/ },
            "PaymentAmount": model.amount,
            "PaymentAmountType": 1,
            "PaymentIncreaseAmount": 0,
            "PaymentIncreaseAmountType": 1,
            "PaymentTotalValue": model.amount,
            "PaymentType": 5,
            "PledgeStatusType": 0,
            "TotalValue": model.amount,
		};

		PaymentRepository.sendDonation(data)
		.then(function(response){
			return response;
		})
	}
}