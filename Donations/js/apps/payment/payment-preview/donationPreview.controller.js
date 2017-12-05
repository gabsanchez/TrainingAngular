angular.module('Payment')
.controller('PreviewController', previewController);

previewController.$inject = ['$state', 'PaymentService', 'growl'];

function previewController($state, PaymentService, growl){

	var vm = this;

	vm.donnation = PaymentService.donnationData;
	vm.donnation.annualAmount = PaymentService.annualAmount;
	vm.today = PaymentService.getToday();

	vm.setPledge = setPledge;

	function setPledge(){
		PaymentService.sendDonation()
		.then(function(){
			$state.go('history');
			growl.success("Your donnation has been sent", {ttl: 4000});
		})
		.catch(function(){
			$state.go('history');
			growl.error("Something went wrong", {ttl: 4000});
		})
	}
}