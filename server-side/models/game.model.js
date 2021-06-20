const mongoose = require("mongoose");

const gameSchema = new mongoose.Schema(
  {
    hostname: { type: String, require: true, trim: true },
    players: [
      {
        playername: { type: String, trim: true, require: true },
        round: [{ move: { type: Number, require: true, default: 1 } }],
      },
    ],
  },
  { timeStamps: true }
);

const Game = mongoose.model("Game", gameSchema);
module.exports = Game;
