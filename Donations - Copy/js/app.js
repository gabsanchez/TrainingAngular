angular.module('donations',[
	'ngAnimate',
	'ngSanitize',
	'ngTouch', 'ui.grid',
	'ui.router',
	'ui.bootstrap',
	'ui.grid.pagination',
	'ui.select',
	'blockUI',
	'angular-growl'])

.config(config)
.run([
        "$state",
         function($state){
            $state.go('login');
         }
     ]);

config.$inject = ['$stateProvider', 'blockUIConfig', 'uiSelectConfig', 'growlProvider'];

function config($stateProvider, blockUIConfig, uiSelectConfig, growlProvider){

	blockUIConfig.autoBlock = false;

	uiSelectConfig.theme = 'selectize';
	uiSelectConfig.resetSearchInput = true;
	uiSelectConfig.appendToBody = true;

	growlProvider.globalPosition('bottom-center');
	growlProvider.globalDisableCountDown(true);
	//States
	var loginState = {
		name: 'login',
		url: '/login',
		templateUrl: 'views/login.html',
		controller: 'LoginController as login'
	};

	var paymentState = {
		name: 'payment',
		url: '/payment',
		templateUrl: 'views/payment.html',
		controller: 'PaymentController as payment',
		resolve: {

			paymentData: function(connection){
				return connection.paymentInfo(connection.appToken, connection.donorToken)
				.then(function(data){//Payment

					return data.data.Data;

				})
				.catch(function(err){
					return err;
				});
			},


			countryData: function(connection){
				return connection.countryInfo(connection.appToken)
				.then(function(data){//Countries
					return data.data.Data;
				})
				.catch(function(err){
					return err;
				});
			},
			statesData: function(connection){
				return connection.usStateInfo(connection.appToken)
				.then(function(data){//States
					return data.data.Data;
				})
				.catch(function(err){
					return err;
				});
			},
			agenciesData: function(connection){
				return connection.agenciesInfo(connection.appToken, connection.donorToken)
				.then(function(data){
					return data.data.Data;
				})
				.catch(function(err){
					return err;
				});
			}
		}
	};

	var paymentTypeState = {
		name: 'payment.type',
		url: '/payment-type',
		templateUrl: 'views/paymentInfo.html'
	};
	var creditCardState = {
		name: 'payment.creditCard',
		url: '/credit-card',
		templateUrl: 'views/creditCard.html'
	};
	var countryState = {
		name: 'payment.country',
		url: '/country',
		templateUrl: 'views/countryInfo.html'
	};
	var agencyState = {
		name: 'payment.agency',
		url: '/charity',
		templateUrl: 'views/charity.html'
	};
	var previewState = {
		name: 'payment.preview',
		url: '/preview',
		templateUrl: 'views/donationPreview.html'
	};
	var historyState = {
		name: 'history',
		url: '/history',
		controller: 'HistoryController as history',
		templateUrl: 'views/history.html'
	};

	var historyDetailState = {
		name: 'history.historyDetail',
		url: '/historyDetail',
		onEnter: ['$uibModal', function($uibModal){
			$uibModal.open({
				templateUrl: 'views/historyDetail.html',
				controller: 'HistoryDetailController as historyDetail'
			})
		}] 
	};


	registerStatefulModal(
		'/historyDetail', 
		'historyDetail',
		'HistoryDetailController as historyDetail',
		'views/historyDetail.html',
		'history',
		'',
		'',
		'');

	$stateProvider.state(loginState);
	$stateProvider.state(paymentState);
	$stateProvider.state(paymentTypeState);
	$stateProvider.state(creditCardState);
	$stateProvider.state(countryState);
	$stateProvider.state(agencyState);
	$stateProvider.state(previewState);
	$stateProvider.state(historyState);
	$stateProvider.state(historyDetailState);

	function registerStatefulModal(url, stateName, controller, template, parent, params, size, resolves) {
        params = params || {};
        resolves = resolves || angular.extend({},
                resolves,
                {
                    stateParams: ['$stateParams', function ($stateParams) {
                        return $stateParams;
                    }]
                });
        size = size || 'md';

        var modal;

        var newState = {
        	name: stateName,
            url: url,
            modal: true,
            parent: parent,
            params: params,
            onEnter: [
                '$stateParams',
                '$uibModal',
                '$previousState',
                function ($stateParams, $uibModal, $previousState) {
                    //log('stateful modal enter', stateName, resolves);
                    $previousState.memo('modalInvoker');
                    modal = $uibModal.open({
                        animation: true,
                        templateUrl: template,
                        controller: controller,
                        controllerAs: 'vm',
                        backdrop: 'static',
                        keyboard: false,
                        size: size,
                        resolve: resolves
                    });
                    // $scope.cancel functions should use modal.dismiss('cancel') or modal.dismiss('success') etc. to close the modal
                    // so we can restore the previous state
                    modal.result.catch(function (reason) {
                        // log('modal dismiss', reason);
                        if (reason)
                            $previousState.go('modalInvoker');
                    });
                    modal.result.then(function (result) {
                        //log('modal close', result);
                    });
                    modal.result.finally(function () {
                        modal.$destroy();
                    });
                }
            ],
            onExit: function () {
                if (modal) {
                    modal.close();
                }
            }
        }
        $stateProvider.state(newState);
    };

}