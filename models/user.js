const express = require('express');
const router = express.Router();


router.get('/', (req, res)=>{
    let sql="SELECT * FROM users";
    db.query(sql, (err,data, fields)=>{
        if (err) throw err;
        res.json({
            status: 200,
            data,
            message: "User list retrieved"
        })
    })
})
