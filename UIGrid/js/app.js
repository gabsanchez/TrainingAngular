angular.module('gridApp', ['ngTouch', 'ui.grid'])
.controller('gridController', gridContol);


function gridContol(){

	var vm = this;

	vm.hideGrid = true;

	vm.gridOptions = {
		data: [
			{
				"name" : "Gabriel",
				"lastName" : "Sanchez",
				"age" : "22"
			},
			{
				"name" : "Valeria",
				"lastName" : "Higueros",
				"age" : "23"
			},
			{
				"name" : "Pablo",
				"lastName" : "Sanchez",
				"age" : "19"
			},
		]
	};
}