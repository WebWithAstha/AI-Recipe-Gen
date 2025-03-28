import jwt from "jsonwebtoken";
import ResponseHandler from "../utils/response.handler.js";
import { catchAsyncErrors } from "./catchAsyncErrors.js";

export const isAuthenticated = catchAsyncErrors((req,res,next)=>{
        const token = req.cookies?.token;
        if(!token) return ResponseHandler.error(404,'Unauthorized: No token provided').send(res);
        const decoded = jwt.verify(token,process.env.JWT_SECRET);
        req.user = decoded;
        next();
})