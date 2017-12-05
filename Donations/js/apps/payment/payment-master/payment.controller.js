angular.module('Payment')
.controller('PaymentController', paymentController);

paymentController.$inject = ['$state', 'PaymentService', 'blockUI', 'growl'];

function paymentController($state, PaymentService, blockUI, growl){

	var vm = this;

	vm.tabs = PaymentService.tabs;
	vm.currentTab = PaymentService.getCurrentTab();
	vm.goToPrevStep = goToPrevStep;
	vm.goToNextStep = goToNextStep;
	vm.displayFinish = displayFinish;

	function goToPrevStep(){
		PaymentService.currentTabIndex--;
		$state.go(vm.tabs[vm.currentTab].state);
	};

	function goToNextStep(){
		PaymentService.currentTabIndex++;
		$state.go(vm.tabs[vm.currentTab].state);
	};

	function displayFinish(){
		return currentTabIndex >= 4 ? 'block': 'none';
	}
}