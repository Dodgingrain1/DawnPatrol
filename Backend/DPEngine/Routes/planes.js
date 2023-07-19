const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/check-auth.js');
const PlaneController = require('../Controllers/planes.js');

// all planes
router.get('/', checkAuth, PlaneController.planes_get_all);

// get single plane by id
router.get('/:id', checkAuth, PlaneController.planes_get_one);

module.exports = router;