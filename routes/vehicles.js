const express = require('express');
const router = express.Router();


router.get('/', (req, res) => {
    let sql = "SELECT * FROM vehicles";
    db.query(sql, (err, data, fields) => {
        if (err) throw err;
        if (data != "") {
            res.json({
                status: 200,
                data,
                message: "Vehicles list retrieved"
            })
        } else {
            res.json({
                status: 200,
                message: "No vehicles yet"
            })
        }
    })
})

router.post('/', (req, res) => {
    const { vehicle_name } = req.body
    if (!vehicle_name) {
        res.status(400).send("Bad request")
    }

    let sql = "INSERT INTO `vehicles`(vehicle_name) VALUES (?)"
    db.query(sql, [vehicle_name], (err, data, fields) => {
        if (err) throw err;
        res.json({
            status: 200,
            message: "Vehicle added",
            data,
        })
    })
})


module.exports = router;