angular.module('donations')
.controller('HistoryDetailController', historyDetailController);

historyDetailController.$inject = ["connection", "$uibModalInstance", "$state"];

function historyDetailController(connection, $uibModalInstance, $state){

	var vm = this;

	vm.donation = connection.selectedDonation;

	vm.getStatus = getStatus;
	vm.getSelectedPaymentType = getSelectedPaymentType;
	vm.ok = ok;

	function getStatus(){
		if(vm.donation.PledgeStatusType === 3){
			return "Submitted";
		}
	}

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