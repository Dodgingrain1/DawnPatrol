// express stuff
const express = require('express');
const app = express()
app.use(express.json())

const Plane = require('./Models/planeModel.js')

// mongoose stuff
const mongoose = require('mongoose');
//import mongoose from 'mongoose';
MONGODB_URI="mongodb://localhost:27017/dawnPatrol";

mongoose.set("strictQuery", false)
mongoose.connect(MONGODB_URI)
    .then(()=>{
        app.listen(3000, ()=> {
            console.log('DPEngine API listening on port 3000')
        })
    })
    .catch((error)=>console.log(error));

// routes
app.get('/',(req, res) =>{
    res.send('DPEngine API get response')
})

// gets all planes
app.get('/planes', async(req,res)=>{
    try{
        const planes = await Plane.find({});
        res.status(200).json(planes);
    }   
    catch(error){
        res.status(500).json({message: error.message});         
    } 
})

// get single plane by id
app.get('/planes/:id', async(req,res)=>{
    try{
        const {id} = req.params;
        const plane = await Plane.findById(id);
        res.status(200).json(plane);
    }
    catch (error){
        res.status(500).json({message: error.message});
    }
})

// saves a plane assuming properly formed req, return plane
app.post('/planes', async(req, res)=> {
    try{
        const plane = await Plane.create(req.body);
        res.status(200).json(plane);
    }
    catch(error){
        res.status(500).json({message: error.message});        
    }
})

// update a plane
app.put('/planes/:id', async(req, res)=>{
  try{
    const {id} = req.params;
    const plane = await Plane.findByIdAndUpdate(id,req.body);
    if (!plane){
        return res.status(404).json({message: `cannot find plane with id ${id}`});
    }
    const planeUpdated = await Plane.findById(id);
    res.status(200).json(planeUpdated);
  } 
  catch(error){
    res.status(500).json({message: error.message});  
  } 
})

// delete a plane
app.delete('/planes/:id', async(req, res)=>{
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