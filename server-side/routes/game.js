const router = require("express").Router();
const { Router } = require("express");
let Game = require("../models/game.model");

// get all games (development)
router.route("/").get((req, res) => {
  Game.find()
    .then((games) => res.json(games))
    .catch((err) => res.status.json("Error:" + err));
});
// create game by taking host name
router.route("/add").post((req, res) => {
  const new_game = {
    hostname: req.body.hostname,
    players: [],
  };
  console.log(req);
  const newGame = new Game(new_game);
  newGame
    .save()
    .then((game) => res.json(game))
    .catch((err) => res.status(400).json("Error: " + err));
});
// join game by gameid and player name
router.route("/join").post((req, res) => {
  const gameid = req.body.gameid;
  const playername = req.body.playername;
  Game.findById(gameid)
    .then((game) => {
      if (game.players.length < 4) {
        game.players.push({ playername, round: [] });
        game
          .save()
          .then((game) => {
            res.json(game);
          })
          .catch((err) => {
            res.status(400).json("Error: " + err);
          });
      } else res.json("filled");
    })
    .catch((err) => {
      res.status(400).json("Error: " + err);
    });
});
// get gamedata by taking gameid as input
router.route("/getgame").get((req, res) => {
  const gameid = req.query.gameid;
  Game.findById(gameid)
    .then((game) => {
      res.json(game);
    })
    .catch((err) => {
      res.status(400).json("Error: " + err);
    });
});
// add round by taking gameid, playerid and move as input
router.route("/addmove").post((req, res) => {
  const gameid = req.body.gameid;
  const playerid = req.body.playerid;
  const move = req.body.move;
  Game.findById(gameid)
    .then((game) => {
      // res.json(game);
      for (let a = 0; a < 4; a++) {
        if (game.players[a]._id == playerid) {
          game.players[a].round.push({ move });
          game
            .save()
            .then((player) => {
              res.json(game);
            })
            .catch((err) => res.status.json("Error:" + err));
        }
      }
    })
    .catch((err) => res.status.json("Error:" + err));
});
module.exports = router;
