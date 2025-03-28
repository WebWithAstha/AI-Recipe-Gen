
import env from 'dotenv';
env.config();
import express from 'express';
import morgan from 'morgan';
const app =  express();
import connectDb from './src/config/db.js'
import authRouter  from './src/routes/auth.routes.js'
import recipeRouter  from './src/routes/recipe.routes.js'
import cookieParser from 'cookie-parser';
import redis from './src/utils/redis.js';

// connecting to the database
connectDb();
redis.on("ready", () => console.log("Redis connected!"));


app.use(morgan('dev')) // logger h bhai
app.use(cookieParser());
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));


app.use('/api/auth/',authRouter)
app.use('/api/recipes/',recipeRouter)

// Error handling middleware
import { errorHandler } from './src/middlewares/errorHandler.js';
import ResponseHandler from './src/utils/response.handler.js';
app.all('*', (req, res, next) => ( ResponseHandler.notFoundError(`Requested URL not found: ${req.url}`).send(res)))
app.use(errorHandler)

// run the server
app.listen(process.env.PORT,(req,res,next) =>{
    console.log(`server listening on port ${process.env.PORT}`)
})