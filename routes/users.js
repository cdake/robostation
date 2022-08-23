
const express = require('express');
const router = express.Router();
const User = require('../models/user')

router.get('/list',async (req, res)=>{
    const users = await User.findAll();
    res.json({ users, message: "User list received successfully"}) 
});

router.post('/new', async (req,res)=>{
    const {first_name, last_name, iin} = req.body
    const created = new Date()
    const newUser = await User.create({first_name:first_name, last_name:last_name, iin:iin, created_at:created})
    res.json({status: 200, message:"User created", newUser})
})

module.exports = router;