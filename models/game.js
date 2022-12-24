const {Schema, model} = require("mongoose");

const gameSchema = new Schema({
    players: {type: [ String ], require: true},
    court: {type: String, require: true},
    scope: {type: String, require: true},
    gameDate: {type: String, require: true},
    duration: {type: Number, require: true}
}, {collection: 'games', versionKey: false})

const Game = model('games', gameSchema);

module.exports = { Game };
