angular.module('hellogalaxy', ['ui.router'])

.config(function($stateProvider) {
  var helloState = {
    name: 'hello',
    url: '/hello',
    template: '<h3>hello world!</h3>'
  };

  var aboutState = {
    name: 'about',
    url: '/about',
    template: '<h3>Its the UI-Router hello world app!</h3>'
  };

  var helloGalaxyState = {
	name: 'helloGalaxy',
	url: '/hello',
	component: 'hello'
  };

  var peopleState = {
	name: 'people',
	url: '/people',
	component: 'people',
	resolve: {
	  people: function(PeopleService) {
		  return PeopleService.getAllPeople();
	  }
	}
  };

  var personState = { 
   name: 'people.person', 
   url: '/{personId}', 
   component: 'person',
   resolve: {
    person: function(people, $stateParams) {
      return people.find(function(person) { 
        return person.id === $stateParams.personId;
      });
    }
  }
}


  $stateProvider.state(helloState);
  $stateProvider.state(aboutState);
  $stateProvider.state(helloGalaxyState);
  $stateProvider.state(peopleState);
  $stateProvider.state(personState);
});

angular.module('hellogalaxy').component('hello', {
  template:  '<h3>{{$ctrl.greeting}} Solar System!</h3>' +
             '<button ng-click="$ctrl.toggleGreeting()">toggle greeting</button>',
           
  controller: function() {

  	var vm = this;
    vm.greeting = 'hello';
    vm.toggleGreeting = toggleGreeting;
  
    function toggleGreeting() {
      vm.greeting = (vm.greeting == 'hello') ? 'whats up' : 'hello';
    }
  }
});




angular.module('hellogalaxy').component('people', {
  bindings: { 
  	people: '<' 
  },

  template: '<!-- outer container -->'+
            '<div class="flex-h">'+  

              '<!-- inner container for people -->'+
             '<div class="people">'+
              
                '<h3>Some people:</h3>'+
                '<ul>'+
                  '<li ng-repeat="person in $ctrl.people">'+
                    '<a ui-sref-active="active"'+ 
                       'ui-sref="people.person({ personId: person.id})">'+
                      '{{person.name}}'+
                    '</a>'+
                  '</li>'+
                '</ul>'+
                
              '</div>'+
              
              '<!-- viewport for child view -->'+
              '<ui-view></ui-view>'+
            '</div>'
});

angular.module('hellogalaxy').component('person', {
  bindings: { 
    person: '<' 
  },

  template: '<h3>Name: {{$ctrl.person.name}}</h3>'
});

angular.module('hellogalaxy')
.factory('PeopleService', peopleService);

var data = [
      {
        name: "Jose",
        id: 0
      },
      {
        name: "Gabriel",
        id: 1
      },
      {
        name: "Valeria",
        id: 2
      }
    ];

function peopleService(){
	return {
		getAllPeople: getAllPeople,
		getPerson: getPerson
	};
	
	function getAllPeople(){
		return data;
	};
	function getPerson(index){
		return data[index];
	};
}