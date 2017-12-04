angular.module('Master')
.config(config);

config.$inject = ['$stateProvider', 'blockUIConfig', 'growlProvider'];

function config($stateProvider, blockUIConfig, growlProvider){
	blockUIConfig.autoBlock = false;

	growlProvider.globalPosition('bottom-center');
	growlProvider.globalDisableCountDown(true);
}