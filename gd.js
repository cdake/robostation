require('dotenv').config()
const sql = require('mysql2');


const connection = sql.createConnection({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB
}
);


let createAll = () => {


    connection.execute('CREATE TABLE IF NOT EXISTS `vehicles` (`vehicle_id` int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY, `vehicle_name` varchar(255) NOT NULL);')

    console.log('Table Vehicle was successfully created');

    connection.execute('CREATE TABLE IF NOT EXISTS `promocodes` (`code_id` int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,\
    `code` varchar(5) NOT NULL,\
    `is_activated` tinyint(1) DEFAULT 0,\
    `expire_days` int(11) NOT NULL,\
    `activated_at` datetime DEFAULT NULL,\
    `createdAt` datetime NOT NULL,\
    `updatedAt` datetime NOT NULL)'
    )
    console.log('Table Promocodes was successfully created');


    connection.execute('CREATE TABLE IF NOT EXISTS `users` (`user_id` int(11) NOT NULL AUTO_INCREMENT,\
        `first_name` varchar(255) NOT NULL,\
        `last_name` varchar(255) NOT NULL,\
        `phone_no` varchar(15) NOT NULL,\
        `iin` varchar(12) NOT NULL,\
        `picture` varchar(255) DEFAULT "static/img/avatar.png",\
        `is_active` tinyint(1) DEFAULT 0,\
        `created_at` datetime DEFAULT NULL,\
        `promo_id_fk` int(11) DEFAULT NULL,\
        PRIMARY KEY(`user_id`),\
        CONSTRAINT `fk_promocodes_id` FOREIGN KEY (`promo_id_fk`) REFERENCES `promocodes` (`code_id`) ON UPDATE CASCADE);')

    console.log('Table Users was successfully created');

    connection.execute('CREATE TABLE IF NOT EXISTS `couriers` (`courier_id` int(11) NOT NULL AUTO_INCREMENT,\
        `first_name` varchar(255) NOT NULL,\
        `last_name` varchar(255) NOT NULL,\
        `phone_no` varchar(15) NOT NULL,\
        `iin` varchar(12) NOT NULL,\
        `id_no` int(12) NOT NULL,\
        `picture` varchar(255) DEFAULT "static/img/avatar.png",\
        `id_pic` varchar(255),\
        `is_active` tinyint(1) DEFAULT 0,\
        `created_at` datetime DEFAULT NULL,\
        `vehicle_id_fk` int(11) DEFAULT NULL,\
        PRIMARY KEY (courier_id),\
        CONSTRAINT `fk_vehicle_id` FOREIGN KEY (`vehicle_id_fk`) REFERENCES `vehicles` (`vehicle_id`) ON UPDATE CASCADE);')

    console.log('Table Couriers was successfully created');

};

createAll();