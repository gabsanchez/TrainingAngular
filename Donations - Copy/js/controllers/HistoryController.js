angular.module('donations')
.controller('HistoryController', historyController);

historyController.$inject = ["connection", "$location", "$uibModal","$state", "blockUI", "growl"];

function historyController(connection, $location, $uibModal, $state, blockUI, growl){

	growl.success("Your donation has been sent", {ttl: 4000});

	var vm = this;
	vm.getPaymentType = getPaymentType;
	vm.getDetailTemplate = getDetailTemplate;
	vm.openModal = openModal;
	
	vm.parseDonationsData = parseDonationsData;

	vm.getGivingHistory = getGivingHistory;
	vm.givingHistoryBlockUI = blockUI.instances.get("givingHistoryBlock");

	vm.popover = {
		title: "Details",
		templateUrl: "views/historyDetails.html"
	}
	vm.historyGrid = {
				enablePaginationControls: true,
				paginationPageSizes: [25, 50, 75],
				paginationPageSize: 25,
				columnDefs: [
					{name: 'date'},
					{name: 'campaign'},
					{name: 'pledge'},
					{name: 'paymentType'},
					{name: 'total'},
					{
						name: 'view',
						cellTemplate: '<div><button ng-click="grid.appScope.openModal(row.entity.id)" type="button" class="btn btn-default">Details</button></div>'
					}
				],	
				//data: vm.donations
			};
	vm.historyGrid.appScopeProvider = vm;

	function getGivingHistory(){

		vm.givingHistoryBlockUI.start("Loading history...");

		connection.givingHistory(connection.appToken, connection.donorToken)
		.then(function(data){
			vm.donationsData = data.data.Data.PledgeList;

			vm.parseDonationsData();

			
		})
		.catch(function(err){
			return err;
		})
		.finally(function(){
			vm.givingHistoryBlockUI.stop();
		})
	}

	function getPaymentType(index){
		switch(vm.donationsData[index].PaymentType)
		{
			case 2:
				return "Credit Card";
				break;
			case 5:
				return "Cash";
				break;
		}
	};

	
	function parseDonationsData(){
		vm.donations = [];

		for (var i = 0; i < vm.donationsData.length; i++) {
			vm.donations.push({
				id: i,
				date: vm.donationsData[i].DateCreated,
				campaign: vm.donationsData[i].CampaignName,
				pledge: vm.donationsData[i].PaymentAmount,
				paymentType: vm.getPaymentType(i),
				total: vm.donationsData[i].PaymentAmount,
				selectedCharity: vm.donationsData[i].DesignationList[0].Name
			});
		}
			vm.historyGrid.data = vm.donations;
	}
	
	function getDetailTemplate(index){
		return "views/historyDetail.html";
	};

	function openModal(index){
		connection.selectedDonation = angular.copy(vm.donations[index]);
		$state.go('history.historyDetail');
	}
}