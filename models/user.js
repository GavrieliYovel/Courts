const {Schema, model, mongoose} = require("mongoose");
const bcrypt = require("bcrypt")

const userSchema = new Schema({
    name: {type: String, require: true},
    email: {type: String, require: true, unique: true},
    password: {type: String, require: true},
    birthday: {type: Date, require: true},
    phoneNumber: {type: String, require: true},
    address: {type: String, require: true},
    type: {type: String, require: true},
    rank: Number,
    supervisedCourt: {type: [ mongoose.Types.ObjectId ], ref: "courts", unique: false}
}, {collection: 'users', versionKey: false})

userSchema.pre('save', function (next) {
    if(this.isModified('password')) {
        bcrypt.hash(this.password, 8, (err, hash) => {
            if(err) return next(err)

            this.password = hash;
            next();
        })
    }
})

userSchema.methods.comparePassword = async function (password) {
    if (!password) throw new Error('Password')

    try {
        const result = await bcrypt.compare(password, this.password);
        return result;
    } catch (error) {
        console.log("error while comparing password")
    }
}
const User = model('User', userSchema);
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
