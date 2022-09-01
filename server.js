require('dotenv').config()
const express = require('express');
const app = express();
const cors = require('cors')
const mysql = require('mysql2')
// const sequelize = require('./database')
// const User = require('./models/user')
// const Promocodes = require('./models/promocodes')
const port = process.env.PORT
const userRouter = require('./routes/users')
const promoRouter = require('./routes/promo')
const vehicleRouter = require('./routes/vehicles')
const courierRouter = require('./routes/couriers')

db = mysql.createConnection({
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB,
})

//Создаем таблицы в БД
// sequelize.sync()

// sequelize.sync({alter: true})


app.set('views', __dirname + '/views')
app.set('view engine', 'pug')
app.set('static', __dirname + 'static')


app.use('/api', cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use('/api/users', userRouter)
app.use('/api/promo', promoRouter)
app.use('/api/vehicle', vehicleRouter)
app.use('/api/couriers', courierRouter)

app.get('/', async (req, res) => {
  // const jane = await User.create({ first_name: "Jane", last_name: "Doe", iin: "123456789123" });
  res.send('jane')
})




app.listen(port, () =>
  console.log(`Приложение запустилось, порт: ${port}`)
)
