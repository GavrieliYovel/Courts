const {Schema, model} = require("mongoose");

const reportSchema = new Schema({
    reported: {type: String, require: true},
    reporter: {type: String, require: true},
    details: {type: String, require: true},
    reportDate: {type: Date, require: true}
}, {collection: 'reports', versionKey: false})

const Report = model('reports', reportSchema);

module.exports = { Report };
