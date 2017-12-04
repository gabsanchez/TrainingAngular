angular.module('SuggestionBox')
	.controller('SuggestionController', SuggestionController);

	SuggestionController.$inject = ['suggestions','$routeParams'];

function SuggestionController(suggestions, $routeParams){

	var vm = this;

	vm.post = suggestions.posts[$routeParams.id];
	vm.addComment = addComment;
	vm.upVoteComment = upVoteComment;
	function addComment(body){
		//if input empty, don't submit
		if(!body || body === "") {
		return;
		}
		 
		//push comment in suggestions.js
		vm.post.comments.push({
		body: body,
		upvotes: 0,
		});
	};
	function upVoteComment(comment){
		comment.upvotes += 1;
	};
}
