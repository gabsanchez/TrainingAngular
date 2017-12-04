angular.module('Payment')
.controller('PaymentController', paymentController);

paymentController.$inject = ['$state', 'PaymentService', 'blockUI', 'growl'];

function paymentController($state, PaymentService, blockUI, growl){

	var vm = this;

	vm.tabs = PaymentService.tabs;
	vm.currentTab = PaymentService.getCurrentTab();
	vm.goToPrevStep = goToPrevStep;
	vm.goToNextStep = goToNextStep;

	function goToPrevStep(){
		PaymentService.currentTabIndex--;
		$state.go(vm.tabs[vm.currentTab].state);
	};

	function goToNextStep(){
		PaymentService.currentTabIndex++;
		$state.go(vm.tabs[vm.currentTab].state);
	};
}