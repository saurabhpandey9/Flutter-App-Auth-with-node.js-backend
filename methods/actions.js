var User =require('../model/user')
var jwt = require('jwt-simple')
var config = require('../config/dbconfig')
const { request } = require('express')
const { authenticate } = require('passport')


var functions = {
    addNew:function (req,res){
        if ((!req.body.name) || (!req.body.password)){
            res.json({success:false ,msg: 'Enter all required fields'})
        }
        else{
            var newUSer =User({
                name: req.body.name,
                password: req.body.password
            });

            newUSer.save(function (err, newUser){
                if (err){
                    res.json({success:false ,msg: 'Failed to save'})
                }
                else{
                    res.json({success:true ,msg: 'Successfullly save'}) 
                }
            })
        }
    },

    authenticate: function (req,res){
        User.findOne({
            name:req.body.name
        }, function(err, user){
            if(err) throw err
            else if (!user){
                res.status(403).send({success:false , msg : 'User not found'})
            }
            else{

                user.comparePassword(req.body.password, function(err, isMatch){
                    if (isMatch && !err){
                        var token = jwt.encode(user, config.secret)
                        res.json({success:true ,token: token})
                    }
                    else{
                        return res.status(403).send({success:false, msg:'Auth Failed'})
                    }
                })
            }
        })
    }
}

module.exports = functions