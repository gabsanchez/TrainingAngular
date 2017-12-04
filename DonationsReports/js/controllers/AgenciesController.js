angular.module('donations2')
.controller('AgenciesController', agenciesController);

agenciesController.$inject = ['apiService'];


function agenciesController(apiService){

	var vm = this;
	vm.getAgencies = getAgencies;
	vm.parsedAgencies = [];
	vm.sortList = sortList;
	vm.order = true;

	vm.sorts = apiService.sortingOptions;
	vm.sortOption = vm.sorts[0];

	function getAgencies(){
		apiService.getAgencies(apiService.appToken, apiService.donorToken)
		.then(function(data){
			var agenciesComplete = data.data.Data.PanelItemList;
			for (var i = 0; i < agenciesComplete.length; i++) {
				vm.parsedAgencies.push({
					name: agenciesComplete[i].Name,
					minDonation: i + 1//agenciesComplete[i].MinimumDonation
				})
			}
		})
		.catch(function(err){
			console.log(err);
		});
	};

	function sortList(){

		vm.order = vm.sortOption === "0";
	};
}