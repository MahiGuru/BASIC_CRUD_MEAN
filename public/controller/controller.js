function AppCtrl($scope, $http) { 
    $scope.name = "Mahipal Gurjala";
    $scope.contact = {};
    $scope.updateBtn_visible = false;
    $scope.createBtn_visible = true;
	
	///Get the total contacts using Node API 
    $http.get("/api/getContacts").success(function (result) {
        //console.log(result);
        $scope.contactList = result; 

    });
	///Create Contact Click method 
	///^^^^^^^^inside it cosumes node API
    $scope.createContact = function() {
        $http.post("/api/createContact", $scope.contact).success(function(data) {
            //console.log("Success >>>>");
            $scope.contact = {}
            $scope.contactList = data;
        });
    }
	///Delete Contact Click method 
	///^^^^^^^^inside it cosumes node API
    $scope.deleteContact = function(_id) {
        $http.delete("/api/deleteContact/" + _id).success(function(data) {
           //console.log("Successfully Deleted one contact");
            $scope.contactList = data;
        });
    };
	
	///Update Contact Click method 
	///^^^^^^^^inside it cosumes node API
    $scope.updateContact = function() {
        $http.put("/api/updateContact/" + $scope.contact._id, $scope.contact).success(function(data) {
            //console.log("Contact Successfully updated");
            $scope.contactList = data;
            $scope.contact = {}
            $scope.createBtn_visible = true;
            $scope.updateBtn_visible = false;
        });
    };
	///Edit Contact Click method 
	///^^^^^^^^inside it cosumes node API
    $scope.editContact = function (_id) {
        $http.put("/api/editContact/" + _id).success(function (data) {
            $scope.createBtn_visible = false;
            $scope.updateBtn_visible = true; 
            if(data) {
                $scope.contact.name = data.name;
                $scope.contact.lastName = data.lastName;
                $scope.contact.age = data.age;
                $scope.contact.email = data.email;
                $scope.contact.location = data.location;
                $scope.contact._id = data._id;
            }

        });
    };


}