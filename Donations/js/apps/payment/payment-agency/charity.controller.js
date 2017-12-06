angular.module('Payment')
.controller('AgencyController', agencyController);

agencyController.$inject = ['$state', 'PaymentService'];

function agencyController($state, PaymentService){

	var vm = this;

	PaymentService.currentTab.value = 3;

	vm.selectedCharity = PaymentService.getSelectedCharity();

	PaymentService.getAgencies()
	.then(function(data){
		vm.agencies = data.Agencies;
	})
	
	vm.validateCharity = validateCharity;

	vm.alertDisplay = 'none';

	function validateCharity(){
		if(!vm.selectedCharity){
			vm.alertMessage =  "Please select a charity.";
			vm.alertDisplay = 'block';
		}
		else if(PaymentService.paymentAmount < vm.minDonation){
			vm.alertMessage = "You must donate at least " + vm.selectedCharity.MinimumDonation;
			vm.alertDisplay = 'block';
		
		}
		else{
			//vm.selectedCharity = vm.agencies[vm.selectedCharityIndex]
			PaymentService.setCharity(vm.selectedCharity);
			PaymentService.currentTab.value = 4;
			$state.go('payment.preview');
			vm.alertDisplay = 'none';
		}
	};
}