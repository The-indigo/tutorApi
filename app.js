const express= require('express')
const app= express()
const mongoose=require('mongoose')
const bodyParser = require("body-parser")
require('dotenv').config()

const tutorRoutes=require("./routes/tutor")
const studentRoutes=require("./routes/student")
const lessonRoutes=require("./routes/lesson")
const subjectRoutes=require("./routes/subject")
const categoryRoutes=require("./routes/category")
const adminRoutes=require("./routes/admin")
app.use(express.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(tutorRoutes)
app.use(studentRoutes)
app.use(lessonRoutes)
app.use(subjectRoutes)
app.use(categoryRoutes)
app.use(adminRoutes)

app.use( (req,res)=>{
    res.send("welcome")
})

const http = require('http');

//mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/your-app-name');



mongoose 
    .connect(process.env.DB_CONN,{
        useNewUrlParser: true,
        useUnifiedTopology: true
      })
    .then(result =>{
        console.log("Database connected")
        app.listen(process.env.PORT || 3000)
    })
    .catch(err => console.log(err))