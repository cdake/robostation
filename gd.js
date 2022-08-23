require('dotenv').config()
const sql = require('mysql2');


const connection = sql.createConnection({host: process.env.HOST,
    user: process.env.USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB}
    );


let createAll = () =>{
    connection.execute('CREATE TABLE IF NOT EXISTS users(id INT AUTO_INCREMENT DEFAULT NULL, name VARCHAR(20), gender VARCHAR(15), PRIMARY KEY (id))')
    console.log('Table Users was successfully created');
    connection.execute('CREATE TABLE IF NOT EXISTS users2(id INT AUTO_INCREMENT DEFAULT NULL, name VARCHAR(20), gender VARCHAR(15), PRIMARY KEY (id))')
    console.log('Table Users2 was successfully created');
    return;
};

createAll();
