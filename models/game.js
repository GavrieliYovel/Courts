const {Schema, model, mongoose} = require("mongoose");

const gameSchema = new Schema({
    creator: {type: mongoose.Types.ObjectId, require: true},
    players: {type: [ mongoose.Types.ObjectId ], ref: "users" , unique: true, require: true},
    court: {type:  mongoose.Types.ObjectId , ref: "courts", unique: true , require: true},
    scope: {type: String, require: true},
    gameDate: {type: Date, require: true},
    duration: {type: Number, require: true}
}, {collection: 'games', versionKey: false})

const Game = model('Game', gameSchema);

module.exports = { Game };
