angular.module('Payment')
.controller('PaymentTypeController', paymentTypeController);

paymentTypeController.$inject = ['$state', 'PaymentService'];

function paymentTypeController($state, PaymentService){

	var vm = this;

	vm.paymentTypeLabel = PaymentService.paymentOptions.PaymentTypeLabel;
	vm.paymentInstructions = PaymentService.paymentOptions.PaymentInstructions;
	vm.paymentQuestion = PaymentService.paymentOptions.PaymentQuestion;
	vm.paymentOptions = PaymentService.paymentOptions.AmountQuestions[0].AmountOptions;

	vm.frequencyInstructions = PaymentService.paymentOptions.FrequencyInstructions;
	vm.frequenciesList = PaymentService.paymentOptions.FrequencyTypeList;

	vm.alertDisplay = "none";

	//Actions
	vm.setAnnual = setAnnual;

	function setAnnual(){

		if(!vm.amount){

			vm.alertMessage = "Please select an amount";
			vm.alertDisplay = "block";
		}
		else if(!vm.frequency){
			vm.alertMessage = "Please select a frequency";
			vm.alertDisplay = "block";
		}
		else{
			switch(vm.frequency){
				case "1":
					PaymentService.annualAmount = vm.amount;
					break;
				case "2":
					PaymentService.annualAmount = vm.amount*12;
					break;
				case "3":
					PaymentService.annualAmount = vm.amount*4;
					break;
				case "4":
					PaymentService.annualAmount = vm.amount*2;
					break;
			}
			PaymentService.setPaymentInformation(5, vm.amount, vm.frequency)
			PaymentService.currentTab.value = 1;
			$state.go('payment.creditCard');
			PaymentService.alertDisplay = "none";
		}
	};

}