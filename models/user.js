const {Schema, model} = require("mongoose");
// const { courtSchema } = require("./court")

const userSchema = new Schema({
    name: String,
    email: String,
    password: String,
    birthday: Date,
    phoneNumber: String,
    address: String
}, {collection: 'users', versionKey: false})

const User = model('users', userSchema);
//
// const playerSchema = new Schema({
//     details: [ userSchema ],
//     rank: Number
// }, {collection: 'players', versionKey: false})
//
// const Player = model('players', playerSchema);
//
// const adminSchema = new Schema({
//     details: [ userSchema ],
//     supervisedCourt: [ courtSchema ]
// }, {collection: 'admins', versionKey: false})
//
// const Admin = model('admins', adminSchema);

module.exports = {User/*, Player, Admin*/};
