const {Schema, model, mongoose} = require("mongoose");

const gameSchema = new Schema({
    players: {type: [ mongoose.Types.ObjectId ], ref: "users" , require: true},
    court: {type:  mongoose.Types.ObjectId , ref: "courts" , require: true},
    scope: {type: String, require: true},
    gameDate: {type: String, require: true},
    duration: {type: Number, require: true}
}, {collection: 'games', versionKey: false})

const Game = model('Game', gameSchema);

module.exports = { Game };
