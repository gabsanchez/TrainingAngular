angular.module('History')
.controller('HistoryController', historyController);

historyController.$inject = ["historyData", "HistoryService", "$uibModal","$state", "blockUI", "growl"];

function historyController(historyData, HistoryService, $uibModal, $state, blockUI, growl){


	var vm = this;
	vm.getDetailTemplate = getDetailTemplate;
	vm.openModal = openModal;
	vm.donationsData = historyData;

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
				data: vm.donationsData
			};
	vm.historyGrid.appScopeProvider = vm;


	
	function getDetailTemplate(index){
		return "views/historyDetail.html";
	};

	function openModal(index){
		HistoryService.selectedDonation = angular.copy(vm.donationsData[index]);
		$state.go('history.historyDetail');
	}
}