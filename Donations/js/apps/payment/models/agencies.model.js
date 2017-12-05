angular.module('Payment')
.factory('AgenciesModel', agenciesModel);

function agenciesModel(){
	var model = function(){
		this.data = {
			PanelTitle: '',
			Agencies: []
		}

		this.setData = setData;
		this.getData = getData;
	};

	function setData(data){
		this.data.PanelTitle = data.PanelTitle;
		this.data.Agencies = data.PanelItemList;
	};

	function getData(){
		return this.data;
	}

	return model;
}