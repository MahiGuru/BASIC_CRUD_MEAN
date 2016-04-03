var express = require('express');
var app = express();
var bodyParser = require("body-parser");
var methodOverride = require("method-override");
var ContactList = require('./public/db/auth.js');

app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({ 'extended': 'true' }));
app.use(bodyParser.json());
app.use(bodyParser.json({type : "application/vnd.api+json"}));
app.use(methodOverride());

///Get All contact details using below API
app.get("/api/getContacts", function(req, res) {
    ContactList.find({}, function(err, data) {
        if(err) throw err;
        res.json(data);
    });
});
///POST contact details using below API
app.post("/api/createContact", function(req, res) {
    console.log(req.body);
    // create a new user
    var newContact = new ContactList(req.body);
    // save the user
    newContact.save(function (err, data) {
        if (err) res.send(err); 
        console.log('Contact created!');
        ContactList.find({}, function (err, data) {
            if (err) throw err;
            res.json(data);
        }); 
    }); 
});

///EDIT contact details using below API
app.put("/api/editContact/:contactId", function(req, res) { 
    ContactList.findByIdAndUpdate(req.params.contactId, req.body, function (err, contact) {
        if (err) throw err;

        res.send(contact);
    });
});

///UPDATE contact details using below API
app.put("/api/updateContact/:contactId", function (req, res) {
    console.log(req.body);
    ContactList.findByIdAndUpdate(req.params.contactId, req.body, function (err, contact) {
        if (err) throw err;
        
        ContactList.find({}, function (err, data) {
            if (err) throw err;
            res.json(data);
        }); 
    });

});

///DELETE contact details using below API
app.delete("/api/deleteContact/:contactId", function (req, res) {
    console.log(req.params.contactId);
    
    // find the user with id 4
    ContactList.findOneAndRemove({ _id: req.params.contactId }, function (err) {
        if (err) throw err; 
        // we have deleted the user
        console.log('User deleted!');
        ContactList.find({}, function (err, data) {
            if (err) throw err;
            res.json(data);
        }); 

    });
    
});
 

app.listen(3000, function(){
	console.log("Server running on port 3000")
	
});
