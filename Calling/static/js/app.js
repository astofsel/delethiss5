var app = angular.module('addCompany', ['ngRoute', 'xeditable', 'ui.router', 'ngAnimate', 'ngMaterial', 'ngMessages', 'material.svgAssetsCache']);

app.controller('callCtrl', ['$scope', '$http', '$location', '$state', '$route', '$window',
	function($scope, $http, $location, $state, $route, $window) {
		var self = this;
		// The below code sorts the objects and chooses the one nearest to Date.now
		var fetchNextCompany = function() {
			$http.get('http://127.0.0.1:8000/CallAccount/api/CallAccount/?format=json').then(function(response) {
				self.sortedCompanies = response.data;				
				self.sortedCompanies.sort(function(a,b) { 				
				return new Date(b.Next_FU).getTime() - new Date(a.Next_FU).getTime()	
			});				
				self.nextCompany = self.sortedCompanies.slice(-1).pop();				
				}, function(errResponse) {
					console.error('Error while fetching data'); 
				});	
		};
		fetchNextCompany();

		self.CallBackLater = function(Next_FU, notes, nextCompany){
			nextCompany.Notes_CallAccount = document.getElementById(notes).value			
			// The below code transforms readable DateTime of the user into ISO time. It also removes the zulu time if there is any. 
			// If this does not function properly, REST will give a 400 Bad Request error. Very annoying. 
			// Ideally this should be made clearner, as right now single digits will give errors. So dates and hours have to be written
			// in double digits (e.g. 01:00, not 1:00)
			var hour = document.getElementById(Next_FU).innerHTML.substr(0,5);		
			var day = document.getElementById(Next_FU).innerHTML.charAt(7) + document.getElementById(Next_FU).innerHTML.charAt(8);
			var month = document.getElementById(Next_FU).innerHTML.charAt(10) + document.getElementById(Next_FU).innerHTML.charAt(11);
			var year = document.getElementById(Next_FU).innerHTML.substr(13,14);
			nextCompany.Next_FU = year + '-' + month + '-' + day + 'T' + hour;					
			$http.put('http://127.0.0.1:8000/CallAccount/api/CallAccount/' + nextCompany.uniqueID + '/', nextCompany)
			.then(function(response) {
				console.log('nextCompany edited successfully');
			}, function(errResponse) {
				console.error('Error with put request'); 
			});

		}

		$scope.reloadRoute = function() {
			console.log('reloading window');
			$window.location.reload();
		}
	}
]);

// This controller includes the functions to add/delete the companies added to the database
app.controller('listCtrl', ['$scope', '$http', '$location', '$mdDialog',
	function($scope, $http, $location, $mdDialog) {
	// this defines the parameters for fetchcompanies() 	
	var self = this
	self.lastCreated = '';
	self.items = [];
	self.newCompany = {};
	self.nextCompany = []; 

	// this returns a promise with a list of companies using the API
	var fetchCompanies = function() {
		return $http.get('http://127.0.0.1:8000/CallAccount/api/CallAccount/?format=json').then(function(response) {
			self.items = response.data;
		}, function(errResponse) {
			console.error('Error while fetching data'); 
		}); 
	}; 
	fetchCompanies();

	self.add = function() {
		var generateUUID = function() {
				    var d = new Date().getTime();
				    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
				        var r = (d + Math.random()*16)%16 | 0;
				        d = Math.floor(d/16);
				        return (c=='x' ? r : (r&0x3|0x8)).toString(16);
				    });
				    return uuid;
				};
		self.newCompany.uniqueID = generateUUID();
		$http.post('http://127.0.0.1:8000/CallAccount/api/CallAccount/', self.newCompany)
		.then(function(response) {
			console.log(self.newCompany.CompanyName + ' posted successfully');
			self.lastCreated = response.data
			fetchCompanies();
		}, function(errResponse) {
			console.error('Error while posting & fetching data'); 
		});
	};

	self.deleteCompany = function(company) {
		var uniqueID = company.uniqueID;
		$http.delete('http://127.0.0.1:8000/CallAccount/api/CallAccount/' + uniqueID + '?format=json')
		.then(function(response) {
			fetchCompanies();
			console.log(company.CompanyName+' was successfully deleted!');				
		})
	};

	// This is the code for the modal that is super cool!!!
	$scope.openModal = function(company) {
		$mdDialog.show(
			$mdDialog.alert()
			.clickOutsideToClose(true)
			.title('Company Name: ' + company.CompanyName)
			.textContent('Notes: ' + company.Notes_CallAccount)
			.ok('Close')
			.openFrom(angular.element(document.querySelector('#ViewButton')))
			.closeTo(angular.element(document.querySelector('#ViewButton')))
		);

	};

// The below modal is more complex than the one above as the template is taking as html. However I can't seem to pass the company object to the html
	$scope.showAdvanced = function(company) {
    $mdDialog.show({
    	locals:{dataToPass: company},
    	controller: DialogController,
    	templateUrl: 'dialog.tmpl.html',
    	parent: angular.element(document.body),
    	clickOutsideToClose:true,
    	fullscreen: $scope.customFullscreen 
	  })
    console.log(company);
	};
	var mdDialogCtrl = function ($scope, dataToPass) { 
	    $scope.mdDialogData = dataToPass  
	}
	function DialogController($scope, $mdDialog) {
		$scope.cancel = function() {
			$mdDialog.cancel();
		};
	}
	   
}]);



// This is the router that the navbar uses 
// Add a controller for each route 
// The activetab assigns which tab is active, allowing us to add an .active class to the navbar button
app.config(function($routeProvider) {
	$routeProvider
	.when("/SelectCallAccount", {
		templateUrl: 'SelectCallAccount', 
		controller: 'listCtrl', 
		activetab: "SelectCallAccount"
	})
	.when('/nextcall', {
		templateUrl: 'nextcall', 
		controller: 'callCtrl',
		activetab: "nextcall", 
	});
	// $locationProvider.html5Mode(true);
}).run(function ($rootScope, $route) {
    $rootScope.$route = $route;
});


// This directive enables a <button> to use routing
app.directive('goClick', function ( $location ) {
  return function ( scope, element, attrs ) {
    var path;

    attrs.$observe('goClick', function (val) {
      path = val;
    });

    element.bind( 'click', function () {
      scope.$apply( function () {
        $location.path( path );
      });
    });
  };
});

// This sets the theme for the xeditable to work
app.run(function(editableOptions) {
  editableOptions.theme = 'bs3'; 
});