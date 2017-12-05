angular.module('Payment')
.controller('PaymentController', paymentController);

paymentController.$inject = ['paymentData', 'agenciesData', '$state', 'PaymentService'];

function paymentController(paymentData, agenciesData, $state, PaymentService){

	var vm = this;

	PaymentService.paymentOptions = paymentData;
	PaymentService.agenciesInformation = agenciesData;

	PaymentService.setTabs();

	vm.tabs = PaymentService.tabs;
	vm.currentTab = PaymentService.currentTab;

	vm.alertDisplay = PaymentService.getAlertDisplay();
	vm.alertMessage = PaymentService.getAlertMessage();

	$state.go('payment.paymentType');

}