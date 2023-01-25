const {Schema, model, mongoose} = require("mongoose");
const {User} = require("./user");
const {Court} = require ("./court");

const teamSchema = new Schema({
    name: String,
    players: {
        type: [{type: mongoose.Types.ObjectId, ref: 'users'}],
        validate: {
            validator: (players)=> {
                players.length > 0 && players.forEach((player) => User.exists({_id: player}) );
            },
            message : inValidPlayer => `${inValidPlayer} is not a valid player`
        },
    },
    details: String

}, {collection: 'teams', versionKey: false})

const Team = model('teams', teamSchema);

module.exports = { Team, teamSchema };
