const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const validator = require('validator')
const Schema = mongoose.Schema

// User schema
const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
})

// Static signup method
userSchema.statics.signup = async function(username, email, password) {

    // Validation
    if(!email || !password || !username) {
        throw Error('All fields must be filled')
    }
    if(!validator.isEmail(email)) {
        throw Error('Email is not valid')
    }
    if(!validator.isStrongPassword(password)) {
        throw Error('Password not strong enough')
    }

    // Checking if username or email exists
    const emailExists = await this.findOne({ email })
    const usernameExists = await this.findOne({ username })

    if (emailExists) {
        throw Error("Email already in use")
    }

    if (usernameExists) {
        throw Error("Username already in use")
    }

    const salt = await bcrypt.genSalt()
    const hash = await bcrypt.hash(password, salt)

    const user = await this.create({ username, email, password: hash })

    return user;
}

// Static login method
userSchema.statics.login = async function(username, password) {
    
    // Validation
    if(!username || !password) {
        throw Error('All fields must be filled')
    }

    // Finding a user by username
    const user = await this.findOne({ username })

    if(!user) {
        throw Error("Invalid Username")
    }
    
    const match = await bcrypt.compare(password, user.password)

    if(!match) {
        throw Error("Incorrect password")
    }

    return user;
}

module.exports = mongoose.model('User', userSchema)