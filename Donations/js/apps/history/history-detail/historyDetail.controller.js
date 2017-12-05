angular.module('History')
.controller('HistoryDetailController', historyDetailController);

historyDetailController.$inject = ["HistoryService", "$uibModalInstance", "$state"];

function historyDetailController(HistoryService, $uibModalInstance, $state){

	var vm = this;

	vm.donation = HistoryService.selectedDonation;

	vm.getSelectedPaymentType = getSelectedPaymentType;
	vm.ok = ok;



	function getSelectedPaymentType(){
		if(vm.donation){
			switch(vm.donation.PaymentType)
			{
				case 2:
					return "Credit Card";
					break;
				case 5:
					return "Cash";
					break;
			}
		}
		else
		{
			return "";
		}
	};

	function ok(){
		$uibModalInstance.close();
		$state.go('^');
	};
}