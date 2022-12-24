const {Schema, model} = require("mongoose");
const { adminSchema } = require("./user")

const courtSchema = new Schema({
    location: { LON: Number,
                LAT: Number},
    city: String,
    scope: [String],
    supervisor: [ {adminSchema} ],
    Status: String
}, {collection: 'courts', versionKey: false})

const Court = model('courts', courtSchema);

module.exports = { Court };
