const Joi = require('joi');
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    Firstname: {
        type: String,
        required: true,
        lowercase:true,
        minlength: 2,
        maxlength: 50
    },
    Lastname: {
        type: String,
        required: true,
        lowercase:true,
        minlength: 2,
        maxlength: 50
    },
    Birthday: {
        type: String,
        required: true,
        lowercase:true,
        minlength: 5,
        maxlength: 50
    },
    Age: {
        type: Number,
        required: true
    },
    Hobby: {
        type: String,
        required: true,
        lowercase:true   
    }
});
const User = mongoose.model('User', userSchema);

function validateUser(user) {
    const schema = {
         Firstname: Joi.string().min(2).max(50).required(),   //validate
         Lastname: Joi.string().min(2).max(50).required(),
         Birthday: Joi.string().min(5).max(255).required(),
         Age: Joi.number().required(),
         Hobby:Joi.string().min(5).max(255).required()
    };

    return Joi.validate(user, schema);

}

module.exports.userSchema = userSchema;
module.exports.User = User;
module.exports.validate = validateUser;