const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

//const Player = require('../Models/userModel.js');
const User = require('../Models/userModel.js');

// user signup
exports.user_signup= (req, res, next)=> {
    try{
        // check to make sure the user doesn't already exist
        User.find({email: req.body.email})
        .exec()
        .then(user =>{
            if (user.length >=1){
                return res.status(409).json({
                    message: 'User already exists'
                });
            } else{
                // hash password, create user
                bcrypt.hash(req.body.password,10, (err, hash)=>{
                    if (err){
                        return res.status(500).json({error: err})
                    } else{
                        const user = new User({
                            email: req.body.email,
                            password: hash
                        });

                        user.save().then(result =>{
                            res.status(201).json({
                                message: 'User created'
                            });
                        });
                    }
                })                
            }           
        });
    }
    catch(error){
        res.status(500).json({message: error.message});        
    }
};

// login user, get jwt
exports.user_login = async (req, res, next) =>{
    try{
        await User.find({email: req.body.email})
        .then(users =>{
            if (users.length<1){
                return res.status(401).json({
                    message: 'Auth failed'
                });
            }
            bcrypt.compare(req.body.password, users[0].password, (err,result)=>{
                if (err){
                    return res.status(401).json({
                        message: 'Auth failed'
                    });
                }

                if (result){
                    const jwToken = jwt.sign({
                        _id: users[0]._id
                    }
                    , "DawnPatrolAPISecretKey", 
                    {
                        expiresIn: "4h"
                    });
                    return res.status(200).json({
                        message: 'Auth sucessful',
                        token: jwToken
                    });
                } 

                return res.status(401).json({
                    message: 'Auth failed'
                });
            })
        });
    }
    catch (error){
        res.status(500).json({message: error.message});  
    }
};

// delete a user
exports.user_delete = async(req, res, next)=>{
    try{
      const {id} = req.params;
      const user = await User.findByIdAndDelete(id);
      if (!user){
          return res.status(404).json({message: `cannot find user with id ${id}`});
      }
  
      const request = {
          type: 'POST',
          description: 'user signup',
          url: 'http://localhost:3000/users/signup'
      };
  
      // there has to be a cleaner way to do this...
      const userWithRequest = user.toJSON();
      userWithRequest.request = request;
      res.status(200).json(userWithRequest);
    } 
    catch (error){
      res.status(500).json({message: error.message});  
    } 
  };
