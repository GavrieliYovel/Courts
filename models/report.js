const {Schema, model, mongoose} = require("mongoose");

const reportSchema = new Schema({
    reported: {type: [mongoose.Types.ObjectId], ref: "users", require: true},
    reporter: {type: [mongoose.Types.ObjectId], ref: "users", require: true},
    details: {type: String, require: true},
    reportDate: {type: Date, require: true}
}, {collection: 'reports', versionKey: false})

const Report = model('reports', reportSchema);

module.exports = { Report };
