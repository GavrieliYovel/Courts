const {Schema, model} = require("mongoose");
const locationSchema = new Schema({
    LON: Number,
    LAT: Number
});

const courtSchema = new Schema({
    name: {type: String, require: true},
    location: [locationSchema],
    city: {type: String, require: true},
    scope: {type: [String], require: true},
    supervisor: [ String ],
    status: String
}, {collection: 'courts', versionKey: false})

const Court = model('courts', courtSchema);

module.exports = { Court };
