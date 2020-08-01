const express= require('express')
const actions = require('../methods/actions')
const router = express.Router()

router.get('/', (req,res)=>{
    res.send('HELLO World')
})

router.get('/dashboard', (req,res)=>{
    res.send('Dashboard')
})

// @desc adding new user
//@route POST //add user

router.post('/adduser', actions.addNew)
router.post('/authenticate', actions.authenticate)

// @desc for token authenticatio of add user
router.get('/getinfo',actions.getInfo)

module.exports =router