angular.module('Payment')
.controller('AddressController', addressController);

addressController.$inject = ['countriesData', 'statesData', '$state', 'PaymentService'];

function addressController(countriesData, statesData, $state, PaymentService){

	var vm = this;

	

	vm.countries = countriesData;
	vm.usStates = statesData;

	vm.validateCountry = validateCountry;

	vm.getStateOption = getStateOption;

	vm.alertDisplay = 'none';

	function getStateOption(){
		if(vm.selectedCountry && vm.selectedCountry.ISO === 'us'){
			return 'js/apps/payment/payment-country/states.html'
		}
		else{
			return 'js/apps/payment/payment-country/province.html'
		}
	};
	function validateCountry(){
		if(vm.billingInfo.countries.$invalid){
			vm.alertMessage = "Please select a country";
			vm.alertDisplay = 'block';
		}
		else if(vm.billingInfo.address1.$invalid){
			vm.alertMessage = "Please enter an address";
			vm.alertDisplay = 'block';
		}
		else if(vm.billingInfo.city.$invalid){
			vm.alertMessage = "Please enter a city";
			vm.alertDisplay = 'block';
		}
		else if(vm.billingInfo.states && vm.billingInfo.states.$invalid){
			vm.alertMessage = "Please select a state";
			vm.alertDisplay = 'block';
		}
		else if(vm.billingInfo.province && vm.billingInfo.province.$invalid){
			vm.alertMessage = "Please enter a province";
			vm.alertDisplay = 'block';
		}
		else if(vm.billingInfo.zip1 && vm.billingInfo.zip1.$invalid){
			vm.alertMessage = "Please enter a valid zip code";
			vm.alertDisplay = 'block';
		}
		else if(vm.billingInfo.postalCode && vm.billingInfo.postalCode.$invalid){
			vm.alertMessage = "Please enter a valid postal code";
			vm.alertDisplay = 'block';
		}
		else{
			PaymentService.currentTab.value = 3;
			$state.go('payment.agency');
			vm.alertDisplay = 'none';
		}
	}
}