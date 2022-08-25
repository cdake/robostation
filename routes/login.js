
const express = require('express');
const router = express.Router();
const User = require('../models/user')

//Проверка номера на соответствие формату +7 xxx xxx xx xx 
let checkNo = (num)=>{
    let isValid = false;
    num = String(num);
    num = num.replace(/ /g, '');
    if(num.length < 10 || num.length > 12){
        return isValid;
    } else if (num.length == 10 || num.length ==11) {
        isValid = true
        return isValid
    } else {
        isValid = true;
        return isValid
    }
};

//Конвертация номера в формат +7XXXYYYQQZZ удаление пробелов и добавление префикса +7
const formatNo = (num)=> {
    num = String(num);
    num = num.replace(/ /g, '');
    num = num.replace(/-/g, '');
    if (num.length == 10) {
        num = "+7" + num;
    } else if (num.length ==11){
        num = "+7" + num.slice(1)
    }
    return num;
}

//Registration

router.post('/signup', async(req, res)=>{
    let {first_name, last_name, iin, promocode_id_fk, phone_no} = req.body;
    if(!phone_no){
        res.status(400).send("Bad Request")}
    const created = new Date()
    if (checkNo(phone_no)){
        phone_no = formatNo(phone_no)
        const user = await User.findOne({where: {phone_no}})
        if (user != null){
            //todo send sms
            //todo signup procedure
            console.log(user)
            res.send({message:"Пользователь с таким номером уже существует", user})//User already exist
        } else {
            if(!first_name || !last_name || !iin || !phone_no) {
                res.status(400).send("Bad Request")
            } else {
            const created_at = new Date() 
            const newUser = await User.create({first_name, last_name, iin, created, phone_no, promocode_id_fk, created_at})
            res.json({status: 200, message:"Пользователь создан", newUser})//User created
            }
        }
    }
})

router.post('/login', async(req, res)=>{
    let {first_name, last_name, iin, promocode_id_fk, phone_no} = req.body;
} )

module.exports = router;