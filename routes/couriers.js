const express = require('express');
const router = express.Router();


router.get('/', (req, res) => {
    let sql = "SELECT * FROM couriers";
    db.query(sql, (err, data, fields) => {
        if (err) throw err;
        if (data != "") {
            res.json({
                status: 200,
                data,
                message: "Couriers list retrieved"
            })
        } else {
            res.json({
                status: 200,
                message: "No couriers yet"
            })
        }
    })
})

router.post('/signup', async (req, res) => {
    const { first_name, last_name, iin, phone_no } = req.body
    const created = new Date()
    if (!first_name || !last_name || !iin || !phone_no) {
        res.status(400).send("Bad Request")
    }
    if (phone_no.match(/^(?:[+0]7)?[0-9]{10}$/g)) {
        let sql = "SELECT * FROM users WHERE phone_no = ? OR iin = ?"
        db.query(sql, [phone_no, iin], (err, data, fields) => {
            if (err) throw err;
            if (data == "") {
                let sql = `INSERT INTO users(first_name, last_name, iin, phone_no, created_at) VALUES(?,?,?,?,?)`
                db.query(sql, [first_name, last_name, iin, phone_no, created], function (err, data, fields) {
                    if (err) throw err
                    res.json({
                        status: 200,
                        message: "User added",
                        data,
                    })
                })
            } else {
                res.json({
                    message: "User already exist"
                })
            }
        })
    }
})

module.exports = router;