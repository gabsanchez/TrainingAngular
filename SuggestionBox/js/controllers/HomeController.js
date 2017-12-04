angular.module('SuggestionBox')
	.controller('HomeController', HomeController);

HomeController.$inject = ['suggestions'];

function HomeController(suggestions) {

	var vm = this;

	vm.posts = suggestions.posts;
	vm.title = "Suggestion Box";
	vm.addSuggestion = addSuggestion;
	vm.upVote = upVote;

	function addSuggestion() {
 
	//if input empty, don't submit
	if(!vm.postTitle || vm.postTitle === "") {
	return;
	}
	 
	//push suggestion posts in suggestions.js
	vm.posts.push({
	postTitle: vm.postTitle,
	upvotes: 0,
	});
	 
	//after submit, clear input
	vm.postTitle = '';
	};

	function upVote(post){
		post.upvotes += 1;
	};
}