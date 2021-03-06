angular.module('Payment')
.config(config);

config.$inject = ['$stateProvider', '$urlRouterProvider'];

function config($stateProvider, $urlRouterProvider){
	var paymentState = {
		name: 'payment',
		url: '/payment',
		templateUrl: 'js/apps/payment/payment-master/payment.html',
		controller: 'PaymentController as payment',
		resolve: {
			paymentData: function(PaymentService){
				return PaymentService.getPaymentOptions()
				.then(function(data){
					return data;
				})
				.catch(function(err){
					return err;
				})
			},

			agenciesData: function(PaymentService){
				return PaymentService.getAgencies()
				.then(function(data){
					return data;
				})
				.catch(function(err){
					return err;
				});
			}
		}
	};

	var paymentTypeState = {
		name: 'payment.paymentType',
		url: '/payment-type',
		templateUrl: 'js/apps/payment/payment-type/paymentType.html',
		controller: 'PaymentTypeController as paymentType'
	};

	var creditCardState = {
		name: 'payment.creditCard',
		url: '/credit-card',
		templateUrl: 'js/apps/payment/payment-credit-card/creditCard.html',
		controller: 'CreditCardController as creditCard'
	};

	var addressState = {
		name: 'payment.address',
		url: '/address',
		templateUrl: 'js/apps/payment/payment-country/countryInfo.html',
		controller: 'AddressController as address',
		resolve: {
			countriesData: function(PaymentService){
				return PaymentService.getCountries()
				.then(function(data){
					return data;
				})
				.catch(function(err){
					return err;
				});
			},

			statesData: function(PaymentService){
				return PaymentService.getStates()
				.then(function(data){
					return data;
				})
				.catch(function(err){
					return err;
				});
			}
		}
	};

	var charityState = {
		name: 'payment.agency',
		url: '/agency',
		templateUrl: 'js/apps/payment/payment-agency/charity.html',
		controller: 'AgencyController as agency'
	};

	var previewState = {
		name: 'payment.preview',
		url: '/preview',
		templateUrl: 'js/apps/payment/payment-preview/donationPreview.html',
		controller: 'PreviewController as preview'
	};

	$stateProvider.state(paymentState);
	$stateProvider.state(paymentTypeState);
	$stateProvider.state(creditCardState);
	$stateProvider.state(addressState);
	$stateProvider.state(charityState);
	$stateProvider.state(previewState);

	$urlRouterProvider.otherwise('/login');
}