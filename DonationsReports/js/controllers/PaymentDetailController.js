angular.module('donations2')
.controller('PaymentDetailController', paymentDetailController);

paymentDetailController.$inject = ['apiService', '$uibModalInstance', '$state'];

function paymentDetailController(apiService, $uibModalInstance, $state){

	var vm = this;

	vm.paymentDetails = apiService.paymentInfo;

	vm.ok = ok;

	function ok(){
		$uibModalInstance.close();
		$state.go('^');
	};
}