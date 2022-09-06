const express = require('express');
const router = express.Router();

//courier table should have rating field

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
    const { first_name, last_name, phone_no, iin, id_no, picture, id_pic, is_active, vehicle_id_fk } = req.body
    const created_at = new Date()
    const updated_at = new Date();
    if (!first_name || !last_name || !iin || !phone_no) {
        res.status(400).send("Bad Request")
    }
    if (phone_no.match(/^(?:[+0]7)?[0-9]{10}$/g)) {
        let sql = "SELECT * FROM couriers WHERE phone_no = ? OR iin = ?"
        db.query(sql, [phone_no, iin], (err, data, fields) => {
            if (err) throw err;
            if (data == "") {
                let sql = `INSERT INTO couriers(first_name, last_name, phone_no, iin, id_no, picture, id_pic, is_active, created_at, updated_at, vehicle_id_fk) VALUES(?,?,?,?,?,?,?,?,?,?,?)`
                db.query(sql, [first_name, last_name, phone_no, iin, id_no, picture, id_pic, is_active, created_at, updated_at, vehicle_id_fk], function (err, data, fields) {
                    if (err) throw err
                    res.json({
                        status: 200,
                        message: "Courier added",
                        data,
                    })
                })
            } else {
                res.json({
                    message: "Courier already exist"
                })
            }
        })
    }
})

router.put('/:id', async (req, res) => {
    let { courier_id } = req.params
    let { first_name, last_name, phone_no, iin, id_no, picture, id_pic, is_active, created_at, vehicle_id_fk } = req.body
    const updated_at = new Date();
    let sql = `UPDATE couriers SET first_name=?, last_name=?, phone_no=?, iin=?, id_no=?, picture=?, id_pic=?, is_active=?, created_at=?, vehicle_id_fk=?, updated_at=? WHERE courier_id =?`
    db.query(sql, [first_name, last_name, phone_no, iin, id_no, picture, id_pic, is_active, created_at, vehicle_id_fk, updated_at], (err, data, fields) => {
        if (err) throw err;
        res.json({
            status: 200,
            message: "Courier Updated",
            data
        })
    })
})

module.exports = router;