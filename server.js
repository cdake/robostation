require('dotenv').config()
const express = require('express');
const app = express();
const sequelize = require('./database')
// const User = require('./models/user')
// const Promocodes = require('./models/promocodes')
const port = process.env.PORT
const userRouter = require('./routes/users')
const loginRouter = require('./routes/login')


//Создаем маблицы в БД
sequelize.sync()

sequelize.sync({alter: true})


app.set('views', __dirname + '/views')
app.set('view engine', 'pug')
app.set('static', __dirname + 'static')



app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use('/users', userRouter)
app.use('/login', loginRouter)


app.get('/', async (req, res)=>{
    // const jane = await User.create({ first_name: "Jane", last_name: "Doe", iin: "123456789123" });
    res.send('jane')
})




app.listen(port, ()=> 
console.log(`Приложение запустилось, порт: ${port}`)
)
