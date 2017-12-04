angular.module('donations2')
.controller('DonationsController', donationsController);

donationsController.$inject = ['apiService'];

function donationsController(apiService){
	var vm = this;

	vm.getDonationsData = getDonationsData;
	vm.search = search;
	vm.agencies = [];

	function getDonationsData(){
		apiService.getDonations(apiService.appToken, apiService.donorToken)
		.then(function(data){
			vm.donationsList = data.data.Data.PledgeList;
		})
		.catch(function(err){
			console.log(err);
		});

		apiService.getAgencies(apiService.appToken, apiService.donorToken)
		.then(function(data){
			var agenciesComplete = data.data.Data.PanelItemList;
			for (var i = 0; i < agenciesComplete.length; i++) {
				vm.agencies.push({
					name: agenciesComplete[i].Name,
					minDonation: i + 1//agenciesComplete[i].MinimumDonation
				})
			}
		})
		.catch(function(err){
			console.log(err);
		});
	};

	function search(){
		vm.agencyToSearch = vm.selectedAgency;
	}
}