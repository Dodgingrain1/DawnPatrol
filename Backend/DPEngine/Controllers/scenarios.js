const Scenario = require('../Models/scenarioModel.js');

exports.scenarios_get_all = async(req,res, next)=>{
    try{
        const scenarios = await Scenario.find({})
            .then(docs =>{
                const response = {
                    count: docs.length,
                    scenarios: docs.map(doc =>{
                        return{
                            _id: doc._id,
                            description: doc.description,
                            players: doc.players,
                            playerCount: doc.playerCount,
                            request: {
                                type: 'GET',
                                description: 'get specific scenario',
                                url: 'http://localhost:3000/scenarios/' + doc._id
                            }
                        }
                    })
                }
                res.status(200).json(response);            
            });
    }   
    catch(error){
        res.status(500).json({message: error.message});         
    } 
};

exports.scenario_get_one = async(req,res, next)=>{
    try{
        const {id} = req.params;
        const scenario = await Scenario.findById(id);
        if (!scenario){
            return res.status(404).json({message: `cannot find scenario with id ${id}`});
        }
        const request = {
                type: 'GET',
                description: 'get all scenarios',
                url: 'http://localhost:3000/scenarios'
        };

        // there has to be a cleaner way to do this...
        const gameWithRequest = scenario.toJSON();
        gameWithRequest.request = request;
        res.status(200).json(gameWithRequest);
    }   
    catch(error){
        res.status(500).json({message: error.message});         
    } 
};

exports.scenario_save = async (req, res, next)=> {
    try{
        // create new scenario
        const scenario = new Scenario(req.body);
        await scenario.save();

        res.status(201).json({
            createdScenario: {
                _id: scenario._id,
                players: scenario.playerCount,
                description: scenario.description,
                request:{
                    type: 'GET',
                    description: 'get specific scenario',
                    url: 'http://localhost:3000/scenarios/' + scenario._id
                }
            }
        });
    }
    catch(error){
        res.status(500).json({message: error.message});        
    }
};

exports.scenario_replace = async(req, res, next)=>{
    try{
      const {id} = req.params;
      const scenario = await Scenario.findByIdAndUpdate(id,req.body, {new: true});
      if (!scenario){
          return res.status(404).json({message: `cannot find scenario with id ${id}`});
      }
  
      const request = {
          type: 'GET',
          description: 'get scenario information',
          url: `http://localhost:3000/scenarios/${id}`
      };
  
      // there has to be a cleaner way to do this...
      const scenarioWithRequest = scenario.toJSON();
      scenarioWithRequest._id = id;
      scenarioWithRequest.request = request;
      res.status(201).json(scenarioWithRequest);
    } 
    catch(error){
      res.status(500).json({message: error.message});  
    } 
  };

  exports.scenario_update = async(req, res, next)=>{
    try{
        const {id} = req.params;
        const scenario = await Scenario.findByIdAndUpdate(id,req.body, {new: true});
        if (!scenario){
            return res.status(404).json({message: `cannot find scenario with id ${id}`});
        }

        const request = {
            type: 'GET',
            description: 'get scenario information',
            url: `http://localhost:3000/scenarios/${id}`
        };

        // there has to be a cleaner way to do this...
        const scenariosWithRequest = scenario.toJSON();
        scenariosWithRequest.request = request;
        res.status(201).json(scenariosWithRequest);
    } 
    catch(error){
      res.status(500).json({message: error.message});  
    } 
};

exports.scenario_delete = async(req, res, next)=>{
    try{
      const {id} = req.params;
      const scenario = await Scenario.findByIdAndDelete(id);
      if (!scenario){
          return res.status(404).json({message: `cannot find scenario with id ${id}`});
      }
  
      const request = {
          type: 'GET',
          description: 'get all scenarios',
          url: 'http://localhost:3000/scenarios/'
      };
  
      // there has to be a cleaner way to do this...
      const scenarioWithRequest = scenario.toJSON();
      scenarioWithRequest.request = request;
      res.status(200).json(scenarioWithRequest);
    } 
    catch (error){
      res.status(500).json({message: error.message});  
    } 
  };
  