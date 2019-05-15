const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const model = mongoose.model;

const PlayersShema = new Schema({
    players: [
        String
    ],
}, {
    timestamps: true,
});

const PlayersModel = model("players", PlayersShema);
module.exports = PlayersModel;