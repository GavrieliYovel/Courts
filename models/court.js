const {Schema, model, mongoose} = require("mongoose");

const courtSchema = new Schema({
    name: {type: String, require: true},
    location:{ type:{
        LON: Number,
        LAT: Number
    }, require: true },
    city: {type: String, require: true},
    scope: {type: [String], require: true},
    supervisor: {type: [mongoose.Types.ObjectId], ref: "users"},
    games: {type: [mongoose.Types.ObjectId], ref: "games"},
    status: String
}, {collection: 'courts', versionKey: false})

const Court = model('Court', courtSchema);

module.exports = {Court};
