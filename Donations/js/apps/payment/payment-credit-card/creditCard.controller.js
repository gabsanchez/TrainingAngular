angular.module('Payment')
.controller('CreditCardController', cardController);

cardController.$inject = ['$state', 'PaymentService'];

function cardController($state, PaymentService){
	var vm = this;

	vm.creditCardTypes = PaymentService.paymentOptions.CreditCardTypeList;
	vm.validateCardData = validateCardData;
	vm.getCardType = getCardType;

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

	vm.openDTP = openDTP;

	vm.alertDisplay = 'none';

	function getCardType(cardOption){
		switch(cardOption){
			case 1:
				vm.cardPattern = PaymentService.cardPatterns.Visa;
				return 'Visa';
			case 2:
				vm.cardPattern = PaymentService.cardPatterns.MasterCard;
				return 'Master Card';
			case 3:
				vm.cardPattern = PaymentService.cardPatterns.AE;  
				return 'American Express';
			case 4:
				vm.cardPattern = PaymentService.cardPatterns.Discover;  
				return 'Discover';
			case 5:
				vm.cardPattern = PaymentService.cardPatterns.DinersClub;
				return 'Diners Club';
		}
	};
	function validateCardData(){

		if(vm.creditCardInputs.cardTypes.$invalid){
			vm.alertMessage = "Please select a credit card type";
			vm.alertDisplay = 'block';
		}
		else if(vm.creditCardInputs.cardInput.$invalid || !vm.creditCardInputs.cardInput.$modelValue.toString().match(vm.cardPattern)){
			vm.alertMessage = "Please enter a valid credit card number";
			vm.alertDisplay = 'block';
		}
		else if(vm.creditCardInputs.verifNumber.$invalid){
			vm.alertMessage = "Please enter a valid verification number";
			vm.alertDisplay = 'block';
		}
		else if(vm.creditCardInputs.cardName.$invalid){
			vm.alertMessage = "Please enter a name and a last name";
			vm.alertDisplay = 'block';
		}
		else{
			PaymentService.setCreditCardInformation(vm.cardOption, vm.cardNumber, vm.cardVerifNumber, vm.cardName, vm.cardExpDate, vm.email);
			PaymentService.currentTab.value = 2;
			$state.go('payment.address');
			vm.alertDisplay = 'none';
		}
	};

	function openDTP(){
		vm.dtpPopup.opened = true;
	};
}