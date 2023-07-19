const express = require('express');
const router = express.Router();

const checkAuth = require('../middleware/check-auth.js');
const GamesController = require('../Controllers/games.js');

// all games
router.get('/', checkAuth, GamesController.games_get_all);

// get a single game
router.get('/:id', checkAuth, GamesController.games_get_one);

// saves a game assuming properly formed req, return game
router.post('/', checkAuth, GamesController.games_save);

// replace a game
router.put('/:id', checkAuth, GamesController.games_replace);

// update game
router.patch('/:id', checkAuth, GamesController.games_update);

// delete game
router.delete('/:id', checkAuth, GamesController.games_delete);

module.exports = router;
