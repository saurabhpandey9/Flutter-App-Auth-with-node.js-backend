const express = require('express')
const morgan = require('morgan')
const cors= require('cors')
const connectDB= require('./config/db')
const passport = require('passport')
const bodyParser= require('body-parser')
const root =require('./routers/index')
const router = require('./routers/index')
const { Passport } = require('passport')
connectDB()

const app =express()


if (process.env.NODE_ENV === 'development'){

    app.use(morgan('dev'))

}

app.use(cors())
app.use(bodyParser.urlencoded({extended : false}))
app.use(bodyParser.json())
app.use(router)
app.use(passport.initialize())
require('./config/passport')(passport)




const PORT =process.env.PORT || 3000

app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`))
