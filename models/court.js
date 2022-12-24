const {Schema, model} = require("mongoose");
// const { adminSchema } = require("./user")

const courtSchema = new Schema({
    location: { LON: Number,
                LAT: Number, require: true},
    city: {type: String, require: true},
    scope: {type: [String], require: true},
    supervisor: [ String ],
    status: String
}, {collection: 'courts', versionKey: false})

const Court = model('courts', courtSchema);

module.exports = { Court };
