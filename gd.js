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

    connection.execute('CREATE TABLE IF NOT EXISTS `payments` (`payment_id` int(11) AUTO_INCREMENT PRIMARY KEY NOT NULL, `payment_method` varchar(200) NOT NULL)')

    console.log('Table Payments was successfully created');

    connection.execute('CREATE TABLE IF NOT EXISTS `vehicles` (`vehicle_id` int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY, `vehicle_name` varchar(255) NOT NULL);')

    console.log('Table Vehicles was successfully created');

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

    //courier table should have rating field or it needs to create rating table
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


    connection.execute('CREATE TABLE IF NOT EXISTS `orders`(order_id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,\
         createdAt DATETIME, description TEXT,price FLOAT, address_from VARCHAR(255) NOT NULL, address_to VARCHAR(255) NOT NULL, is_delivered BOOLEAN DEFAULT 0, fk_payment_method INT, fk_courier_id INT, fk_user_id INT,\
    CONSTRAINT FK_Payment FOREIGN KEY(fk_payment_method) REFERENCES payments(payment_id), \
        CONSTRAINT FK_courier FOREIGN KEY(fk_courier_id) REFERENCES couriers(courier_id), \
        CONSTRAINT FK_user FOREIGN KEY(fk_user_id) REFERENCES users(user_id)); ')

    console.log('Table Orders was successfully created');

    return;
};

createAll();