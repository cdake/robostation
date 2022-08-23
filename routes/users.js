
const express = require('express');
const router = express.Router();
const User = require('../models/user')




router.get('/list',async (req, res)=>{
    const users = await User.findAll();
    res.json({status:200, users, message: "User list received successfully"}) 
});


module.exports = router;