angular.module('donations')
.controller('PaymentController', paymentController);

paymentController.$inject = ["connection", "paymentData", "countryData", "statesData", "agenciesData", "$state", "blockUI"];

function paymentController(connection, paymentData, countryData, statesData, agenciesData, $state, blockUI){


	var vm = this;
	//vm.currentStep = 1;
	vm.frequency = 0;
	vm.today = connection.getToday();
	vm.getStateOption = getStateOption;
	vm.creditCardInputs = '';
	vm.status = 'Pending';
	vm.gotoState = gotoState;
	vm.setAnnual = setAnnual

	vm.setPledge = setPledge;


	vm.tabs = [
			{
			state: 'payment.type',
			step: 1,
			title: paymentData.PaymentTypeLabel,
			},
			{
			state: 'payment.creditCard',
			step: 2,
			title: paymentData.PaymentTypeLabel + ' Information',
			},
			{
			state: 'payment.country',
			step: 3,
			title: paymentData.PaymentTypeLabel + ' Information',
			},
			{
			state: 'payment.agency',
			step: 4,
		
			},
			{
			state: 'payment.preview',
			step: 5,
			title: 'Donation Preview',
			}
		];

	vm.alertMessage = "";
	vm.alertDisplay = "none";
	vm.alertClass = "danger";

	vm.NextDisplay = "block";
	vm.FinishDisplay = "none";

	vm.dtpPopup = {
		opened: false
	};
	vm.dateOptions = {
		dateDisabled: false,
		formatYear: 'yy',
		maxDate: new Date(2100, 5, 22),
		minDate: new Date(),
		startingDay: 1
	};

	vm.paymentTypeLabel = paymentData.PaymentTypeLabel;
	vm.paymentInstructions = paymentData.PaymentInstructions;
	vm.paymentQuestion = paymentData.PaymentQuestion;
	vm.paymentOptions = paymentData.AmountQuestions[0].AmountOptions;

	vm.frequencyInstructions = paymentData.FrequencyInstructions ;
	vm.frequenciesList = paymentData.FrequencyTypeList;

	vm.creditCardTypes = paymentData.CreditCardTypeList;
	vm.getCardPattern = getCardPattern;
	vm.getCardData = getCardData;
	vm.getCardType = getCardType;

	vm.openDTP = openDTP;

	vm.countries = countryData;
	vm.usStates = statesData;

	vm.agencies = agenciesData.PanelItemList;
	vm.panelTitle = agenciesData.PanelTitle;
	vm.tabs[3].title = vm.panelTitle;

	vm.validateCountry = validateCountry;
	vm.validateCharity = validateCharity;


	vm.sendDonationBlockUI = blockUI.instances.get("sendDonationBlock");

	function gotoState(tabNumber, next){

		if(next)
		{
			switch(tabNumber){
				case 1:
					$state.go('payment.type');
					break;
				case 2:
					vm.setAnnual();
					break;
				case 3:
					vm.getCardData();
					break;
				case 4:
					vm.validateCountry();
					break;
				case 5:
					vm.validateCharity();
					break;
			}
		}
		else{
			vm.currentStep = tabNumber;
			$state.go(vm.tabs[tabNumber - 1].state);
		}
		//$state.go(vm.tabs[vm.currentStep - 1].state);
	}
	  
	function openDTP(){
		vm.dtpPopup.opened = true;
	}

	function setAnnual(){

		if(!vm.amount){

			vm.alertMessage = "Please select an amount";
			vm.alertDisplay = "block";
			vm.alertClass = "danger";
		}
		else if(!vm.frequency){
			vm.alertMessage = "Please select a frequency";
			vm.alertDisplay = "block";
			vm.alertClass = "danger";
		}
		else
		{
			switch(vm.frequency){
				case "1":
					vm.annual = vm.amount;
					break;
				case "2":
					vm.annual = vm.amount*12;
					break;
				case "3":
					vm.annual = vm.amount*4;
					break;
				case "4":
					vm.annual = vm.amount*2;
					break;
			}
			vm.currentStep = 2;
			$state.go('payment.creditCard');
			vm.alertDisplay = "none";
		}
	};



	function getCardType(cardOption){
		switch(cardOption){
			case 1:
				vm.cardPattern = /^(?:4[0-9]{12}(?:[0-9]{3})?)$/;
				return 'Visa';
			case 2:
				vm.cardPattern = /^(?:5[1-5][0-9]{14})$/;
				return 'Master Card';
			case 3:
				vm.cardPattern = /^(?:3[47][0-9]{13})$/;  
				return 'American Express';
			case 4:
				vm.cardPattern = /^(?:6(?:011|5[0-9][0-9])[0-9]{12})$/;  
				return 'Discover';
			case 5:
				vm.cardPattern = /^(?:3(?:0[0-5]|[68][0-9])[0-9]{11})$/;
				return 'Diners Club';
		}
	};
	function getCardPattern(){
		switch(vm.cardOption){
			case 1:
				vm.cardPattern = "/^(?:4[0-9]{12}(?:[0-9]{3})?)$/";
				break;
			case 2:
				vm.cardPattern = "/^(?:5[1-5][0-9]{14})$/";
				break;
			case 3:
				vm.cardPattern = "/^(?:3[47][0-9]{13})$/";  
				break;
			case 4:
				vm.cardPattern = "/^(?:6(?:011|5[0-9][0-9])[0-9]{12})$/";  
				break;
			case 5:
				vm.cardPattern = "/^(?:3(?:0[0-5]|[68][0-9])[0-9]{11})$/";  
				break;
		}
		return vm.cardPattern;
	};
	function getCardData(){

		if(vm.creditCardInputs.cardTypes.$invalid){
			vm.alertMessage = "Please select a credit card type";
			vm.alertDisplay = 'block';
			vm.alertClass = "danger";
		}
		else if(vm.creditCardInputs.cardInput.$invalid || !vm.creditCardInputs.cardInput.$modelValue.toString().match(vm.cardPattern)){
			vm.alertMessage = "Please enter a valid credit card";
			vm.alertDisplay = 'block';
			vm.alertClass = "danger";
		}
		else if(vm.creditCardInputs.verifNumber.$invalid){
			vm.alertMessage = "Please enter a valid verification number";
			vm.alertDisplay = 'block';
			vm.alertClass = "danger";
		}
		else if(vm.creditCardInputs.cardName.$invalid){
			vm.alertMessage = "Please enter a name and a last name";
			vm.alertDisplay = 'block';
			vm.alertClass = "danger";
		}
		else{
			vm.currentStep = 3;
			$state.go('payment.country');
			vm.alertDisplay = 'none';
		}
	};

	function getStateOption(){
		if(vm.selectedCountry && vm.selectedCountry.ISO === 'us'){
			return 'views/states.html'
		}
		else{
			return 'views/province.html'
		}
	};
	function validateCountry(){
		if(vm.billingInfo.countries.$invalid){
			vm.alertMessage = "Please select a country";
			vm.alertDisplay = 'block';
			vm.alertClass = "danger";
		}
		else if(vm.billingInfo.address1.$invalid){
			vm.alertMessage = "Please enter an address";
			vm.alertDisplay = 'block';
			vm.alertClass = "danger";
		}
		else if(vm.billingInfo.city.$invalid){
			vm.alertMessage = "Please enter a city";
			vm.alertDisplay = 'block';
			vm.alertClass = "danger";
		}
		else if(vm.billingInfo.states && vm.billingInfo.states.$invalid){
			vm.alertMessage = "Please select a state";
			vm.alertDisplay = 'block';
			vm.alertClass = "danger";
		}
		else if(vm.billingInfo.province && vm.billingInfo.province.$invalid){
			vm.alertMessage = "Please enter a province";
			vm.alertDisplay = 'block';
			vm.alertClass = "danger";
		}
		else if(vm.billingInfo.zip1 && vm.billingInfo.zip1.$invalid){
			vm.alertMessage = "Please enter a valid zip code";
			vm.alertDisplay = 'block';
			vm.alertClass = "danger";
		}
		else if(vm.billingInfo.postalCode && vm.billingInfo.postalCode.$invalid){
			vm.alertMessage = "Please enter a valid postal code";
			vm.alertDisplay = 'block';
			vm.alertClass = "danger";
		}
		else{
			vm.currentStep = 4;
			$state.go('payment.agency');
			vm.alertDisplay = 'none';
		}
	}
	function validateCharity(){
		if(!vm.selectedCharityIndex){
			vm.alertMessage =  "Please select a charity.";
			vm.alertDisplay = 'block';
		}
		else if(vm.amount < vm.minDonation){
			vm.alertMessage = "You must donate at least " + vm.selectedCharity.MinimumDonation;
			vm.alertDisplay = 'block';
		
		}
		else{
			vm.selectedCharity = vm.agencies[vm.selectedCharityIndex]
			vm.currentStep = 5;
			vm.NextDisplay = "none";
			vm.FinishDisplay = "block";
			$state.go('payment.preview', 5);
		}
	};
	function setPledge(){
		var data = {
			"method": "POST", 
		 	"url": "http://1f734274.ngrok.io/OPPS.Web.API.Branch/api/Donation/Save",
		 	"headers": {
			  "Accept" : "application/json",
			  'Authorization': "Bearer " + connection.appToken
			},
			"params" : {
			  "donorToken" : connection.donorToken,
			  "apiKey" : "RTJ4+E4067P+mqIEizOkGu7nHAxRBfZzkE+/+r1/SbQ=",
			  "ipAddress" : ""
			},
			"data" : {
				"CAddOnList": [], //None
                    "AddonTotalList": [], //None
                    "AddOnTotalValue": 0, //No value
                    "CampaignId": "c4f85b7e-54eb-4194-bcb1-b0a072217e09",
                    "CustomField1": vm.cardOption,
                    "CustomField2": vm.cardName,
                    "CustomField3": vm.cardNumber,
                    "CustomField4": vm.cardExpDate,
                    "CustomField5": vm.email,
                    "CustomField6": vm.cardVerifNumber,
                    "DesignationAmountType": 1,
                    "DesignationList": [{
                        "DesignateableEntityType": vm.selectedCharity.DesignationEntityType,
                        "DesignationAmount": vm.amount,
                        "DisplayName": "",
                        "EIN": vm.selectedCharity.EIN,
                        "EntityId": vm.selectedCharity.EntityId,
                        "IsDefaultPanelItem": false,
                        "IsRejected": false,
                        "MinimumDonation": vm.selectedCharity.MinimumDonation,
                        "MinimumTotalDonationForDesignation": vm.selectedCharity.MinimumTotalDonationForDesignation,
                        "Name": vm.selectedCharity.Name,
                        "OrganizationNumber": vm.selectedCharity.ProfileOrganizationNumber,
                        "StandardAccountCode": vm.selectedCharity.StandardAccountCode
                    }],
                    "DesignationWriteInList": [], //None
                    "DonationSourceType": 9,
                    "FrequencyType": 1, //paymentConfig.donationFrequency; send 1 because payment type is cash,
                    "ImpersonatedUser": "",
                    "IsConfirmed": "true",
                    "IsImpersonated": false,
                    "NegativeDesignation": "", //None
                    "Payment": { /*Empty because cash doesn't accept billing data*/ },
                    "PaymentAmount": vm.amount,
                    "PaymentAmountType": 1,
                    "PaymentIncreaseAmount": 0,
                    "PaymentIncreaseAmountType": 1,
                    "PaymentTotalValue": vm.amount,
                    "PaymentType": 5,
                    "PledgeStatusType": 0,
                    "TotalValue": vm.amount,
			}
		};

		vm.sendDonationBlockUI.start("Sending donation...");

		connection.sendDonation(data).then(function(){
			vm.sendDonationBlockUI.stop();
			$state.go('history');
		}).catch(function(err){
			return err;
		});

	}
}