angular.module('UIbootstrapExample').controller("BootController", controll);

function controll(){
	var vm = this;
	vm.addAlert = addAlert;
	vm.closeAlert = closeAlert;
	vm.tabs = [
		{
			title: "Tab 1",
			content: ""
		},
		{
			title: "Tab 2",
			content: ""
		}
	];
	vm.alerts = [
		{
			type: 'danger',
      		msg: 'I am the danger... I\'m the one who knocks.'
		},
		{
			type: 'success',
      		msg: 'This app works.'
		}
	];
	vm.popover = {
		title: "Details",
		templateUrl: "views/details.html"
	}

	function addAlert(){
		vm.alerts.push({type: 'warning', msg: 'I\'m warning you, I am a warning'});
	};

	function closeAlert(index){
		vm.alerts.splice(index, 1);
	};
}