
import dontenv from 'dotenv';
dontenv.config();
import express from 'express';
import morgan from 'morgan';
const app =  express();
import connectDb from './src/config/db.js'
import authRouter  from './src/routes/auth.routes.js'
import recipeRouter  from './src/routes/recipe.routes.js'
import cookieParser from 'cookie-parser';
import redis from './src/utils/redis.js';
import cors from 'cors';
import rateLimit from 'express-rate-limit'
import helmet from 'helmet';

// connecting to the database
connectDb();
redis.on("ready", () => console.log("Redis connected!"));

// helmet setup
app.use(
    helmet({
      contentSecurityPolicy: false, // Disable CSP if not needed
      frameguard: { action: 'deny' }, // Prevent clickjacking
      hidePoweredBy: true, // Hide "X-Powered-By: Express"
      xssFilter: true, // Protect from XSS attacks
      noSniff: true, // Prevent MIME-type sniffing
    })
  );

const allowedOrigins = process.env.CORS_ORIGINS.split(",");

app.use(cors({
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error("Not allowed by CORS"));
        }
    },
    credentials: true
}));

app.use(morgan('dev')) // logger h bhai
app.use(cookieParser());
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

// rate limiting
const rateLimiter = rateLimit({
    windowMs: process.env.RATE_LIMIT_WINDOW_MS,
    max: process.env.RATE_LIMIT_MAX,
    message: process.env.RATE_LIMIT_MESSAGE,
    headers: true,
});
app.use(rateLimiter);


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