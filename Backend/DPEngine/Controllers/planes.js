const Plane = require('../Models/planeModel.js');

// all planes
exports.planes_get_all = async(req,res, next)=>{
  try{
      const planes = await Plane.find({})
          .then(docs =>{
              const response = {
                  count: docs.length,
                  players: docs.map(doc =>{
                      return{
                          _id: doc._id,
                          id: doc.id,
                          planeType: doc.planeType,
                          request: {
                              type: 'GET',
                              description: 'get specific plane',
                              url: 'http://localhost:3000/planes/' + doc._id
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

// get single plane by id
exports.planes_get_one = async(req,res, next)=>{
  try{
      const {id} = req.params;
      const plane = await Plane.findById(id);
      if (!plane){
          return res.status(404).json({message: `cannot find plane with id ${id}`});
      }
      const request = {
              type: 'GET',
              description: 'get all planes',
              url: 'http://localhost:3000/planes/'
      };

      // there has to be a cleaner way to do this...
      const planeWithRequest = plane.toJSON();
      planeWithRequest.request = request;
      res.status(200).json(planeWithRequest);
  }   
  catch(error){
      res.status(500).json({message: error.message});         
  } 
};

/*
// saves a plane assuming properly formed req, return plane
router.post('/', async(req, res, next)=> {
    try{
        const plane = await Plane.create(req.body);
        res.status(201).json(plane);
    }
    catch(error){
        res.status(500).json({message: error.message});        
    }
})

// replace a plane
router.put('/:id', async(req, res, next)=>{
  try{
    const {id} = req.params;
    const plane = await Plane.findByIdAndUpdate(id,req.body);
    if (!plane){
        return res.status(404).json({message: `cannot find plane with id ${id}`});
    }
    const planeUpdated = await Plane.findById(id);
    res.status(201).json(planeUpdated);
  } 
  catch(error){
    res.status(500).json({message: error.message});  
  } 
})

// update a plane
router.patch('/:id', async(req, res, next)=>{
    try{
      const {id} = req.params;
      const plane = await Plane.findByIdAndUpdate(id,req.body);
      if (!plane){
          return res.status(404).json({message: `cannot find plane with id ${id}`});
      }
      const planeUpdated = await Plane.findById(id);
      res.status(201).json(planeUpdated);
    } 
    catch(error){
      res.status(500).json({message: error.message});  
    } 
  })
  

// delete a plane
router.delete('/:id', async(req, res, next)=>{
  try{
    const {id} = req.params;
    const plane = await Plane.findByIdAndDelete(id);
    if (!plane){
        return res.status(404).json({message: `cannot find plane with id ${id}`});
    }
    res.status(200).json(plane);
  } 
  catch (error){
    res.status(500).json({message: error.message});  
  } 
})
*/
