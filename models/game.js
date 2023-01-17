const {Schema, model, mongoose} = require("mongoose");
const { MongooseFindByReference } = require('mongoose-find-by-reference');
const {Court} = require("./court");

const gameSchema = new Schema({
    creator: {type: mongoose.Types.ObjectId, require: true},
    // players: {type: [ mongoose.Types.ObjectId ], ref: "users" , unique: true, require: true},
    court:  {
        type: { type: mongoose.Types.ObjectId, ref :'courts'},
        validate: {
            validator : (court) => Court.exists({_id : court}),
            message : inValidCourt => `${inValidCourt} is not a valid court`
        },
        required: true,
        unique: true
    },
    scope: {type: String, require: true},
    gameDate: {type: Date, require: true},
    endDate: {type: Date, require: true},
    team: {type: mongoose.Types.ObjectId  , ref: "teams" , unique: true, require: true},

}, {collection: 'games', versionKey: false})

gameSchema.plugin(MongooseFindByReference);

const Game = model('Game', gameSchema);

module.exports = { Game };
