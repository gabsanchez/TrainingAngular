angular.module('History')
.factory('HistoryRepository', historyRepo);

historyRepo.$inject = ['$http', '$q', 'MasterService'];

function historyRepo($http, $q, MasterService){

	function getGivingHistory(){
		return $http({
			"method": "GET", 
			"url": "http://1f734274.ngrok.io/OPPS.Web.API.Branch/api/Donor/GivingHistory",
			"data" : {},
			"params" : {
				"donorToken" : MasterService.donorToken,
				"apiKey" : "RTJ4+E4067P+mqIEizOkGu7nHAxRBfZzkE+/+r1/SbQ="
			},
			"headers": {
				"Accept" : "application/json",
				'Authorization': "Bearer " + MasterService.appToken
			}
		})
		.then(function (data) {
			return data.data.Data.PledgeList;
		})
		.catch(function (err) {
			return $q.reject(err);
		});
	}

	return {
		getGivingHistory: getGivingHistory
	}

}