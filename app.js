const express=require("express")
const app=express()
require('dotenv').config()
require('./Database/db')
app.use(express.json())
const port=process.env.port || 2022

app.use('/',require('./routes/user'))



app.listen(port,()=>console.log(`SERVER IS RUNNING AT PORT :: ${port}`))