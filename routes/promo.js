const express = require('express');
const router = express.Router();

router.route('/')
    .get((req, res) => {
        let sql = "SELECT * FROM promocodes";
        db.query(sql, (err, data, fields) => {
            if (err) throw err;
            if (data != "") {
                res.json({
                    status: 200,
                    data,
                    message: "Promocodes list retrieved"
                })
            } else {
                res.json({
                    status: 200,
                    message: "No promocodes yet"
                })
            }
        })
    })

    .post((req, res) => {
        const { code, expire_days } = req.body
        const created = new Date()
        const updatedAt = new Date()


        if (!code || !expire_days) {
            res.status(400).send("Bad request")
        }
        let sql = `INSERT INTO promocodes(code, expire_days, createdAt, updatedAt) VALUES(?,?,?,?)`
        db.query(sql, [code, expire_days, created, updatedAt], function (err, data, fields) {
            if (err) throw err
            res.json({
                status: 200,
                message: "Code added",
                data,
            })
        })
    })

router.put('/:code_id', (req, res) => {
    let { code_id } = req.params
    let { code, expire_days, is_activated, activated_at } = req.body
    const updatedAt = new Date();
    let find = "SELECT * FROM promocodes WHERE code_id = ?";
    db.query(find, code_id, (err, data) => {
        if (data.length) {
            expire_days = data[0]['expire_days']
        }

    })
    let sql = `UPDATE promocodes SET code =?, updatedAt =?, expire_days=?, is_activated=? WHERE code_id = ? `
    db.query(sql, [code, updatedAt, expire_days, is_activated, code_id], (err, data, fields) => {
        if (err) throw err;
        res.json({
            status: 200,
            message: "Code Updated",
            data
        })
    })
    console.log(expire_days)
})

module.exports = router;