
const express = require('express');
const router = express.Router();
const User = require('../models/user')

router.get('/list',async (req, res)=>{
    const users = await User.findAll();
    res.json({ users, message: "User list received successfully"}) 
});

router.post('/new', async (req,res)=>{
    const {first_name, last_name, iin, promocode_id_fk, phone_no} = req.body
    const created = new Date()
    if(!first_name || !last_name || !iin) {
        res.status(400).send("Bad Request")
    } else {
    const newUser = await User.create({first_name:first_name, last_name:last_name, iin:iin, created_at:created, phone_no:phone_no, promo_id_fk:promocode_id_fk})
    res.json({status: 200, message:"User created", newUser})}
})

module.exports = router;