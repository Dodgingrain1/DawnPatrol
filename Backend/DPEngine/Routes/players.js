const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/check-auth.js');
const PlayerController = require('../Controllers/players.js');

// all players
router.get('/', checkAuth, PlayerController.players_get_all);

// get a single player
router.get('/:id', checkAuth, PlayerController.players_get_one);

// saves a player assuming properly formed req, return player
router.post('/', checkAuth, PlayerController.players_save_one);

// replace a player
router.put('/:id', checkAuth, PlayerController.players_replace_one);

// update a player
router.patch('/:id', checkAuth, PlayerController.players_update);

// delete a player
router.delete('/:id', checkAuth, PlayerController.players_delete);

module.exports = router;
