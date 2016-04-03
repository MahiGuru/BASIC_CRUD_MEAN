var mongoose = require('mongoose');
var options = {
    dbName : "employes"
}
//connect to "mlab" using authentication.
mongoose.connect('mongodb://<dbusername>:<dbpassword>@ds037768.mlab.com:37768/employes');
var Schema = mongoose.Schema;

//defining schema 
var userSchema = new Schema({
    name: { type: String, required: true, unique: true },
    lastName: { type: String, required: true },
    age: Number,
    email: String,
    location: String,
    created_at: Date,
    updated_at: Date
});

// on every save, add the date
userSchema.pre('save', function (next) {
    // get the current date
    var currentDate = new Date();
    
    // change the updated_at field to current date
    this.updated_at = currentDate;
    
    // if created_at doesn't exist, add to that field
    if (!this.created_at)
        this.created_at = currentDate;
    next();
});
//creating Model using "Collection Name"
var ContactList = mongoose.model('contactList', userSchema);

///export the Contact module.
module.exports = ContactList;