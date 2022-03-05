const mongoose = require('mongoose');
const bcrypt = require('bcrypt')
const {model} = require("mongoose");

//Schema
const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate: [(val)=>{},'Please Enter a valid email!']
    },
    password: {
        type: String,
        required: [true, 'Please enter a password'],
        minlength: [6, 'The minimum length is 6 characters!']
    },
    credit: {
        type: Number,
        default: 100.00
    },
    role: {
        type: String,
        default: 'user',
        required: true,
    }
});

//Books that user created
UserSchema.virtual('books', {
    ref: 'Book',
    foreignField: 'addedBy',
    localField: '_id',
});

UserSchema.set('toJSON', {virtuals: true})

//Password hashing
UserSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

//Password verification
UserSchema.methods.doesPasswordMatch = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
}

const User = mongoose.model('User', UserSchema);

module.exports = User;