angular.module('donations2')
.controller('PersonInfoController', personController);

personController.$inject = ['apiService', '$uibModal'];

function personController(apiService, $uibModal){

	var vm = this;

	vm.setData = setData;
	vm.openModal = openModal;
	vm.stateProvinceLabel = 'State';
	vm.clearForm = clearForm;
	vm.personalInformation = {};
	vm.address = {};

	function setData(){
		apiService.setPersonInfo(vm.firstName, vm.lastName, vm.birthDate, vm.address.country, vm.address.state, vm.address.postalCode)
	}

	function openModal(){
		vm.modalInstance = $uibModal.open({
			ariaLabelledBy: 'modal-title',
			ariaDescribedBy: 'modal-body',
			templateUrl: 'views/address.html',
			controller: 'AddressController as personAddress',
			resolve: {
				countriesData: function(apiService){
					return apiService.getCountries(apiService.appToken)
					.then(function(data){
						return data.data.Data;
					})
				},

				statesData:function(apiService){
					return apiService.getStates(apiService.appToken)
					.then(function(data){
						return data.data.Data;
					})
				}
			}
		});
		vm.modalInstance.result.then(function(){
			vm.address.country = apiService.personalInfo.country;
			vm.address.state = apiService.personalInfo.state;
			vm.address.province = apiService.personalInfo.province;
			vm.address.postalCode = apiService.personalInfo.postalCode;
		});
	};

	function clearForm(){
		vm.personalInformation= {};
		vm.address = {};
		apiService.personalInfo = {};
		vm.infoForm.$setPristine();
		vm.infoForm.$setUntouched();
	}
}