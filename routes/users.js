require('dotenv').config()
const express = require('express');
const router = express.Router();
const sql = require('mysql2');


const db = sql.createConnection({host: process.env.HOST,
    user: process.env.USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB}
    );

//Создаем таблицу на сервере БД NySQL

    connection.connect((err)=> {
    if(err) throw err;
    console.log('Connected!');
    let sql = "CREATE TABLE IF NOT EXISTS users (id INT AUTO_INCREMENT PRIMARY KEY NOT NULL, first_name VARCHAR(80), last_name VARCHAR(80),iin VARCHAR(12), photo VARCHAR(250) DEFAULT 'avatar.png', phone_no VARCHAR(15),last_sms_code INT, created_at DATETIME, status BOOLEAN DEFAULT 0)"
    connection.query(sql, function (err, result){
        if (err) throw err;
        console.log('Table Users created');
    })
})



router.get('/list',(req, res)=>{
    let sql = `SELECT * FROM users`;
    db.query(sql, (err, data, fields)=>{
        if (err) throw err;
        res.json({status:200, data, message: "User list received successfully"})
    }) 
});

router.get('/:id', (req,res) => {
    let _id = req.params['id'] 
    let sql = `SELECT * FROM users WHERE id =${_id}`
    db.query(sql,(err, data, fields)=>{
    if(err) throw err;
    res.json(data)
    })
});





module.exports = router;