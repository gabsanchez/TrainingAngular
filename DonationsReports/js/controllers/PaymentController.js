angular.module('donations2')
.controller('PaymentController', paymentController);

paymentController.$inject = ['apiService', '$uibModal', '$state'];

function paymentController(apiService, $uibModal, $state){
	
	var vm = this;

	vm.paymentOptions = apiService.paymentOptions;
	vm.isAnonimus = apiService.isAnonimus;
	vm.paymentFrequencies = apiService.paymentFrequencies;
	vm.paymentInformation = {};
	vm.paymentInformation.frequency = vm.paymentFrequencies[0];
	vm.paymentInformation.anonimus = false;

	vm.openModal = openModal;

	function openModal(){

		if(vm.paymentForm.$valid){

			apiService.paymentInfo = angular.copy(vm.paymentInformation);

			$state.go('menu.payment.paymentDetail');
		}
		else{
			alert("Please select an amount");
		}
	}
	
}