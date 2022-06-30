const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require("bcrypt");

const userSchema = Schema({
    userName: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    password: { type: String, required: true },
    role: { type: String, required: true, default: 'customer' }
}, { timestamps: true })

//before save document
userSchema.pre("save", async function(next) {
    //if not modified password do nothing
    if (!this.isModified("password")) return next();

    //hash password
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

module.exports = mongoose.model('User', userSchema)