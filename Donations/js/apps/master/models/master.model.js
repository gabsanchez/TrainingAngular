angular.module('Master')
.factory('DonationModel', donationModel);

function donationModel(){
	var model = function(){
		this.data = {
			paymentType: 0,
			frequency: 0,
			amount: 0,
			creditCard: {
				type: 0,
				number: '',
				name: '',
				verificationNumber: '',
				expirationDate: 0,
				email: ''
			},
			address: {
				address1: '',
				address2: '',
				country: {},
				state: {},
				province: '',
				postalCode: 0,
				zip1: 0,
				zip2: 0
			},
			charity: {}
		};

		this.getDonationModel = getDonationModel;
		this.setPayment = setPayment;
		this.setCreditCard = setCreditCard;
		this.setAddress = setAddress;
		this.setCharity = setCharity;

	}

	function getDonationModel(){
		if(this.data.amount && this.data.charity){
			return this.data;
		}
		else{
			return null;
		}
	};

	function setPayment(type, amount, frequency){
		this.data.paymentType = type;
		this.data.amount = amount;
		this.data.frequency = frequency;
	};

	function setCreditCard(creditCard){
		this.data.creditCard = creditCard;
	};

	function setAddress(address){
		this.data.address = address;
	};

	function setCharity(charity){
		this.data.charity = charity;
	};

	return model;
}