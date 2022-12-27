const {Schema, model, mongoose} = require("mongoose");

const courtSchema = new Schema({
    name: {type: String, require: true},
    location: {
        LON: Number,
        LAT: Number
    },
    city: {type: String, require: true},
    scope: {type: [String], require: true},
    supervisor: {type: [mongoose.Types.ObjectId], ref: "users", unique: true},
    status: String
}, {collection: 'courts', versionKey: false})

const Court = model('Court', courtSchema);

module.exports = { Court };
