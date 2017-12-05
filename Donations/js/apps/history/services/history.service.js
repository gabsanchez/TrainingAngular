angular.module('History')
.service('HistoryService', historyServ);

historyServ.$inject = ['$q', 'HistoryRepository'];

function historyServ($q, HistoryRepository){

	return {
		selectedDonation: {},

		getGivingHistory: getGivingHistory
	}

	function getGivingHistory(){
		return HistoryRepository.getGivingHistory()
		.then(function(data){

			var donationsList = [];

			for (var i = 0; i < data.length; i++) {
					donationsList.push({
					id: i,
					date: data[i].DateCreated,
					campaign: data[i].CampaignName,
					pledge: data[i].PaymentAmount,
					paymentType: 'Cash',
					total: data[i].PaymentAmount,
					selectedCharity: data[i].DesignationList[0].Name
				});
			}

			return donationsList;
		});
	}
}