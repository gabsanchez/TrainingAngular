angular.module('donations2')
.controller('AddressController', addressController);

addressController.$inject = ['apiService','countriesData', 'statesData', '$uibModalInstance'];

function addressController(apiService, countriesData, statesData, $uibModalInstance){
	var vm = this;

	vm.countries = countriesData;
	vm.states = statesData;

	vm.getData = getData;
	vm.setData = setData;
	vm.ok = ok;
	vm.cancel = cancel;
	



	function getData(){
		vm.address = {};
		if(apiService.personalInfo.country){
			angular.forEach(vm.countries, function(value, key){
				if(value.ISO === apiService.personalInfo.country.ISO){
					vm.address.country = value;
				}
			});

			if(apiService.personalInfo.state){

				angular.forEach(vm.states, function(value, key){
					if(value.Code === apiService.personalInfo.state.Code){
						vm.address.state = value;
					}
				});
			}
			
			vm.address.province = apiService.personalInfo.province;
			vm.address.postalCode = apiService.personalInfo.postalCode;
		}
		else{
			vm.address.country = vm.countries[0];
			vm.address.state = vm.states[0];
		}
	}

	function setData(){

		apiService.personalInfo.country= vm.address.country;
		apiService.personalInfo.state = vm.address.state
		apiService.personalInfo.province = vm.address.province;
		apiService.personalInfo.postalCode = vm.address.postalCode;

	}

	function ok(){
		if(vm.addressForm.$valid){
			vm.setData();
			$uibModalInstance.close();
		}
		else{
			alert("Please fill all the fields");
		}
	};

	function cancel(){
		$uibModalInstance.dismiss();
	};

	
}