angular.module('Payment')
.factory('AgenciesModel', agenciesModel);

function agenciesModel(){
	var model = function(){
		this.data = {
			PanelTitle: null,
			Agencies: [],
			SelectedAgency: {}
		};

		this.setData = setData;
		this.getData = getData;
		this.setSelectedAgency = setSelectedAgency;
		this.getSelectedAgency = getSelectedAgency;
	};

	function setData(data){
		this.data.PanelTitle = data.PanelTitle;
		this.data.Agencies = data.PanelItemList;
	};

	function setSelectedAgency(charity){
		this.data.SelectedAgency = angular.copy(charity);
	};

	function getData(){
		return this.data;
	};

	function getSelectedAgency(){
		return this.data.SelectedAgency;
	}

	return model;
}