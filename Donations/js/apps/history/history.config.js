angular.module('History')
.config(config);

config.$inject = ['$stateProvider', '$urlRouterProvider'];

function config($stateProvider, $urlRouterProvider){

	var historyState = {
		name: 'history',
		url: '/history',
		templateUrl: 'js/apps/history/giving-history/history.html',
		controller: 'HistoryController as history',
		resolve: {
			historyData: function(HistoryService){
				return HistoryService.getGivingHistory()
				.then(function(data){
					return data;
				})
				.catch(function(err){
					return err;
				})
			}
		}
	};

	var historyDetailState = {
		name: 'history.historyDetail',
		url: '/historyDetail',
		onEnter: ['$uibModal', function($uibModal){
			$uibModal.open({
				templateUrl: 'js/apps/history/history-detail/historyDetail.html',
				controller: 'HistoryDetailController as historyDetail'
			})
		}] 
	};

	


    $stateProvider.state(historyState);
    $stateProvider.state(historyDetailState);
}