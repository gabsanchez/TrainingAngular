angular.module('Payment')
.controller('AddressController', addressController);

addressController.$inject = ['countriesData', 'statesData', '$state', 'PaymentService'];

function addressController(countriesData, statesData, $state, PaymentService){

	var vm = this;

	PaymentService.currentTab.value = 2;

	vm.selectedCountry = PaymentService.donnationData.country;
	vm.address1 = PaymentService.donnationData.address1;
	vm.address2 = PaymentService.donnationData.address2;
	vm.city = PaymentService.donnationData.city;
	vm.state = PaymentService.donnationData.state;
	vm.province = PaymentService.donnationData.province;
	vm.zip1 = PaymentService.donnationData.zip1;
	vm.zip2 = PaymentService.donnationData.zip2;
	vm.postalCode = PaymentService.donnationData.postal;

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
			PaymentService.setAddressInformation(vm.selectedCountry, vm.address1, vm.address2, vm.state, vm.province, vm.city, vm.zip1, vm.zip2, vm.postalCode)
			PaymentService.currentTab.value = 3;
			$state.go('payment.agency');
			vm.alertDisplay = 'none';
		}
	}
}