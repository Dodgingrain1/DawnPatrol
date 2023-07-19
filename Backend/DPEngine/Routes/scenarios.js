const express = require('express');
const router = express.Router();

const checkAuth = require('../middleware/check-auth.js');
const ScenarioController = require('../Controllers/scenarios.js');

// get all scenarios
router.get('/', checkAuth, ScenarioController.scenarios_get_all);

// get a single scenario
router.get('/:id', checkAuth, ScenarioController.scenario_get_one);

// saves a scenario assuming properly formed req, return scenario
router.post('/', checkAuth, ScenarioController.scenario_save);

// replace a scenario
router.put('/:id', checkAuth, ScenarioController.scenario_replace);

// update scenario
router.patch('/:id', checkAuth, ScenarioController.scenario_update);

// delete scenario
router.delete('/:id', checkAuth, ScenarioController.scenario_delete);

module.exports = router;
