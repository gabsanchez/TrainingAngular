angular.module('SuggestionBox')
	.factory('suggestions', Suggestions);

function Suggestions(){
	return {
		posts: [
			{
				postTitle: 'Free pizza at club meetings',
				upvotes: 15,
				comments: [{
					body: 'Yes!',
					upvotes: 50
				}],
			},
			{
				postTitle: 'End all club emails with Laffy Taffy jokes',
				upvotes: 9,
				comments: [],
			},
			{
				postTitle: 'Retrofit water fountain with Gatorade',
				upvotes: 75,
				comments: [],
			},
			{
				postTitle: 'Sing Bon Jovi\'s "Living on a Prayer" halfway through meetings.',
				upvotes: 3,
				comments: [],
			}
		]
	};
}