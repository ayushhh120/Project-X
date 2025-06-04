const mongoose = require('mongoose');
const bcrypt = require('bcrypt'); 
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
    fullname:{
       firstname:{
        type: String,
        require: true,
        minlength: [3, 'Firstname must be at least 3 characters long'],
       },

       lastname:{
        type: String,
        minlength: [3, 'Lastname must be at least 3 characters long'],
       },

    },
     email:{
        type: String,
        required: true,
        minlength: [5, 'email must be at least 5 characters long'],
       },

       password:{
        type: String,
        required: true,
        //  this because we dont need the user's password when finding users
        select: false,
       } ,
       socketID:{
        type: String
       }
})

// Generate a JSON Web Token for the user

userSchema.methods.generateAuthToken = function () {
    const token = jwt.sign({ _id: this._id },process.env.JWT_SECRET,{ expiresIn: '24h' });
    return token;
}

// Compare the provided password with the hashed password
userSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
}

// Hash the password before saving the user
userSchema.statics.hashPassword = async function (password) {
    return await bcrypt.hash(password, 10);
}
// Create a user model using the schema
const userModel = mongoose.model('User', userSchema);

module.exports = userModel;
