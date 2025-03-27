
import env from 'dotenv';
env.config();
import express from 'express';
const app =  express();
import connectDb from './src/config/db.js'

// connecting to the database
connectDb();



// run the server
app.listen(process.env.PORT,(req,res,next) =>{
    console.log(`server listening on port ${process.env.PORT}`)
})