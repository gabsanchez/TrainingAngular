angular.module('donations2', ['ui.router', 'ui.bootstrap'])
.config(config);


function config($stateProvider, $urlRouterProvider){

	var menuState = {
		name: 'menu',
		url: '/menu',
		templateUrl: 'views/menu.html',
		controller: 'MenuController as menu',
		resolve:{
			appToken: function(apiService){
				return apiService.getAppToken()
				.then(function(data){
					apiService.setAppToken(data.data);
					return apiService.getDonorToken(data.data)
					.then(function(data){
						apiService.setDonorToken(data.data.Data.DonorToken);
					})
					.catch(function(err){
						console.log(err);
					});
				})
				.catch(function(err){
					return err;
				});
			}
		}
	};

	var agenciesReportState = {
		name: 'menu.agencies',
		url: '/agencies',
		templateUrl: 'views/agencies.html',
		controller: 'AgenciesController as agencies'
	};
	var donationsReportState = {
		name: 'menu.donations',
		url: '/donations',
		templateUrl: 'views/donations.html',
		controller: 'DonationsController as donations'
	};

	var personInfoState = {
		name: 'menu.personInfo',
		url: '/person-info',
		templateUrl: 'views/personInfo.html',
		controller: 'PersonInfoController as person',
		
	};
	var paymentState = {
		name: 'menu.payment',
		url: '/payment',
		templateUrl: 'views/payment.html',
		controller: 'PaymentController as payment',
	};

	var paymentDetailState = {
		name: 'menu.payment.paymentDetail',
		url: '/paymentDetail',
		onEnter: ['$uibModal', function($uibModal){
			$uibModal.open({
				ariaLabelledBy: 'modal-title',
				ariaDescribedBy: 'modal-body',
				templateUrl: 'views/paymentDetail.html',
				controller: 'PaymentDetailController as paymentDetail'
			})
		}] 
	}

	$stateProvider.state(menuState);
	$stateProvider.state(agenciesReportState);
	$stateProvider.state(donationsReportState);
	$stateProvider.state(personInfoState);
	$stateProvider.state(paymentState);
	$stateProvider.state(paymentDetailState);
	$urlRouterProvider.otherwise('/menu');
}
